import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Preloader from '@/components/Preloader';
import { useNavigate } from '@/router';
import { useAdminAuthStore } from '@/store/admin.store';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css';

const theme = createTheme({});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

export default function App() {
	const location = useLocation();
	const [isReady, setIsReady] = useState(false);
	const navigate = useNavigate();
	const checkAuth = useAdminAuthStore((state) => state.auth);
	const user = useAdminAuthStore((state) => state.user);

	useEffect(() => {
		Promise.allSettled([checkAuth()]).finally(() => {
			setIsReady(true);

			if (!user) {
				navigate('/login');
			} else {
				if (location.pathname === '/admin') {
					navigate('/dashboard');
				}
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<MantineProvider theme={theme} withCssVariables defaultColorScheme="dark">
				<QueryClientProvider client={queryClient}>
					{isReady ? <Outlet /> : <Preloader />}
					<Notifications position="top-right" zIndex={2000} />
				</QueryClientProvider>
			</MantineProvider>
		</>
	);
}
