import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@shared/schema';
import { apiRequest } from './queryClient';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        const res = await apiRequest('POST', '/api/login', { email, password });
        const user = await res.json();
        set({ user });
      },
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
