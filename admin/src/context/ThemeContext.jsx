import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Optionally read from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDarkMode(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const nextTheme = !prev;
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
      // Apply dark mode class to body for custom CSS using standard variables if needed
      if (nextTheme) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
      return nextTheme;
    });
  };

  const themeConfig = {
    algorithm: isDarkMode ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 8,
      fontFamily: '"Inter", "Outfit", "Roboto", sans-serif',
      colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
      colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
    },
    components: {
      Layout: {
        bodyBg: isDarkMode ? '#000000' : '#f0f2f5',
        headerBg: isDarkMode ? '#141414' : '#ffffff',
        siderBg: isDarkMode ? '#141414' : '#ffffff',
      },
      Card: {
        colorBgContainer: isDarkMode ? '#141414' : '#ffffff',
        boxShadowTertiary: isDarkMode 
          ? '0 4px 20px 0 rgba(0, 0, 0, 0.4)'
          : '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
