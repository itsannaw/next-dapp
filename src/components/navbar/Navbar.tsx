"use client";
import { AppBar, Toolbar } from "@mui/material";
import useWallet from "@/hooks/useWallet";
import CustomButton from "../buttons/CustomButton";

const Navbar = () => {
  const { wallet, firstAccount, handleDisconnect } = useWallet();

  const handleEtherscanClick = () => {
    window.open(`https://etherscan.io/address/${firstAccount}`, "_blank");
  };

  return (
    <AppBar color="inherit" position="static">
      <Toolbar className="flex flex-wrap gap-5 items-center justify-between max-lg:justify-center max-md:flex-col p-6">
        <span className="font-bold">Next dapp</span>
        {wallet.accounts.length > 0 && (
          <div className="flex flex-wrap max-md:flex-col  gap-4 text-sm font-semibold items-center">
            <span className="text-[10px] md:text-xs lg:text-sm">
              🟢 {firstAccount}
            </span>
            <div className="flex gap-1">
              <div>Balance: {wallet.balance}</div>
              {wallet.chainId === "0x1" && <div>ETH</div>}
              {wallet.chainId === "0x38" && <div>BNB</div>}
            </div>
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
