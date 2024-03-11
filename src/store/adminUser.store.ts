import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AdminUser = {
    _id: string;
}

type AdminLoginForm = {
    email: string;
    password: string;
}

interface IAdminAuthStore {
    loading: boolean;
    user: null | AdminUser;
    setUser: (user: AdminUser | null) => void;
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

            async login(form) {
                const { setLoading, auth } = get();

                setLoading(true);

                try {
                    // const { token } = await login(form);

                    // localStorage.setItem('token', token);
                    console.log('login');
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
                    // const user = await identify();

                    // setUser(user);
                    console.log('auth');
                    setUser({ _id: '1' });
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
