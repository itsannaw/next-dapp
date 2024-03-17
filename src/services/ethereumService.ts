import { EthereumEvents, RequestMethods } from "@/const";
import { formatBalance } from "@/utils";
import detectEthereumProvider from "@metamask/detect-provider";

export const getProviderAndAccounts = async (
  setHasProvider: (hasProvider: boolean) => void,
  refreshAccounts: (accounts: any) => void,
  refreshChain: (chainId: any) => void,
  setIsConnecting: (isConnecting: boolean) => void
) => {
  setIsConnecting(true);
  try {
    const provider = await detectEthereumProvider({ silent: true });
    setHasProvider(Boolean(provider));

    if (provider) {
      const accounts = await window.ethereum.request({
        method: RequestMethods.Accounts,
      });
      refreshAccounts(accounts);
      window.ethereum.on(EthereumEvents.AccountsChanged, refreshAccounts);
      window.ethereum.on(EthereumEvents.ChainChanged, refreshChain);
    }
  } catch (error: any) {
    console.error("Error getting accounts:", error.message);
  } finally {
    setIsConnecting(false);
  }
};

export const updateWallet = async (
  accounts: any,
  setWallet: (wallet: any) => void
) => {
  const balance = formatBalance(
    await window.ethereum!.request({
      method: RequestMethods.GetBalance,
      params: [accounts[0], "latest"],
    })
  );
  const chainId = await window.ethereum!.request({
    method: RequestMethods.ChainId,
  });
  setWallet({ accounts, balance, chainId });
};
