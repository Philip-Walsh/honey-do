import type { FC, ReactNode, ErrorInfo } from 'react';
import { Component } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: FC<{ error?: Error; resetError: () => void }>;
}

interface ErrorBoundaryFallbackProps {
  error?: Error;
  resetError: () => void;
}

/**
 * Default error fallback component
 */
const DefaultErrorFallback: FC<ErrorBoundaryFallbackProps> = ({ error, resetError }) => (
  <div
    style={{
      padding: '2rem',
      textAlign: 'center',
      border: '1px solid var(--text-color)',
      borderRadius: '8px',
      margin: '1rem',
      background: 'rgba(var(--text-color-rgb), 0.05)',
    }}
  >
    <h2 style={{ color: '#ff4757', marginBottom: '1rem' }}>Something went wrong</h2>
    <p style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>
      We apologize for the inconvenience. An error occurred in the application.
    </p>
    {error && (
      <details style={{ marginBottom: '1rem', textAlign: 'left' }}>
        <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>Error details</summary>
        <pre
          style={{
            background: 'rgba(var(--text-color-rgb), 0.1)',
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.8rem',
          }}
        >
          {error.message}
        </pre>
      </details>
    )}
    <button
      onClick={resetError}
      style={{
        background: 'var(--brand-color)',
        color: 'var(--bg-color)',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      type='button'
    >
      Try again
    </button>
  </div>
);

/**
 * Error boundary component that catches JavaScript errors in child components
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = (): void => {
    this.setState({ hasError: false });
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback ?? DefaultErrorFallback;
      return <FallbackComponent {...(this.state.error ? { error: this.state.error } : {})} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
