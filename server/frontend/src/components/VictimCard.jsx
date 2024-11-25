import React from 'react';
import { Link } from 'react-router-dom';

export default function VictimCard({ victim }) {
  return (
    <Link 
      to={`/victim/${victim.id}`}
      className={`bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${Math.random() > 0.5 ? 'border-green-400' : 'border-red-400'} border-2`}
    >
      <img src={victim.image} alt={victim.title} className="w-full h-48 object-cover mb-2 rounded" />
      <h2 className="text-lg font-semibold mb-1">{victim.title}</h2>
      <p className="text-sm text-gray-400">{victim.subtitle}</p>
    </Link>
  );
}