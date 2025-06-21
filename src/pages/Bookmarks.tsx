import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2, TrendingUp, Eye } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';
import { useDashboardStore } from '../store/dashboardStore';
import { useNavigate } from 'react-router-dom';

export const Bookmarks: React.FC = () => {
  const { bookmarkedUsers, toggleBookmark } = useBookmarks();
  const { promoteUser } = useDashboardStore();
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < Math.floor(rating)
            ? 'text-yellow-400'
            : i < rating
            ? 'text-yellow-400 opacity-50'
            : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  if (bookmarkedUsers.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookmarked Employees</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Keep track of your favorite team members
          </p>
        </div>

        <div className="text-center py-12">
          <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookmarks yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start bookmarking employees to keep track of your favorites
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookmarked Employees</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {bookmarkedUsers.length} employee{bookmarkedUsers.length !== 1 ? 's' : ''} bookmarked
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bookmarkedUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start space-x-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.department}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => toggleBookmark(user.id)}
                    className="p-2 text-yellow-500 hover:text-yellow-600 transition-colors"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center mt-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Performance:</span>
                  <div className="flex items-center">
                    {renderStars(user.rating)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {user.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => navigate(`/employee/${user.id}`)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  <button
                    onClick={() => promoteUser(user.id)}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Promote
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};