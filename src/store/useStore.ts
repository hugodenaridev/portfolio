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

const useStore = create<Store>((set) => ({
  // Theme state
  isDarkMode: false,
  setDarkMode: (isDark: boolean) => set({ isDarkMode: isDark }),
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // App state
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export default useStore;