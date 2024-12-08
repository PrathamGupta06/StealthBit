import React, { useState, useEffect } from 'react';
import { fetchVictims } from '../utils/api';
import VictimCard from './VictimCard';

export default function Dashboard() {
  const [victims, setVictims] = useState([]);

  useEffect(() => {
    fetchVictims().then((data) => {
      setVictims(data);
      console.log(data);
    });
  
    const interval = setInterval(() => {
      fetchVictims().then((data) => {
        setVictims(data);
        console.log('Updated data:', data);
      });
    }, 3 * 1000); 
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-6xl sm:text-5xl font-bold mb-10 text-center">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
        {victims.map((victim) => (
          <VictimCard key={victim._id} victim={victim} />
        ))}
      </div>
    </div>
  );
}