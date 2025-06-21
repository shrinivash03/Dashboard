import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardStore, User } from '../types';

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      users: [],
      bookmarkedUsers: [],
      searchQuery: '',
      selectedDepartments: [],
      selectedRatings: [],
      darkMode: false,
      loading: false,
      error: null,

      setUsers: (users: User[]) => set({ users }),
      
      toggleBookmark: (userId: number) => set((state) => ({
        bookmarkedUsers: state.bookmarkedUsers.includes(userId)
          ? state.bookmarkedUsers.filter(id => id !== userId)
          : [...state.bookmarkedUsers, userId]
      })),

      setSearchQuery: (query: string) => set({ searchQuery: query }),
      
      setSelectedDepartments: (departments: string[]) => set({ selectedDepartments: departments }),
      
      setSelectedRatings: (ratings: number[]) => set({ selectedRatings: ratings }),
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      
      setLoading: (loading: boolean) => set({ loading }),
      
      setError: (error: string | null) => set({ error }),
      
      promoteUser: (userId: number) => set((state) => ({
        users: state.users.map(user => 
          user.id === userId 
            ? { ...user, rating: Math.min(5, user.rating + 0.5) }
            : user
        )
      }))
    }),
    {
      name: 'hr-dashboard-storage',
      partialize: (state) => ({
        bookmarkedUsers: state.bookmarkedUsers,
        darkMode: state.darkMode,
      }),
    }
  )
);