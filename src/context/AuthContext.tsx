import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

// ── Types ──
export type UserRole =
    | 'super_admin'
    | 'school_admin'
    | 'branch_admin'
    | 'branch_principal'
    | 'principal'
    | 'teacher'
    | 'student'
    | 'parent'
    | 'accountant'
    | 'receptionist';

export interface AuthUser {
    id: number;
    email: string;
    username: string;
    fullName: string;
    role: UserRole;
    schoolId?: number;
    branchId?: number;
    branchName?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: AuthUser) => void;
    logout: () => void;
    getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Helper: decode JWT payload ──
function decodeJwtPayload(token: string): Record<string, unknown> | null {
    try {
        const base64 = token.split('.')[1];
        const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(json);
    } catch {
        return null;
    }
}

// ── Provider ──
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        try {
            const savedToken = localStorage.getItem('auth_token');
            const savedUser = localStorage.getItem('auth_user');
            if (savedToken && savedUser) {
                const payload = decodeJwtPayload(savedToken);
                // Check token expiry
                if (payload && typeof payload.exp === 'number' && payload.exp * 1000 > Date.now()) {
                    setUser(JSON.parse(savedUser));
                } else {
                    // Token expired — clear
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_user');
                }
            }
        } catch {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback((token: string, userData: AuthUser) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setUser(null);
    }, []);

    const getToken = useCallback(() => {
        return localStorage.getItem('auth_token');
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
                getToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// ── Hook ──
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
