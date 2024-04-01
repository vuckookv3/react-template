import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Link, Path } from '@/router';
import { useAdminAuthStore } from '@/store/admin.store';
import { IconHome2, IconLogout, IconUsers } from '@tabler/icons-react';

import classes from './Navbar.module.css';

type DataType = {
	link: Path;
	label: string;
	icon: typeof IconHome2;
	role?: string[];
};

const data: DataType[] = [
	{ link: '/dashboard', label: 'Home', icon: IconHome2 },
	{ link: '/dashboard/users', label: 'Users', icon: IconUsers },
];

export default function NavBarAdmin() {
	const location = useLocation();

	const [active, setActive] = useState('Home');
	const { logout, user } = useAdminAuthStore();

	const links = data.map((item) => (
		<Link
			to={item.link}
			className={classes.link}
			data-active={item.label === active || undefined}
			key={item.label}
			onClick={() => {
				setActive(item.label);
			}}
		>
			<item.icon className={classes.linkIcon} stroke={1.5} />
			<span>{item.label}</span>
		</Link>
	));

	useEffect(() => {
		const activeLink = data.slice(1).find((item) => location.pathname === item.link || location.pathname.startsWith(item.link + '/'));
		if (activeLink) {
			setActive(activeLink.label);
		} else {
			setActive('Home');
		}
	}, [location]);

	return (
		<>
			<div className={classes.navbarMain}>{links}</div>
			<div className={classes.footer}>
				<Link to="/login" className={classes.link} onClick={() => logout()}>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</Link>
			</div>
		</>
	);
}
