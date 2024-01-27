import { ThemeProvider } from "./context/themeContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "@/store";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  let persistor = persistStore(store);
  const navigate = useNavigate();
  useEffect(() => {
    const profileKey = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        navigate("/profile");
      }
    };

    document.addEventListener("keydown", profileKey);
    return () => document.removeEventListener("keydown", profileKey);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Layout />
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
