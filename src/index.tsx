import React from 'react';
if (typeof window !== 'undefined') history.scrollRestoration = 'manual';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider } from './context/ProfileContext';
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ThemeProvider>
    <ProfileProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ProfileProvider>
  </ThemeProvider>
);
