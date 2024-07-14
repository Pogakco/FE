import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type TExitButton = "delete" | "exit" | "lookaround";
interface StoreState {
  type: TExitButton;
  changeType: (arg: TExitButton) => void;
  modalOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModalExit = create<StoreState>()(
  devtools((set, get) => ({
    type: "lookaround",
    changeType: (arg) => {
      set({ type: arg });
      get().onOpen();
    },
    modalOpen: false,
    onOpen: () => set({ modalOpen: true }),
    onClose: () => set({ modalOpen: false })
  }))
);
