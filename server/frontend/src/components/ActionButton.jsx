import React from 'react';

export default function ActionButton({ label, icon: Icon, url }) {
  return (
    <button
      className="flex flex-col items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      onClick={() => window.location.href = url}
    >
      <Icon className="w-6 h-6 mb-2" />
      <span className="text-sm text-center">{label}</span>
    </button>
  );
}