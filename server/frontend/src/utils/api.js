const API_URL = 'http://localhost:3001/api/victim';

export async function fetchVictims() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(response.statusText)

    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching victims:', error);
    // Fallback to hardcoded data if fetch fails
    return [
      { _id: 1, title: 'Victim #1', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
      { _id: 2, title: 'Victim #2', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
      { _id: 3, title: 'Victim #3', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
      { _id: 4, title: 'Victim #4', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
      { _id: 5, title: 'Victim #5', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
      { _id: 6, title: 'Victim #6', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
      { _id: 7, title: 'Victim #7', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
      { _id: 8, title: 'Victim #8', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
      { _id: 9, title: 'Victim #9', lastSeen: 'last seen', img: 'https://placehold.co/600x400/' },
    ];
  }
}