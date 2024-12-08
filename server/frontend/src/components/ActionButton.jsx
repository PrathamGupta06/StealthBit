import React, { useState, useEffect } from 'react';
import { Loader2, Check } from 'lucide-react';

export default function ActionButton({ label, icon: Icon, url, victimId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3 * 1000); 
    }
    return () => clearTimeout(timer);
  }, [isSuccess]);

  async function postRequest() {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/client/createRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ victimId: victimId, demand: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error sending request:', error);
      // error message / action
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className="flex flex-col items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={postRequest}
      disabled={isLoading || isSuccess}
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 mb-2 animate-spin" />
      ) : isSuccess ? (
        <Check className="w-6 h-6 mb-2 text-green-300" />
      ) : (
        <Icon className="w-6 h-6 mb-2" />
      )}
      <span className="text-sm text-center">
        {isLoading ? 'Sending...' : isSuccess ? 'Sent!' : label}
      </span>
    </button>
  );
}

