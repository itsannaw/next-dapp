import { formatBalance } from "@/utils";
import detectEthereumProvider from "@metamask/detect-provider";

export const getProvider = async (
  setHasProvider: (hasProvider: boolean) => void,
  refreshAccounts: (accounts: any) => void,
  refreshChain: (chainId: any) => void
) => {
  const provider = await detectEthereumProvider({ silent: true });
  setHasProvider(Boolean(provider));

  if (provider) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    refreshAccounts(accounts);
    window.ethereum.on("accountsChanged", refreshAccounts);
    window.ethereum.on("chainChanged", refreshChain);
  }
};

export const updateWallet = async (
  accounts: any,
  setWallet: (wallet: any) => void
) => {
  const balance = formatBalance(
    await window.ethereum!.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    })
  );
  const chainId = await window.ethereum!.request({
    method: "eth_chainId",
  });
  setWallet({ accounts, balance, chainId });
};
