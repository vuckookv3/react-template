import { API } from '@/utils/API.axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Admin = {
    _id: string;
    role?: string;
}

type AdminLoginForm = {
    email: string;
    password: string;
}

interface IAdminAuthStore {
    loading: boolean;
    user: null | Admin;
    setUser: (user: Admin | null) => void;
    setLoading: (loading: boolean) => void;
    login: (form: AdminLoginForm) => Promise<void>;
    auth: () => Promise<void>;
    logout: () => void;
}

const InitialState: Pick<IAdminAuthStore, 'loading' | 'user'> = {
    loading: false,
    user: null,
};

export const useAdminAuthStore = create<IAdminAuthStore>()(
    persist(
        (set, get) => ({
            ...InitialState,

            setUser(user) {
                set({ user }, false);
            },
            setLoading(loading) {
                set({ loading }, false);
            },

            async login(data: AdminLoginForm) {
                const { setLoading, auth } = get();

                setLoading(true);

                try {
                    const { token } = await API.post('/auth/login', { email: data.email, password: data.password }).then(res => res.data);

                    localStorage.setItem('adminToken', token);
                    await auth();
                } catch (e) {
                    if (e instanceof Error) {
                        throw e;
                    }
                } finally {
                    setLoading(false);
                }
            },
            async auth() {
                const { setLoading, setUser } = get();

                setLoading(true);

                try {
                    const user = await API.get('/auth/me').then(res => res.data);
                    setUser(user);
                } catch {
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            },
            logout() {
                const { setUser } = get();

                localStorage.removeItem('token');
                setUser(null);
            },
        }),
        { name: 'AdminAuth' }
    )
);
