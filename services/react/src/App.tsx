import type { FC } from 'react';
import './App.css';
import { useTheme } from './context/ThemeContext';
import { Header, Nav, Footer } from './core';
import { Dashboard, Today, Settings, ManageTodo, Backlog } from './pages';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

/**
 * Main application component with simple routing
 */
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

/**
 * Main application component with simple routing
 */
const App: FC = () => {
  const { darkTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const appClassName = `app ${darkTheme ? 'dark-theme' : 'light-theme'}`;

  // Map current path to nav ID
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path === '/today') return 'today';
    if (path === '/backlog') return 'backlog';
    if (path === '/add') return 'add';
    if (path === '/settings') return 'settings';
    return '';
  };

  const handleNavigate = (page: string) => {
    if (page === 'dashboard') navigate('/');
    else navigate(`/${page}`);
  };

  return (
    <ErrorBoundary>
      <div className={appClassName}>
        <Header />
        <Nav currentPage={getCurrentPage()} onNavigate={handleNavigate} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/backlog" element={<Backlog />} />
            <Route path="/add" element={<ManageTodo />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/edit/:id" element={<ManageTodo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
