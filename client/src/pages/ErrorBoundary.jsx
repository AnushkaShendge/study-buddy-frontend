import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Optionally log error to an error reporting service
    // console.error(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Something went wrong.</h2>
            <p className="mb-4">An unexpected error occurred. Please try reloading the page.</p>
            <button onClick={this.handleReload} className="px-4 py-2 bg-blue-600 text-white rounded">Reload</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 