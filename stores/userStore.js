import create from "zustand";

import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      logInUser: (loggedInUser) => set((state) => ({ user: loggedInUser })),
      signOutUser: () => set({ user: null }),
      setUsername: (usersUsername) =>
        set((state) => ({ user: {...state.user, username: usersUsername }})),
    }),
    {
      name: "current-user-storage",
    }
  )
);
