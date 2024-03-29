import { create } from 'zustand';

const UserStore = create((set) => ({
    auth: false,
    setAuth: (auth) => set({ auth }),
    user: null,
    setUser: (user) => set({ user }),
    token: null,
    setToken: (token) => set({ token }),
    pathUser: "",
    setPathUser: (pathUser) => set({ pathUser}),
}));

export default UserStore;