import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.scss';
import { App } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
try {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
)
} catch (e) {
    console.error(e)
    alert(e)
}
