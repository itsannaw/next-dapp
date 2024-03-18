import { useState } from "react";
import { updateWallet } from "../services/ethereumService";
import { RequestMethods } from "@/const";
import { getDefaultWallet, useWalletStore } from "@/stores/walletStore";

const useWallet = () => {
  const { hasProvider, wallet, isConnecting, setWallet, setIsConnecting } =
    useWalletStore();
  const [errorMessage, setErrorMessage] = useState("");
  const firstAccount = wallet.accounts?.[0];

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: RequestMethods.RequestAccounts,
      });
      setErrorMessage("");
      await updateWallet(accounts, setWallet);
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
      setWallet(getDefaultWallet());
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
