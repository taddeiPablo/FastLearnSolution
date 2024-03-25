import { create } from 'zustand';

//TODO: IMPLEMENTAR UN USEAUTH PARA PODER AUTENTICAR TAMBIEN LAS ROUTE DE LA APP

const UserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    token: null,
    setToken: (token) => set({ token }),
}));

export default UserStore;