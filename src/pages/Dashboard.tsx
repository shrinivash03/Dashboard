import React from 'react';
import { motion } from 'framer-motion';
import { Users, Bookmark, TrendingUp, Award } from 'lucide-react';
import { UserCard } from '../components/UserCard';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useUsers } from '../hooks/useUsers';
import { useSearch } from '../hooks/useSearch';
import { useBookmarks } from '../hooks/useBookmarks';
import { useDashboardStore } from '../store/dashboardStore';

export const Dashboard: React.FC = () => {
  const { users } = useUsers();
  const { filteredUsers } = useSearch();
  const { bookmarkedUsers } = useBookmarks();
  const { loading, error } = useDashboardStore();

  const stats = [
    {
      title: 'Total Employees',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Bookmarked',
      value: bookmarkedUsers.length,
      icon: Bookmark,
      color: 'bg-yellow-500',
      change: '+5%'
    },
    {
      title: 'High Performers',
      value: users.filter(u => u.rating >= 4.5).length,
      icon: Award,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Avg Rating',
      value: users.length > 0 ? (users.reduce((acc, u) => acc + u.rating, 0) / users.length).toFixed(1) : '0',
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+3%'
    }
  ];

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HR Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your team's performance and track key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <SearchAndFilter />

      {/* Employee Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Team Members ({filteredUsers.length})
          </h2>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No employees found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};