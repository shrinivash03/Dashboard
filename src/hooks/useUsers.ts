import { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import { User, Project, Feedback, PerformanceRecord } from '../types';

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Design'];

const generateMockData = (userData: any): User => {
  const department = departments[Math.floor(Math.random() * departments.length)];
  const rating = Math.round((Math.random() * 4 + 1) * 2) / 2; // 1-5 in 0.5 increments
  
  const projects: Project[] = Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, i) => ({
    id: `proj-${userData.id}-${i}`,
    name: `Project ${String.fromCharCode(65 + i)}`,
    status: ['active', 'completed', 'pending'][Math.floor(Math.random() * 3)] as any,
    progress: Math.floor(Math.random() * 100),
    deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));

  const feedback: Feedback[] = Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => ({
    id: `feedback-${userData.id}-${i}`,
    author: `Manager ${i + 1}`,
    content: [
      'Excellent work on the recent project deliverables.',
      'Shows great initiative and leadership qualities.',
      'Could improve on time management skills.',
      'Demonstrates strong technical expertise.',
      'Great team player and collaborator.'
    ][Math.floor(Math.random() * 5)],
    rating: Math.floor(Math.random() * 5) + 1,
    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    type: ['positive', 'constructive', 'neutral'][Math.floor(Math.random() * 3)] as any
  }));

  const performanceHistory: PerformanceRecord[] = Array.from({ length: 4 }, (_, i) => ({
    id: `perf-${userData.id}-${i}`,
    period: `Q${4-i} 2024`,
    rating: Math.round((Math.random() * 4 + 1) * 2) / 2,
    goals: [
      'Improve project delivery time',
      'Enhance team collaboration',
      'Develop new technical skills',
      'Mentor junior team members'
    ].slice(0, Math.floor(Math.random() * 3) + 1),
    achievements: [
      'Successfully delivered major project',
      'Received client appreciation',
      'Completed certification course',
      'Led team initiative'
    ].slice(0, Math.floor(Math.random() * 3) + 1)
  }));

  return {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    age: userData.age,
    phone: userData.phone,
    address: userData.address,
    image: userData.image,
    department,
    rating,
    bio: `Experienced ${department.toLowerCase()} professional with ${Math.floor(Math.random() * 10) + 2} years of industry experience. Passionate about innovation and team collaboration.`,
    projects,
    feedback,
    performanceHistory
  };
};

export const useUsers = () => {
  const { users, setUsers, setLoading, setError } = useDashboardStore();

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://dummyjson.com/users?limit=20');
      const data = await response.json();
      
      const enhancedUsers = data.users.map(generateMockData);
      setUsers(enhancedUsers);
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return { users, refetch: fetchUsers };
};