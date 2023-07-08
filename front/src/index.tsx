import * as React from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStoreProvider from './stores/GlobalStoreProvider';
import App from './components/App/App';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//     },
// ]);

// ReactDOM.render(
//     <Wreactui usePreferences>
//         <GlobalStoreProvider>
//             {/* <RouterProvider router={router} /> */}
//             {/* <App /> */}
//         </GlobalStoreProvider>
//     </Wreactui>,
//     document.getElementById('root')
// );

createRoot(document.getElementById('root')).render(
    <GlobalStoreProvider>
        {/* <RouterProvider router={router} /> */}
        <App />
    </GlobalStoreProvider>
);
