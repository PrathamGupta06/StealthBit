import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import FriendlyDate from './FriendlyDate';

const RequestModal = ({ request, onClose }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/client/request/${request._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        
        if (request.demand === 'camera' || request.demand === 'screenshot' || request.demand === 'liveAudio') {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setContent({ url, type: request.demand });
        } else {
          const data = await response.json();
          setContent({ data, type: request.demand });
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to load content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [request._id, request.demand]);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }

    if (!content) {
      return <div className="text-center">No content available</div>;
    }

    switch (content.type) {
      case 'camera':
      case 'screenshot':
        return <img src={content.url} alt={`${content.type} capture`} className="max-w-full h-auto" />;
      case 'liveAudio':
        return <audio controls src={content.url} className="w-full" />;
      case 'location':
      case 'history':
        return <pre className="whitespace-pre-wrap">{JSON.stringify(content.data, null, 2)}</pre>;
      default:
        return <div className="text-center">Unsupported content type</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{request.demand} Request</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          <p><strong>Created:</strong> {<FriendlyDate date={request.createdAt} />}</p>
          <p><strong>Fulfilled:</strong> {<FriendlyDate date={request.createdAt} />}</p>
        </div>
        <div className="bg-gray-700 rounded p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RequestModal;

