import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { EmployeeDetail } from './pages/EmployeeDetail';
import { Bookmarks } from './pages/Bookmarks';
import { Analytics } from './pages/Analytics';
import { CreateUser } from './pages/CreateUser';
import { useDashboardStore } from './store/dashboardStore';

function App() {
  const { darkMode } = useDashboardStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<Dashboard />} />
          <Route path="employee/:id" element={<EmployeeDetail />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="create-user" element={<CreateUser />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;