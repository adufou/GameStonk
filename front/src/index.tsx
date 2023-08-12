import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './stores/globalStore';
import './index.scss';
import App from "@/components/App/App";

const root = document.getElementById('root');

if (root) {
    createRoot(root).render(
        <Provider store={store}>
            {/* <RouterProvider router={router} /> */}
            <App />
        </Provider>
    );
}
