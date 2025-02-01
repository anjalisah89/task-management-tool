import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "@/firebase";
import { enqueueSnackbar } from "notistack";

// Define Auth Context
interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => void;
  logout: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch {
      enqueueSnackbar("Unable to Sign-In, Please try again later.", {
        variant: "error",
      });
      // console.error("Google Sign-In Error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      enqueueSnackbar("Oops! Unexpected Error.", { variant: "error" });
      // console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
