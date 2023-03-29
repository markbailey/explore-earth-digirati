import { Component, PropsWithChildren } from 'react';

type ErrorBoundaryProps = PropsWithChildren<{ fallback: JSX.Element }>;
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: { componentStack: any }) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError)
      // You can render any custom fallback UI
      return fallback;

    return children;
  }
}

export default ErrorBoundary;
