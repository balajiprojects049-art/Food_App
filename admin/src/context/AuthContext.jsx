import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// ── Test Credentials ──────────────────────────────────────────────────────────
export const TEST_CREDENTIALS = [
    { email: 'admin@feastigo.com', password: 'admin@123', name: 'Admin User', role: 'Super Admin', avatar: 'AU' },
    { email: 'manager@feastigo.com', password: 'manager@123', name: 'Store Manager', role: 'Manager', avatar: 'SM' },
    { email: 'staff@feastigo.com', password: 'staff@123', name: 'Staff User', role: 'Staff', avatar: 'SU' },
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('feastigo_admin_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const login = (email, password) => {
        const found = TEST_CREDENTIALS.find(
            c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
        );
        if (found) {
            const userData = { email: found.email, name: found.name, role: found.role, avatar: found.avatar };
            setUser(userData);
            localStorage.setItem('feastigo_admin_user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('feastigo_admin_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};
