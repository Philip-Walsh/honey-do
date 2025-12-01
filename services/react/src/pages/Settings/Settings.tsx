import type { FC } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Settings.module.css';

export const Settings: FC = () => {
  const { darkTheme, toggleTheme } = useTheme();

  return (
    <div className={styles.settings}>
      <h1>Settings</h1>
      
      <div className={styles.section}>
        <h2>Theme</h2>
        <button onClick={toggleTheme} className={styles.button}>
          {darkTheme ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </div>

      <div className={styles.section}>
        <h2>About</h2>
        <p>Honey Do - v1.0.0</p>
      </div>
    </div>
  );
};

export default Settings;
