'use client';

import Link from 'next/link';
import React from 'react';

const Card = ({ item }) => {
  return (
    <Link 
      href={item.route} 
      className={`block group`}
      aria-label={item.title || 'Card link'}
    >
      <div className={` relative
        p-4 h-34 w-34 sm:h-46 shadow-lg rounded-2xl sm:w-48 bg-white 
        transition-all duration-300 overflow-hidden
        group-hover:shadow-xl group-hover:-translate-y-1
        ${item.color ? `bg-${item.color}-100 border-t-4 border-${item.color}-500` : ''}
      `}>
        {item.icon && (
            <img className='sm:h-9 sm:w-9 w-5 h-5' src={item.icon} />
        )}
        {item.title && <h3 className="font-bold text-gray-800">{item.title}</h3>}
        {item.value && <p className="text-2xl font-bold mt-2">{item.value}</p>}
        {item.description && (
          <p className="text-xs text-gray-500 mt-1">{item.description}</p>
        )}
        <div className='h-34 right-0 rounded-tl-full bg-gray-500 absolute w-30 '>

        </div>
      </div>
    </Link>
  );
};

export default Card;