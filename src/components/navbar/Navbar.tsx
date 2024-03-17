"use client";
import { AppBar, Toolbar } from "@mui/material";
import useWallet from "@/hooks/useWallet";
import CustomButton from "../buttons/CustomButton";

const Navbar = () => {
  const { wallet, handleDisconnect } = useWallet();

  const handleEtherscanClick = () => {
    window.open(`https://etherscan.io/address/${wallet.accounts[0]}`, "_blank");
  };

  return (
    <AppBar color="inherit" position="static">
      <Toolbar className="flex justify-between">
        <div className="flex gap-4 items-center">
          <span className="font-bold">Next dapp</span>
          <span className="text-sm font-semibold">🟢 {wallet.accounts[0]}</span>
        </div>
        {wallet.accounts.length > 0 && (
          <div className="flex gap-4 text-sm font-semibold items-center">
            <div>Balance: {wallet.balance}</div>
            <CustomButton
              text="Etherscan"
              size="small"
              onClick={handleEtherscanClick}
            />
            <CustomButton
              text="Disconnect"
              size="small"
              onClick={handleDisconnect}
            />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
