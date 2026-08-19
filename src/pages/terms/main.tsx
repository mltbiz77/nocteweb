import React from 'react';
import ReactDOM from 'react-dom/client';
import LegalPage from '@/components/LegalPage';
import { TERMS } from '@/data/legal';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LegalPage doc={TERMS} path="/terms/" />
  </React.StrictMode>,
);
