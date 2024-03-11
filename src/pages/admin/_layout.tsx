import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Preloader from '@/components/Preloader';
import { useNavigate } from '@/router';
import { useAdminAuthStore } from '@/store/adminUser.store';
import { MantineProvider, createTheme } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@mantine/core/styles.css';

const theme = createTheme({});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

export default function AdminLayout() {
	const [isReady, setIsReady] = useState(false);
	const navigate = useNavigate();
	const checkAuth = useAdminAuthStore((state) => state.auth);
	const user = useAdminAuthStore((state) => state.user);

	useEffect(() => {
		Promise.allSettled([checkAuth()]).finally(() => {
			setIsReady(true);

			if (!user) {
				navigate('/admin/login');
			} else {
				navigate('/admin/dashboard');
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<>
			<MantineProvider theme={theme} withCssVariables defaultColorScheme="dark">
				<QueryClientProvider client={queryClient}>{isReady ? <Outlet /> : <Preloader />}</QueryClientProvider>
			</MantineProvider>
		</>
	);
}
