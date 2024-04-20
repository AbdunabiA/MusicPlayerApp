import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "react-jinke-music-player/assets/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retryDelay: (index) => Math.min(1000 * 2 ** index, 30000),
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/music">
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
