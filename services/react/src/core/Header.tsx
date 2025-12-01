import type { FC } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Main header component with app title and theme toggle
 */
export const Header: FC = () => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--text-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>🍯 Honey Do</h1>
      <button
        onClick={toggleTheme}
        style={{
          background: 'var(--text-color)',
          color: 'var(--bg-color)',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        type='button'
        aria-label={`Switch to ${darkTheme ? 'light' : 'dark'} theme`}
      >
        {darkTheme ? '☀️' : '🌙'}
      </button>
    </header>
  );
};

export default Header;
