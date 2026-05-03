import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "reactflow/dist/style.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={(error, componentStack) => (
        <div className="flex min-h-screen items-center justify-center bg-parchment px-6">
          <div className="w-full max-w-xl rounded-lg border border-hairline bg-canvas p-6 text-center">
            <p className="text-[21px] font-semibold tracking-[0.231px]">
              Something went wrong
            </p>
            <p className="mt-2 text-[14px] text-ink-muted-48">
              The UI crashed while rendering. Check the console for details.
            </p>
            <pre className="mt-4 max-h-48 overflow-auto rounded-md bg-parchment p-4 text-left text-[12px] text-ink-muted">
              {error.message}
            </pre>
            {error.stack ? (
              <pre className="mt-3 max-h-48 overflow-auto rounded-md bg-parchment p-4 text-left text-[12px] text-ink-muted">
                {error.stack}
              </pre>
            ) : null}
            {componentStack ? (
              <pre className="mt-3 max-h-48 overflow-auto rounded-md bg-parchment p-4 text-left text-[12px] text-ink-muted">
                {componentStack}
              </pre>
            ) : null}
          </div>
        </div>
      )}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
