import { useMemo } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export const useSearch = () => {
  const { 
    users, 
    searchQuery, 
    selectedDepartments, 
    selectedRatings,
    setSearchQuery,
    setSelectedDepartments,
    setSelectedRatings
  } = useDashboardStore();

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = !searchQuery || 
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment = selectedDepartments.length === 0 || 
        selectedDepartments.includes(user.department);

      const matchesRating = selectedRatings.length === 0 || 
        selectedRatings.includes(Math.floor(user.rating));

      return matchesSearch && matchesDepartment && matchesRating;
    });
  }, [users, searchQuery, selectedDepartments, selectedRatings]);

  const departments = useMemo(() => {
    return [...new Set(users.map(user => user.department))];
  }, [users]);

  return {
    filteredUsers,
    departments,
    searchQuery,
    selectedDepartments,
    selectedRatings,
    setSearchQuery,
    setSelectedDepartments,
    setSelectedRatings
  };
};