import React from 'react';
import ReactDOM from 'react-dom/client';
import AppPage from '@/components/AppPage';
import { CALLBACK } from '@/data/apps';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppPage app={CALLBACK} />
  </React.StrictMode>,
);
