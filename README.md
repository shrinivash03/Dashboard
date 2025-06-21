# HR Performance Dashboard

A comprehensive HR management dashboard built with React, TypeScript, and Tailwind CSS. This application provides HR managers with tools to track employee performance, manage bookmarks, and view detailed analytics.

## 🚀 Features

### Core Features
- **Dashboard Homepage**: Overview of all employees with performance metrics
- **Employee Management**: View, search, and filter employees by various criteria
- **Employee Details**: Comprehensive employee profiles with tabbed interface
- **Bookmark System**: Save and manage favorite employees
- **Analytics Dashboard**: Visual insights with charts and performance metrics
- **Employee Creation**: Add new employees with form validation

### Advanced Features
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Search & Filter**: Multi-criteria filtering and real-time search
- **Performance Tracking**: Star ratings and performance history
- **Interactive Charts**: Department performance and trend analysis
- **Smooth Animations**: Framer Motion powered transitions

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router DOM
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS with dark mode support
- **Charts**: Chart.js with React Chart.js 2
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/shrinivash03/Dashboard.git
cd hr-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Header.tsx      # Top header with search and theme toggle
│   ├── UserCard.tsx    # Employee card component
│   ├── SearchAndFilter.tsx # Search and filtering interface
│   └── LoadingSpinner.tsx  # Loading indicator
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard page
│   ├── EmployeeDetail.tsx # Employee detail page
│   ├── Bookmarks.tsx   # Bookmarked employees page
│   ├── Analytics.tsx   # Analytics and charts page
│   └── CreateUser.tsx  # Add new employee page
├── hooks/              # Custom React hooks
│   ├── useUsers.ts     # User data management
│   ├── useSearch.ts    # Search and filtering logic
│   └── useBookmarks.ts # Bookmark management
├── store/              # State management
│   └── dashboardStore.ts # Zustand store
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
└── App.tsx            # Main application component
```

## 🎯 Key Features Implemented

### 1. Dashboard Homepage
- Displays employee cards with photos, ratings, and key information
- Real-time statistics showing total employees, bookmarks, and performance metrics
- Responsive grid layout that adapts to screen size

### 2. Search & Filter System
- Real-time search by name, email, or department
- Multi-select filters for departments and performance ratings
- Clear filters functionality with active filter indicators

### 3. Employee Detail Pages
- Comprehensive employee profiles with tabbed interface
- Three main tabs: Overview, Projects, and Feedback
- Performance history tracking with visual ratings
- Project progress tracking with status indicators

### 4. Bookmark Management
- One-click bookmark/unbookmark functionality
- Dedicated bookmarks page with management actions
- Persistent storage using Zustand middleware

### 5. Analytics Dashboard
- Interactive charts showing department performance
- Performance distribution with doughnut charts
- Monthly trends with line charts
- Detailed department breakdown table

### 6. Employee Creation
- Comprehensive form with validation
- Organized sections for personal, contact, and address information
- Real-time error handling and feedback

## 🎨 Design Features

- **Apple-level Design Aesthetics**: Clean, sophisticated interface with attention to detail
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Dark Mode Support**: Complete dark/light theme implementation
- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Consistent Color System**: Carefully chosen color palette with proper contrast ratios
- **Typography Hierarchy**: Clear visual hierarchy with appropriate font weights and sizes

## 📊 Data Management

- **Mock Data Generation**: Realistic employee data with randomized performance metrics
- **State Persistence**: Bookmarks and theme preferences saved to localStorage
- **Real-time Updates**: Immediate UI updates for all user interactions
- **Error Handling**: Comprehensive error states and loading indicators

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Future Enhancements

- Authentication system with role-based access
- Real backend integration
- Advanced filtering options
- Export functionality for reports
- Email notifications
- Performance goal setting
- Team management features

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


## 👨‍💻 Developed By

**Shrinivash**

- [GitHub](https://github.com/shrinivash03)
- [LinkedIn](https://www.linkedin.com/in/shrinivash-4ab3171a0/)
