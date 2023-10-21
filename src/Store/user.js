import { create } from "zustand";

const defaultUser = {
  connected: false,
  user: "",
  cred: "",
  params: {
    civilite: "",
    nom: "Test",
    prenom: "",
    telephone: "",
  },

};

export const useUser = create((set) => ({
  ...defaultUser,
  connectUser: (user, cred, infos, autoDeclaration) =>
    set((state) => ({
      connected: true,
      user: user.toLowerCase(),
      cred,
      params: {
        ...state.params,
        ...infos,
      },
      autoDeclaration: { ...state.autoDeclaration, ...autoDeclaration },
    })),
  createUser: (user, cred) =>
    set(() => ({ connected: true, user: user.toLowerCase(), cred })),
  disconnectUser: () => set(() => ({ ...defaultUser })),
  modifyPassword: (pwd) => set(() => ({ cred: pwd })),
  updateParams: (infos) =>
    set((state) => ({
      params: {
        ...state.params,
        ...infos,
      },
    })),

}));
