const API_URL = '/api/victims';

export async function fetchVictims() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch victims');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching victims:', error);
    // Fallback to hardcoded data if fetch fails
    return [
      { id: 1, title: 'Victim #1', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
      { id: 2, title: 'Victim #2', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
      { id: 3, title: 'Victim #3', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
      { id: 4, title: 'Victim #4', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
      { id: 5, title: 'Victim #5', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
      { id: 6, title: 'Victim #6', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
      { id: 7, title: 'Victim #7', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
      { id: 8, title: 'Victim #8', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
      { id: 9, title: 'Victim #9', subtitle: 'last seen', image: 'https://placehold.co/600x400/' },
    ];
  }
}