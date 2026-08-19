import React from 'react';
import ReactDOM from 'react-dom/client';
import About from '@/components/About';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <About />
  </React.StrictMode>,
);
