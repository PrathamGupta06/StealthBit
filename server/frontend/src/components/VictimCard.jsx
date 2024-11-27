import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function VictimCard({ victim }) {
  const [isOld, setIsOld] = useState(false);

  //check if lastSeen is more than 10 minutes old
  const checkLastSeen = () => {
    const lastSeenDate = new Date(victim.lastSeen);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - lastSeenDate;
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    setIsOld(differenceInMinutes > 10);
  };

  useEffect(() => {
    checkLastSeen();
    const interval = setInterval(checkLastSeen, 10 * 1000);
    return () => clearInterval(interval); 
  }, [victim.lastSeen]);

  return (
    <Link
      to={`/victim/${victim._id}`}
      className={`bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
        isOld ? 'border-red-400' : 'border-green-400'
      } border-2`}
    >
      <img
        src={victim.img}
        alt={victim.title}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h2 className="text-lg font-semibold mb-1">{victim.title}</h2>
      <p className="text-sm text-gray-400">{victim.description}</p>
      <p className={`text-sm ${isOld ? 'text-red-400' : 'text-green-400'}`}>Last seen: {new Date(victim.lastSeen).toLocaleString()}</p>
    </Link>
  );
}
