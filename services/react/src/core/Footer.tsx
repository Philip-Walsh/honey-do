import type { FC } from 'react';

/**
 * Footer component with app information
 */
export const Footer: FC = () => {
  return (
    <footer
      style={{
        padding: '1rem 2rem',
        borderTop: '1px solid var(--text-color)',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-color)',
        opacity: 0.7,
      }}
    >
      <p style={{ margin: 0 }}>Honey Do - Keep your chores organized and your life productive</p>
    </footer>
  );
};

export default Footer;
