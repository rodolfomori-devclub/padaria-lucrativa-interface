import { AlertTriangle, RefreshCw } from "lucide-react";
import posthog from "posthog-js";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Log to PostHog for monitoring
    try {
      posthog.capture("error_boundary_triggered", {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    } catch (e) {
      // Fail silently if PostHog is not available
      console.error("Failed to log error to PostHog:", e);
    }

    this.setState({
      errorInfo,
    });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="mx-4 w-full max-w-md rounded-lg border bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center text-center">
              {/* Error Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-highlight/10">
                <AlertTriangle className="h-8 w-8 text-highlight" />
              </div>

              {/* Error Title */}
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Ops! Algo deu errado
              </h1>

              {/* Error Description */}
              <p className="mb-6 text-sm text-gray-600">
                Ocorreu um erro inesperado na aplicação. Por favor, recarregue a
                página para tentar novamente.
              </p>

              {/* Reload Button */}
              <Button
                onClick={this.handleReload}
                className="w-full"
                size="lg"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Recarregar Página
              </Button>

              {/* Technical Details (Development Only) */}
              {isDevelopment && this.state.error && (
                <details className="mt-6 w-full text-left">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    Detalhes técnicos
                  </summary>
                  <div className="mt-2 rounded-md bg-gray-50 p-4">
                    <p className="mb-2 text-xs font-semibold text-red-600">
                      {this.state.error.name}: {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className="overflow-auto text-xs text-gray-700">
                        {this.state.error.stack}
                      </pre>
                    )}
                    {this.state.errorInfo?.componentStack && (
                      <pre className="mt-2 overflow-auto text-xs text-gray-700">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
