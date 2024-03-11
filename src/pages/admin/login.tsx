import { useNavigate } from '@/router';
import { useAdminAuthStore } from '@/store/adminUser.store';
import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export default function AdminLogin() {
	const login = useAdminAuthStore((state) => state.login);
    const navigate = useNavigate();

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = form.onSubmit(async (data) => {
		console.log(data);
		try {
			await login(data);
            navigate('/admin/dashboard');
		} catch (err) {
			console.error(err);
		}
	});

	return (
		<Container size={420} my={40}>
			<Title ta="center">Welcome back!</Title>
			<form onSubmit={onSubmit}>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')} />
					<PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} />
					<Button type="submit" fullWidth mt="xl">
						Sign in
					</Button>
				</Paper>
			</form>
		</Container>
	);
}
