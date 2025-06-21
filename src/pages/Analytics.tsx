import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { TrendingUp, Users, Award, Target } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export const Analytics: React.FC = () => {
  const { users } = useDashboardStore();

  const departmentData = useMemo(() => {
    const deptStats = users.reduce((acc, user) => {
      if (!acc[user.department]) {
        acc[user.department] = { count: 0, totalRating: 0 };
      }
      acc[user.department].count++;
      acc[user.department].totalRating += user.rating;
      return acc;
    }, {} as Record<string, { count: number; totalRating: number }>);

    const departments = Object.keys(deptStats);
    const avgRatings = departments.map(dept => 
      (deptStats[dept].totalRating / deptStats[dept].count).toFixed(2)
    );
    const employeeCounts = departments.map(dept => deptStats[dept].count);

    return { departments, avgRatings, employeeCounts, deptStats };
  }, [users]);

  const performanceDistribution = useMemo(() => {
    const ranges = {
      'Excellent (4.5-5.0)': 0,
      'Good (3.5-4.4)': 0,
      'Average (2.5-3.4)': 0,
      'Below Average (1.0-2.4)': 0,
    };

    users.forEach(user => {
      if (user.rating >= 4.5) ranges['Excellent (4.5-5.0)']++;
      else if (user.rating >= 3.5) ranges['Good (3.5-4.4)']++;
      else if (user.rating >= 2.5) ranges['Average (2.5-3.4)']++;
      else ranges['Below Average (1.0-2.4)']++;
    });

    return ranges;
  }, [users]);

  const monthlyTrends = useMemo(() => {
    // Mock monthly data for demonstration
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const avgRatings = [3.8, 3.9, 4.1, 4.0, 4.2, 4.3];
    const newHires = [5, 3, 8, 6, 4, 7];
    
    return { months, avgRatings, newHires };
  }, []);

  const barChartData = {
    labels: departmentData.departments,
    datasets: [
      {
        label: 'Average Rating',
        data: departmentData.avgRatings,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(performanceDistribution),
    datasets: [
      {
        data: Object.values(performanceDistribution),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const lineChartData = {
    labels: monthlyTrends.months,
    datasets: [
      {
        label: 'Average Performance Rating',
        data: monthlyTrends.avgRatings,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'New Hires',
        data: monthlyTrends.newHires,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const stats = [
    {
      title: 'Total Employees',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Avg Performance',
      value: users.length > 0 ? (users.reduce((acc, u) => acc + u.rating, 0) / users.length).toFixed(1) : '0',
      icon: TrendingUp,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      title: 'Top Performers',
      value: users.filter(u => u.rating >= 4.5).length,
      icon: Award,
      color: 'bg-yellow-500',
      change: '+8%',
    },
    {
      title: 'Departments',
      value: departmentData.departments.length,
      icon: Target,
      color: 'bg-purple-500',
      change: '0%',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Insights and trends across your organization
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Department Performance
          </h3>
          <Bar data={barChartData} options={chartOptions} />
        </motion.div>

        {/* Performance Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Distribution
          </h3>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </motion.div>
      </div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Trends
        </h3>
        <Line data={lineChartData} options={chartOptions} />
      </motion.div>

      {/* Department Details Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Department Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Employees</th>
                <th className="px-6 py-3">Avg Rating</th>
                <th className="px-6 py-3">Top Performers</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.departments.map((dept, index) => {
                const deptUsers = users.filter(u => u.department === dept);
                const topPerformers = deptUsers.filter(u => u.rating >= 4.5).length;
                
                return (
                  <tr key={dept} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {dept}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {departmentData.deptStats[dept].count}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {departmentData.avgRatings[index]}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {topPerformers}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};