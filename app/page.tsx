"use client";
import Navbar from "@/bholuma-components/Navbar";
import SendSol from "@/bholuma-components/SendSol";
import Wallet from "@/bholuma-components/Wallet";
import WalletLogin from "@/bholuma-components/WalletLogin";
import { RootState } from "@/store/index";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConnection, sendSol, getBalance, getAirdrop } from "@/lib/solanaChain";
import { toast } from "sonner";

export default function Home() {
  const address = useSelector((state: RootState) => state.wallet.address);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);

  const [openSendModal, setOpenSendModal] = useState(false);
  const [solAmount, setSolAmount] = useState(0);
  const [receiveAddress, setReceiveAddress] = useState("");

  const handleSendSol = async () => {
    // Logic to send SOL using solAmount and receiveAddress
    const res = await sendSol(
      address,
      receiveAddress,
      solAmount,
      privateKey
    );

    toast(res, {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    })
  }

  const handleAirdrop = async () => {
    // Logic to request an airdrop
    const res = await getAirdrop(address);
    toast(res, {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    })
  }

  const handleRefresh = async () => {
    // Logic to refresh the wallet state
    const solBalance = await getBalance(address);
    return solBalance;
  }

  let content;

  switch (true) {
    case !address:
      content = <WalletLogin />;
      break;

    case !!address && !openSendModal:
      content = <Wallet openSendModal={() => setOpenSendModal(true)} handleRefresh={handleRefresh} handleAirdrop={handleAirdrop} />;
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
