'use client';

import React from 'react';

const OrgChart = ({ data }) => {
  const renderNode = (node, level = 0) => {
    const isPresident = level === 0;
    const isVP = level === 1;
    const isAssistant = level === 2;

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node Card - Compact Design */}
        <div className={`
          relative text-white rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg
          ${isPresident ? 'bg-gradient-to-br from-blue-700 to-blue-900 p-4 w-52 border-2 border-blue-300' : ''}
          ${isVP ? 'bg-gradient-to-br from-indigo-600 to-blue-700 p-3 w-44' : ''}
          ${isAssistant ? 'bg-gradient-to-br from-slate-600 to-indigo-700 p-3 w-40' : ''}
        `}>
          {/* Icon - Smaller and more elegant */}
          <div className={`
            bg-white rounded-full flex items-center justify-center mx-auto mb-2
            ${isPresident ? 'w-12 h-12' : isVP ? 'w-10 h-10' : 'w-8 h-8'}
          `}>
            <svg className={`
              ${isPresident ? 'w-6 h-6 text-blue-700' : isVP ? 'w-5 h-5 text-indigo-600' : 'w-4 h-4 text-slate-600'}
            `} fill="currentColor" viewBox="0 0 20 20">
              {isPresident ? (
                <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21-.899-.455-1.79-.754-2.678a.75.75 0 00-.373-.838z" clipRule="evenodd" />
              ) : (
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
              )}
            </svg>
          </div>
          
          {/* Name and Role - Compact */}
          <h3 className={`
            font-semibold mb-1 leading-tight
            ${isPresident ? 'text-base' : isVP ? 'text-sm' : 'text-xs'}
          `}>
            {node.name}
          </h3>
          <div className={`
            font-medium rounded px-2 py-1 text-xs bg-white/20 backdrop-blur-sm
          `}>
            {node.role}
          </div>
        </div>

        {/* Children - More compact spacing */}
        {node.children && node.children.length > 0 && (
          <div className="mt-6">
            {/* Vertical Line Down - Shorter */}
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-8 bg-gradient-to-b from-blue-600 to-indigo-500"></div>
            </div>

            {/* Horizontal Line for Multiple Children - Dynamic width */}
            {node.children.length > 1 && (
              <div className="flex justify-center mb-4">
                <div className="relative" style={{ width: `${Math.min(node.children.length * 180, 600)}px` }}>
                  <div className="w-full h-0.5 bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-400"></div>
                  {/* Vertical connection lines */}
                  {node.children.map((_, index) => {
                    const totalChildren = node.children.length;
                    const containerWidth = Math.min(totalChildren * 180, 600);
                    const spacing = containerWidth / (totalChildren + 1);
                    const leftPosition = spacing * (index + 1);
                    return (
                      <div
                        key={index}
                        className="absolute w-0.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-500"
                        style={{
                          left: `${leftPosition}px`,
                          top: '0px',
                          transform: 'translateX(-50%)'
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Children Nodes - Responsive grid */}
            <div className="flex justify-center">
              <div className={`
                ${node.children.length === 1 ? 'flex justify-center' : 
                  node.children.length <= 3 ? 'flex justify-center gap-8' : 
                  'grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl'}
              `}>
                {node.children.map((child) => (
                  <div key={child.id} className="flex justify-center">
                    {renderNode(child, level + 1)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
          Organigramme de l'Association
        </h2>
        
        <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="overflow-x-auto">
            {data && renderNode(data)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
