import { AuthProvider } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <main>
        <Outlet />
      </main>
    </AuthProvider>
  );
}

export default App;
