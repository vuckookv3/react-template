import { useNavigate } from '@/router';
import { useAdminAuthStore } from '@/store/admin.store';
import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export default function AdminLogin() {
	const userStore = useAdminAuthStore();
	const navigate = useNavigate();

	const form = useForm({
		validate: zodResolver(schema),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = form.onSubmit(async (data) => {
		try {
			await userStore.login(data);
			navigate('/dashboard');
		} catch (err) {
			console.error(err);
			notifications.show({ title: 'Error', message: 'Bad credentials', color: 'red' });
		}
	});

	return (
		<Container size={420} my={40}>
			<Title ta="center">Welcome back!</Title>
			<form onSubmit={onSubmit}>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<TextInput label="Email" placeholder="you@mantine.dev" required {...form.getInputProps('email')} />
					<PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} />
					<Button type="submit" disabled={userStore.loading} loading={userStore.loading} fullWidth mt="xl">
						Sign in
					</Button>
				</Paper>
			</form>
		</Container>
	);
}
