import { useState, useEffect } from "react";
import {
  getProviderAndAccounts,
  updateWallet,
} from "../services/ethereumService";
import { EthereumEvents } from "@/const";
import { useWalletStore } from "@/stores/walletStore";

const useUpdateWallet = () => {
  const initialState = { accounts: [], balance: "", chainId: "" };

  const [errorMessage, setErrorMessage] = useState("");
  const { wallet, setWallet, setHasProvider, hasProvider, setIsConnecting } =
    useWalletStore();
  const firstAccount = wallet.accounts?.[0];

  useEffect(() => {
    const refreshAccounts = async (accounts: any) => {
      setIsConnecting(true);

      if (accounts.length > 0) {
        await updateWallet(accounts, setWallet);
      } else {
        setWallet(initialState);
      }
      setIsConnecting(false);
    };

    const refreshChain = (chainId: any) => {
      setWallet({ ...wallet, chainId });
    };

    const loadPage = async () => {
      setIsConnecting(true);
      await getProviderAndAccounts(
        refreshAccounts,
        refreshChain,
        setHasProvider
      );
      setIsConnecting(false);
    };

    loadPage();

    return () => {
      window.ethereum?.removeListener(
        EthereumEvents.AccountsChanged,
        refreshAccounts
      );
      window.ethereum?.removeListener(
        EthereumEvents.ChainChanged,
        refreshChain
      );
    };
  }, []);

  return {
    hasProvider,
    wallet,
    errorMessage,
    setErrorMessage,
    firstAccount,
  };
};

export default useUpdateWallet;
