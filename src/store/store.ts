import { create } from "zustand";

interface StoreData {
    collections: Collections;
    setCollections: (collections: Collections) => void;
    nftsToTransfer: Nft[];
    setNftsToTransfer: (nftsToTransfer: Nft[]) => void;
    displayPaneMode: DisplayPane;
    setDisplayPaneMode: (displayPaneMode: DisplayPane) => void;
    reset: () => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const useStore = create<StoreData>((set) => ({
    collections: [],
    setCollections: (collections) => set({ collections }),
    nftsToTransfer: [],
    setNftsToTransfer: (nftsToTransfer) => set({ nftsToTransfer }),
    displayPaneMode: "start",
    setDisplayPaneMode: (displayPaneMode) => set({ displayPaneMode }),
    reset: () => set({ displayPaneMode: "start", nftsToTransfer: [], error: null, loading: false }),
    loading: false,
    setLoading: (loading) => set({ loading }),
    error: null,
    setError: (error) => set({ error }),
}));

export { useStore };
