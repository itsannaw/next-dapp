import { useState, useEffect } from "react";
import { getProvider, updateWallet } from "../services/ethereumService";

const useWallet = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    getProvider(setHasProvider, refreshAccounts, refreshChain);

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setError(false);
      updateWallet(accounts, setWallet);
    } catch (err: any) {
      setError(true);
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  const handleDisconnect = async () => {
    try {
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{
            eth_accounts: {}
          }]
        });
        setWallet(initialState);
    } catch (err: any) {
      setError(true);
      setErrorMessage(err.message);
    }
  };

  return {
    hasProvider,
    wallet,
    isConnecting,
    error,
    errorMessage,
    handleConnect,
    handleDisconnect,
    setError,
  };
};

export default useWallet;
