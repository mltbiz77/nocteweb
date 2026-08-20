import React from 'react';
import ReactDOM from 'react-dom/client';
import LegalPage from '@/components/LegalPage';
import { CALLBACK_PRIVACY } from '@/data/legal-callback';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LegalPage doc={CALLBACK_PRIVACY} path="/callback/privacy/" />
  </React.StrictMode>,
);
