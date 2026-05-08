// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastProvider } from './context/ToastContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ToastProvider wraps the whole app so any component can call useToast() */}
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
)
