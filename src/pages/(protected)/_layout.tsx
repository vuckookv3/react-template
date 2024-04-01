import { Outlet } from 'react-router-dom';

import NavBarAdmin from '@/components/Navbar';
import { Navigate } from '@/router';
import { useAdminAuthStore } from '@/store/admin.store';
import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function AdminProtectedLayout() {
	const [opened, { toggle }] = useDisclosure();
	const user = useAdminAuthStore((state) => state.user);

	if (!user) return <Navigate to="/login" />;

	return (
		<>
			<AppShell
				header={{ height: { base: 70 } }}
				navbar={{
					width: { base: 300 },
					breakpoint: 'sm',
					collapsed: { mobile: !opened },
				}}
				padding="md"
			>
				<AppShell.Header>
					<Group h="100%" px="md">
						<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
						<Title order={3}>DASHBOARD</Title>
					</Group>
				</AppShell.Header>
				<AppShell.Navbar p="md">
					<NavBarAdmin />
				</AppShell.Navbar>
				<AppShell.Main>
					<Outlet />
				</AppShell.Main>
			</AppShell>
		</>
	);
}
