import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from './context/app';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorView from './components/ErrorView';
import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './assets/stylesheets/global.scss';

const element = document.getElementById('root') as HTMLElement;
const root = createRoot(element);

root.render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorView message="Oops! something seems to have gone wrong." />}>
      <Provider>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);

serviceWorkerRegistration.register();
