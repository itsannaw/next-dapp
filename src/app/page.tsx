"use client";

import React from "react";
import useWallet from "@/hooks/useWallet";
import { Alert, Button } from "@mui/material";
import Image from "next/image";
import CustomButton from "@/components/buttons/CustomButton";

const App = () => {
  const {
    hasProvider,
    wallet,
    isConnecting,
    error,
    setError,
    errorMessage,
    handleConnect,
  } = useWallet();

  const disableConnect = Boolean(wallet) && isConnecting;

  const handleDownloadClick = () => {
    window.open("https://metamask.io/download/", "_blank");
  };

  return (
    <div className="flex justify-center items-center mt-10">
      {hasProvider ? (
        <>
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
            <>
              <div className="flex flex-col gap-10 max-w-[529px]">
                <div className="flex flex-col text-4xl text-white text-start font-semibold leading-normal">
                  Connect MetaMask to unlock all the features of the website!
                </div>
                <div>
                  <CustomButton
                    text="Get started"
                    onClick={handleConnect}
                    size="large"
                    disabled={disableConnect}
                  />
                </div>
              </div>
              <div>
                <Image src="/IMG.svg" alt="phone" width={628} height={519} />
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-10 max-w-[700px] text-4xl mt-16 text-white text-center font-semibold leading-normal">
          <span>
            In order to use this web application, you need to install Metamask
            or allow access to this site.
          </span>
          <div>
            <CustomButton
              text="Download"
              onClick={handleDownloadClick}
              size="large"
            />
          </div>
        </div>
      )}
      {wallet.accounts.length > 0 && (
        <>
          <div className="flex flex-col gap-10 max-w-[700px] text-4xl mt-16 text-white text-center font-semibold leading-normal"></div>
          <span>
            In order to use this web application, you need to install Metamask
            or allow access to this site.
          </span>
        </>
      )}
      {error && (
        <div
          className="absolute bottom-0 right-0"
          onClick={() => setError(false)}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </div>
      )}
    </div>
  );
};

export default App;
