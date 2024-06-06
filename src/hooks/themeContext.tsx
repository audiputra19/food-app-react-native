// ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Theme, darkTheme, lightTheme } from '../themes/theme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setDarkMode } from '../store/theme';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);
    const [theme, setTheme] = useState<Theme>(isDarkMode ? darkTheme : lightTheme);

    useEffect(() => {
        setTheme(isDarkMode ? darkTheme : lightTheme);
    }, [isDarkMode]);

    const toggleTheme = () => {
        dispatch(setDarkMode(!isDarkMode));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};