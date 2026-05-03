import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  fallbackRender?: (error: Error, componentStack?: string) => ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  componentStack?: string | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ componentStack: info.componentStack ?? undefined });
    console.error("Render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallbackRender && this.state.error) {
        const componentStack = this.state.componentStack ?? undefined;
        return this.props.fallbackRender(
          this.state.error,
          componentStack
        );
      }

      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
