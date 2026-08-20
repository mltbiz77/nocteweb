import React from 'react';
import ReactDOM from 'react-dom/client';
import LegalPage from '@/components/LegalPage';
import { TMS_PRIVACY } from '@/data/legal-apps';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LegalPage doc={TMS_PRIVACY} path="/track-my-subs/privacy/" />
  </React.StrictMode>,
);
