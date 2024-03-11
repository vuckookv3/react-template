import { useState } from 'react';

import { Link, Path } from '@/router';
import { useAdminAuthStore } from '@/store/adminUser.store';
import { IconHome2, IconLogout, IconUsers, Icon } from '@tabler/icons-react';

import classes from './Navbar.module.css';

type DataType = {
    link: Path;
    label: string;
    icon: Icon;
};

const data = [
    { link: '/admin/dashboard', label: 'Home', icon: IconHome2 },
    { link: '/admin/dashboard/users', label: 'Users', icon: IconUsers },
] as const satisfies DataType[];

export default function NavBarAdmin() {
	const [active, setActive] = useState('Home');
	const logout = useAdminAuthStore((state) => state.logout);

	const links = data.map((item) => (
		<Link
			to={item.link as any}
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

	return (
		<>
			<div className={classes.navbarMain}>{links}</div>
			<div className={classes.footer}>
				<Link to="/admin/login" className={classes.link} onClick={() => logout()}>
					<IconLogout className={classes.linkIcon} stroke={1.5} />
					<span>Logout</span>
				</Link>
			</div>
		</>
	);
}
