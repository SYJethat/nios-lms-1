export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  xp?: number;
  coins?: number;
  streak?: number;
  details?: any;
}

export function getStoredUser(): User {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
  }
  return {
    id: 'u1',
    name: 'Aarav Sharma',
    email: 'aarav@student.nios.ac.in',
    role: 'learner',
    xp: 2840,
    coins: 640,
    streak: 14,
    details: { class: 'Secondary 10th' }
  };
}

export function addXpToUser(amount: number) {
  if (typeof window !== 'undefined') {
    const user = getStoredUser();
    user.xp = (user.xp || 0) + amount;
    user.coins = (user.coins || 0) + Math.floor(amount / 2);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
