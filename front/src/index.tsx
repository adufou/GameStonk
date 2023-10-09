import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/App/App';
import '@/index.scss';

const root = document.getElementById('root');

const queryClient = new QueryClient();

if (root) {
    createRoot(root).render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>,
    );
}
