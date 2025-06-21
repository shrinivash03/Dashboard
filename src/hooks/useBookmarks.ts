import { useMemo } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export const useBookmarks = () => {
  const { users, bookmarkedUsers, toggleBookmark } = useDashboardStore();

  const bookmarkedUsersList = useMemo(() => {
    return users.filter(user => bookmarkedUsers.includes(user.id));
  }, [users, bookmarkedUsers]);

  const isBookmarked = (userId: number) => bookmarkedUsers.includes(userId);

  return {
    bookmarkedUsers: bookmarkedUsersList,
    isBookmarked,
    toggleBookmark
  };
};