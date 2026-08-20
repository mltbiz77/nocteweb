import React from 'react';
import ReactDOM from 'react-dom/client';
import LegalPage from '@/components/LegalPage';
import { FRIDGEFOX_TERMS } from '@/data/legal-fridgefox';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LegalPage doc={FRIDGEFOX_TERMS} path="/fridgefox/terms/" />
  </React.StrictMode>,
);
