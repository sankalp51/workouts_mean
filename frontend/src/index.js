import reactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';

const root = reactDOM.createRoot(document.getElementById('root'));
root.render(
    <WorkoutsContextProvider>
        <App />
    </WorkoutsContextProvider>

);