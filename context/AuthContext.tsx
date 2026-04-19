import { findByEmail, registerUser } from "@/database/db";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    email: string;
    } | null;

type AuthContextType = {
    user: User;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "@auth/user";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
        }
    return context;
    }

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore user from storage on app startup
    useEffect(() => {
        const restoreUser = async () => {
            try {
                const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
                if (stored) {
                    setUser(JSON.parse(stored));
                }
            } catch (error) {
                console.error("Failed to restore user session:", error);
            } finally {
                setIsLoading(false);
            }
        };

        restoreUser();
    }, []);

    const login = async (email: string, password: string) => {
        const foundUser = await findByEmail(email) as { id: number; email: string; password: string } | null;

        if (!foundUser) {
            throw new Error("User not found");
            }
        if (foundUser.password !== password) {
            throw new Error("Incorrect password");
            }
        const {password: _, ...safeUser} = foundUser;
        setUser(safeUser);
        
        // Persist user to storage
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser));
    };

    const register = async (email: string, password: string) => {
        await registerUser(email, password);
        };

    const logout = () => {
        setUser(null);
        AsyncStorage.removeItem(USER_STORAGE_KEY);
        };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
        );
};