import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Wallet {
  accounts: string[];
  balance: string;
  chainId: string;
}

export const getDefaultWallet = (): Wallet => {
  return {
    accounts: [],
    balance: "",
    chainId: "",
  };
};
interface WalletStore {
  wallet: Wallet;
  isConnecting: boolean;
  hasProvider: boolean;
  setHasProvider: (hasProvider: boolean) => void;
  setWallet: (wallet: Wallet) => void;
  setIsConnecting: (isConnecting: boolean) => void;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set) => ({
      wallet: getDefaultWallet(),
      isConnecting: true,
      hasProvider: false,
      setHasProvider: (hasProvider: boolean) => set({ hasProvider }),
      setWallet: (wallet: Wallet) => set({ wallet }),
      setIsConnecting: (isConnecting: boolean) => set({ isConnecting }),
    }),
    {
      name: "wallet-storage",
    }
  )
);
