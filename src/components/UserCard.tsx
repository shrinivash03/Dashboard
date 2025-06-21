import React from 'react';
import { motion } from 'framer-motion';
import { Star, Bookmark, TrendingUp, Eye, MapPin, Mail, Phone } from 'lucide-react';
import { User } from '../types';
import { useBookmarks } from '../hooks/useBookmarks';
import { useDashboardStore } from '../store/dashboardStore';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
  index: number;
}

export const UserCard: React.FC<UserCardProps> = ({ user, index }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { promoteUser } = useDashboardStore();
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (rating >= 3.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    if (rating >= 2.5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => toggleBookmark(user.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isBookmarked(user.id)
                ? 'bg-yellow-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-yellow-500 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(user.rating)}`}>
            {user.rating.toFixed(1)} ★
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.department}</p>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Age {user.age}</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4 mr-2" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Phone className="w-4 h-4 mr-2" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="truncate">{user.address.city}, {user.address.state}</span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Performance:</span>
          <div className="flex items-center space-x-1">
            {renderStars(user.rating)}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/employee/${user.id}`)}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </button>
          <button
            onClick={() => promoteUser(user.id)}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Promote
          </button>
        </div>
      </div>
    </motion.div>
  );
};