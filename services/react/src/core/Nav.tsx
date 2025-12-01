import type { FC } from 'react';
import styles from './Nav.module.css';

interface NavProps {
  readonly currentPage: string;
  readonly onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Board' },
  { id: 'today', label: 'Today' },
  { id: 'backlog', label: 'Backlog' },
  { id: 'add', label: 'Add Task' },
  { id: 'settings', label: 'Settings' },
];

/**
 * Navigation component
 */
export const Nav: FC<NavProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navLinks}>
        {navItems.map(item => (
          <li key={item.id}>
            <button
              className={`${styles.navButton} ${currentPage === item.id ? styles.active : ''}`}
              onClick={() => onNavigate(item.id)}
              type="button"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
