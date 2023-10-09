import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '@/components/App/App';
import '@/index.scss';
import store from '@/stores/globalStore';

const root = document.getElementById('root');

const queryClient = new QueryClient();

if (root) {
    createRoot(root).render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Provider>,
    );
}
