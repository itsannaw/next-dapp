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

export enum ChainId {
  Ethereum = "0x1",
  BNB = "0x38",
}
