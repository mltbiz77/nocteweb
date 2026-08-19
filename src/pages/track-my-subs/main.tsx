import React from 'react';
import ReactDOM from 'react-dom/client';
import AppPage from '@/components/AppPage';
import { TRACK_MY_SUBS } from '@/data/apps';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppPage app={TRACK_MY_SUBS} />
  </React.StrictMode>,
);
