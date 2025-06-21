export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  image: string;
  department: string;
  rating: number;
  bio: string;
  projects: Project[];
  feedback: Feedback[];
  performanceHistory: PerformanceRecord[];
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  deadline: string;
}

export interface Feedback {
  id: string;
  author: string;
  content: string;
  rating: number;
  date: string;
  type: 'positive' | 'constructive' | 'neutral';
}

export interface PerformanceRecord {
  id: string;
  period: string;
  rating: number;
  goals: string[];
  achievements: string[];
}

export interface DashboardStore {
  users: User[];
  bookmarkedUsers: number[];
  searchQuery: string;
  selectedDepartments: string[];
  selectedRatings: number[];
  darkMode: boolean;
  loading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  toggleBookmark: (userId: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedDepartments: (departments: string[]) => void;
  setSelectedRatings: (ratings: number[]) => void;
  toggleDarkMode: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  promoteUser: (userId: number) => void;
}