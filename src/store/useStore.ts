import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
  toggleTheme: () => void;
}

interface AppState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

interface Store extends ThemeState, AppState {}

// Get initial theme preference from localStorage or system preference
const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  // Check system preference as fallback
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const useStore = create<Store>((set) => ({
  // Theme state
  isDarkMode: getInitialTheme(),
  setDarkMode: (isDark: boolean) => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    set({ isDarkMode: isDark });
  },
  toggleTheme: () => set((state) => { 
    const newState = !state.isDarkMode;
    localStorage.setItem('theme', newState ? 'dark' : 'light');
    return { isDarkMode: newState };
  }),
  
  // App state
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export default useStore;