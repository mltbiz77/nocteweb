import React from 'react';
import ReactDOM from 'react-dom/client';
import LegalPage from '@/components/LegalPage';
import { CALLBACK_TERMS } from '@/data/legal-callback';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LegalPage doc={CALLBACK_TERMS} path="/callback/terms/" />
  </React.StrictMode>,
);
