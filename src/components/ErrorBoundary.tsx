import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-surface-50 dark:bg-surface-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full"
          >
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2
                }}
                className="inline-block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-red-500 dark:text-red-400 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </motion.div>

              <div className="space-y-3">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Something went wrong
                </h1>
                <p className="text-surface-600 dark:text-surface-300">
                  An unexpected error occurred. Please try refreshing the page.
                </p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-4 mt-4 rounded-lg bg-surface-100 dark:bg-surface-800 text-left overflow-auto"
                >
                  <pre className="text-sm font-mono text-surface-700 dark:text-surface-200">
                    {this.state.error?.message}
                  </pre>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-4 mt-6"
              >
                <Button
                  variant="primary"
                  onClick={this.handleRefresh}
                >
                  Refresh Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;