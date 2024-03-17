import { useState, useEffect } from "react";
import {
  getProviderAndAccounts,
  updateWallet,
} from "../services/ethereumService";
import { EthereumEvents, RequestMethods } from "@/const";

const useWallet = () => {
  const initialState = { accounts: [], balance: "", chainId: "" };

  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [wallet, setWallet] = useState(initialState);
  const [isConnecting, setIsConnecting] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const firstAccount = wallet.accounts?.[0];

  // todo: i need zustand to make state accesable everywhere
  // отдельный кастомный хук только для пейдж
  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts, setWallet);
      } else {
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    getProviderAndAccounts(
      setHasProvider,
      refreshAccounts,
      refreshChain,
      setIsConnecting
    );

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

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: RequestMethods.RequestAccounts,
      });
      setErrorMessage("");
      updateWallet(accounts, setWallet);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await window.ethereum.request({
        method: RequestMethods.RevokeWalletPermissions,
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      setErrorMessage("");
      setWallet(initialState);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return {
    hasProvider,
    wallet,
    isConnecting,
    errorMessage,
    setErrorMessage,
    handleConnect,
    handleDisconnect,
    firstAccount,
  };
};

export default useWallet;
