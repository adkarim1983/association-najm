import { Inter, Tajawal } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });
const tajawal = Tajawal({ 
  weight: ['400', '500', '700'],
  subsets: ['arabic'],
  display: 'swap',
});

export const metadata = {
  title: 'Association Najm',
  description: 'Association Najm - Plateforme de développement social et économique',
  keywords: 'association, najm, développement, social, économique, entrepreneuriat',
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  let lang = cookieStore.get('najm_lang')?.value || 'fr';
  if (!['fr', 'en', 'ar'].includes(lang)) lang = 'fr';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Choisir la police selon la langue
  const fontClassName = lang === 'ar' ? tajawal.className : inter.className;

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className={fontClassName}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
