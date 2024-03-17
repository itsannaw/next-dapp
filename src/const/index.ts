export enum RequestMethods {
  GetBalance = "eth_getBalance",
  ChainId = "eth_chainId",
  SendTransaction = "eth_sendTransaction",
  RequestAccounts = "eth_requestAccounts",
  Accounts = "eth_accounts",
  RevokeWalletPermissions = "wallet_revokePermissions",
}

export enum EthereumEvents {
    ChainChanged = "chainChanged",
    AccountsChanged = "accountsChanged",
}