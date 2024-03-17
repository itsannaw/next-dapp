import CustomButton from "@/components/buttons/CustomButton";
import { RequestMethods } from "@/const";
import useWallet from "@/hooks/useWallet";
import { TextField } from "@mui/material";
import { useState } from "react";

const GAS_PARAMS = {
  gasLimit: "0x5028",
  maxPriorityFeePerGas: "0x3b9aca00",
  maxFeePerGas: "0x2540be400",
};

const SendTransaction = () => {
  const { firstAccount } = useWallet();
  const [recipient, setRecipient] = useState("");

  const handleRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipient(event.target.value);
  };

  const openMetamaskTransaction = async () => {
    try {
      await window.ethereum!.request({
        method: RequestMethods.SendTransaction,
        params: [
          {
            from: firstAccount,
            to: recipient,
            ...GAS_PARAMS,
          },
        ],
      });
    } catch (error: any) {
      console.error("Error sending transaction:", error.message);
    }
  };

  return (
    <div className="flex flex-col mt-10 md:mt-20 gap-5 text-center border-2 border-white p-10 bg-white box-shadow-2xl rounded-2xl">
      <span className="text-base font-semibold">Send transactions</span>
      <TextField
        label="To"
        variant="outlined"
        onChange={handleRecipientChange}
      />
      <CustomButton text="Send" onClick={openMetamaskTransaction} />
    </div>
  );
};

export default SendTransaction;
