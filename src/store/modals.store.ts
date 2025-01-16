import { create } from "zustand";

type ModalNames = "createEventModal" | "nftMintedModal";

interface ModalState {
  isOpen: boolean;
  formData: Record<string, any>;
}

interface ModalStore {
  modals: Record<ModalNames, ModalState>;

  openModal: (name: ModalNames, initialData?: Record<string, any>) => void;

  closeModal: (name: ModalNames) => void;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {
    createEventModal: { isOpen: false, formData: {} },
    nftMintedModal: { isOpen: false, formData: {} },
  },

  openModal: (name, initialData) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [name]: {
          isOpen: true,
          formData: initialData || {},
        },
      },
    })),

  closeModal: (name) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [name]: {
          ...state.modals[name],
          isOpen: false,
          formData: {},
        },
      },
    })),
}));
