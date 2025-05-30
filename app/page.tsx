"use client";
import Navbar from "@/bholuma-components/Navbar";
import SendSol from "@/bholuma-components/SendSol";
import Wallet from "@/bholuma-components/Wallet";
import WalletLogin from "@/bholuma-components/WalletLogin";
import { RootState } from "@/store/index";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const address = useSelector((state: RootState) => state.wallet.address);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);

  const [openSendModal, setOpenSendModal] = useState(false);
  const [solAmount, setSolAmount] = useState(0);
  const [receiveAddress, setReceiveAddress] = useState("");

  const handleSendSol = () => {
    // Logic to send SOL using solAmount and receiveAddress
  }

  const handleRefresh = () => {
    // Logic to refresh the wallet state
  }

  let content;

  switch (true) {
    case !address:
      content = <WalletLogin />;
      break;

    case !!address && !openSendModal:
      content = <Wallet openSendModal={() => setOpenSendModal(true)} handleRefresh={handleRefresh} />;
      break;

    case !!address && openSendModal:
      content = <SendSol openDrawer={openSendModal} setOpenDrawer={setOpenSendModal} setSolAmount={setSolAmount} setRecieveAddress={setReceiveAddress} handleSendSol={handleSendSol} />;
      break;

    default:
      content = <div>Unexpected state</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          {content}
        </div>
      </div>
    </div>
  );
}
