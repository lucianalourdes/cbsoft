import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import "./styles/fonts.css";
import './styles/tokens.css';
import './styles/base.css';
import './styles/utilities.css';

import './i18n';
import { App } from './App';

// Keep Tailwind after component styles to preserve the existing cascade.
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
