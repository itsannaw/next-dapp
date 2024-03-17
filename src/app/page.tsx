"use client";
import React from "react";
import useWallet from "@/hooks/useWallet";
import { Alert, CircularProgress } from "@mui/material";
import Image from "next/image";
import CustomButton from "@/components/buttons/CustomButton";
import SendTransaction from "@/components/ui/forms/SendTransaction";

const App = () => {
  const {
    hasProvider,
    wallet,
    isConnecting,
    setErrorMessage,
    errorMessage,
    handleConnect,
  } = useWallet();

  const disableConnect = Boolean(wallet) && isConnecting;

  const handleDownloadClick = () => {
    window.open("https://metamask.io/download/", "_blank");
  };

  const hasProviderTemplate = (
    <>
      {typeof window !== 'undefined' && window.ethereum?.isMetaMask && !wallet.accounts.length && (
        <>
          <div className="flex flex-col gap-10 max-w-[529px] max-sm:items-center">
            <div className="flex flex-col text-4xl text-white sm:text-start text-center font-semibold leading-normal">
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
            <Image
              className="max-sm:hidden"
              src="/IMG.svg"
              alt="phone"
              width={628}
              height={519}
            />
          </div>
        </>
      )}
    </>
  );

  const downloadMetaMaskTemplate = (
    <div className="flex flex-col gap-10 max-w-[700px] text-4xl mt-16 text-white text-center font-semibold leading-normal">
      <span>
        In order to use this web application, you need to install Metamask or
        allow access to this site.
      </span>
      <div>
        <CustomButton
          text="Download"
          onClick={handleDownloadClick}
          size="large"
        />
      </div>
    </div>
  );

  return isConnecting ? (
    <div className="flex justify-center items-center mt-5 md:mt-10 p-6">
      <CircularProgress color="inherit" />
    </div>
  ) : (
    <div className="flex justify-center items-center mt-5 md:mt-10 p-6">
      {hasProvider ? hasProviderTemplate : downloadMetaMaskTemplate}
      {wallet.accounts.length > 0 && <SendTransaction />}
      {errorMessage && (
        <div
          className="absolute bottom-0 right-0"
          onClick={() => setErrorMessage("")}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </div>
      )}
    </div>
  );
};

export default App;
