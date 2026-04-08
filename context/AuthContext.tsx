import React, { createContext, useContext, useState } from "react";
import { findByEmail, registerUser } from "@/database/db";

type User = {
    id: number;
    email: string;
    } | null;

type AuthContextType = {
    user: User;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
        }
    return context;
    }

export const AuthProvider = ({ children }: {children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);

    const login = async (email: string, password: string) => {
        const foundUser = await findByEmail(email);

        if (!foundUser) {
            throw new Error("User not found");
            }
        if (foundUser.password !== password) {
            throw new Error("Incorrect password");
            }
        const {password: _, ...safeUser} = foundUser;
        setUser(safeUser);
    };

    const register = async (email: string, password: string) => {
        await registerUser(email, password);
        };

    const logout = () => {
        setUser(null);
        };

    return (
        <AuthContext.Provider value= {{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
        );
};