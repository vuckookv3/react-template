import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from '@generouted/react-router/lazy';

const Routes = () => <RouterProvider router={createBrowserRouter(routes, { basename: '/admin' })} />;

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Routes />
	</React.StrictMode>,
);
