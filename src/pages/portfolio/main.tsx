import React from 'react';
import ReactDOM from 'react-dom/client';
import Portfolio from '@/components/Portfolio';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Portfolio />
  </React.StrictMode>,
);
