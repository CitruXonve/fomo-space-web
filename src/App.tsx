import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavHeader from "./components/NavHeader";
import { queryClient } from "./utils/queryClient";
import HomePage from "./components/HomePage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary dark:bg-secondary">
      {/* Header - Navigation */}
      <NavHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
