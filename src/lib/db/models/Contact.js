import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  category: {
    type: String,
    enum: ['general', 'project', 'partnership', 'volunteer', 'complaint', 'suggestion'],
    default: 'general'
  },
  language: {
    type: String,
    enum: ['fr', 'en', 'ar'],
    default: 'fr'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    enum: ['website', 'mobile', 'api'],
    default: 'website'
  },
  isSpam: {
    type: Boolean,
    default: false
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  repliedAt: {
    type: Date,
    default: null
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ category: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ isSpam: 1 });

// Virtual for formatted creation date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for time since creation
contactSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} jour${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} heure${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return 'À l\'instant';
});

// Method to mark as read
contactSchema.methods.markAsRead = async function() {
  this.status = 'read';
  return await this.save();
};

// Method to mark as replied
contactSchema.methods.markAsReplied = async function(userId = null) {
  this.status = 'replied';
  this.repliedAt = new Date();
  if (userId) this.repliedBy = userId;
  return await this.save();
};

// Method to archive
contactSchema.methods.archive = async function() {
  this.status = 'archived';
  return await this.save();
};

// Method to mark as spam
contactSchema.methods.markAsSpam = async function() {
  this.isSpam = true;
  this.status = 'archived';
  return await this.save();
};

// Static method to get contacts by status
contactSchema.statics.findByStatus = function(status) {
  return this.find({ status, isSpam: false }).sort({ createdAt: -1 });
};

// Static method to get new contacts
contactSchema.statics.findNew = function() {
  return this.find({ status: 'new', isSpam: false }).sort({ createdAt: -1 });
};

// Static method to get contacts by priority
contactSchema.statics.findByPriority = function(priority) {
  return this.find({ priority, isSpam: false }).sort({ createdAt: -1 });
};

// Static method to get contacts by category
contactSchema.statics.findByCategory = function(category) {
  return this.find({ category, isSpam: false }).sort({ createdAt: -1 });
};

// Static method for admin dashboard stats
contactSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $match: { isSpam: false }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        new: { $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] } },
        read: { $sum: { $cond: [{ $eq: ['$status', 'read'] }, 1, 0] } },
        replied: { $sum: { $cond: [{ $eq: ['$status', 'replied'] }, 1, 0] } },
        archived: { $sum: { $cond: [{ $eq: ['$status', 'archived'] }, 1, 0] } },
        urgent: { $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] } },
        high: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } }
      }
    }
  ]);
  
  return stats[0] || {
    total: 0, new: 0, read: 0, replied: 0, archived: 0, urgent: 0, high: 0
  };
};

// Pre-save middleware to detect potential spam
contactSchema.pre('save', function(next) {
  if (this.isNew) {
    // Simple spam detection rules
    const message = this.message.toLowerCase();
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money'];
    
    const hasSpamKeywords = spamKeywords.some(keyword => message.includes(keyword));
    const hasExcessiveLinks = (message.match(/http/g) || []).length > 3;
    const hasExcessiveCaps = message.replace(/[^A-Z]/g, '').length > message.length * 0.5;
    
    if (hasSpamKeywords || hasExcessiveLinks || hasExcessiveCaps) {
      this.isSpam = true;
      this.status = 'archived';
    }
  }
  next();
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
