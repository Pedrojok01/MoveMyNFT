import { create } from "zustand";

interface StoreData {
    collections: Collections;
    setCollections: (collections: Collections) => void;
    displayPaneMode: DisplayPane;
    setDisplayPaneMode: (displayPaneMode: DisplayPane) => void;
    resetDisplayPane: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const useStore = create<StoreData>((set) => ({
    collections: [],
    setCollections: (collections) => set({ collections }),
    displayPaneMode: "start",
    setDisplayPaneMode: (displayPaneMode) => set({ displayPaneMode }),
    resetDisplayPane: () => set({ displayPaneMode: "start" }),
    loading: false,
    setLoading: (loading) => set({ loading }),
    error: null,
    setError: (error) => set({ error }),
}));

export { useStore };
