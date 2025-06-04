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
import CreateWallet from "@/bholuma-components/CreateWallet";
import { getDate } from "@/lib/utils";

export default function Home() {
  const address = useSelector((state: RootState) => state.wallet.address);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);
  const blockchainNetwork = useSelector((state: RootState) => state.blockchainNetwork.network);

  const [openSendModal, setOpenSendModal] = useState(false);
  const [solAmount, setSolAmount] = useState(0);
  const [receiveAddress, setReceiveAddress] = useState("");
  const [alreadyHaveWallet, setAlreadyHaveWallet] = useState(false);

  const handleSendSol = async () => {
    // Logic to send SOL using solAmount and receiveAddress
    const res = await sendSol(
      blockchainNetwork,
      address,
      receiveAddress,
      solAmount,
      privateKey
    );

    toast(res, {
          description: getDate(),
        })
  }

  const handleAirdrop = async () => {
    // Logic to request an airdrop
    try{
    const res = await getAirdrop(blockchainNetwork, address);
    toast(res, {
      description: getDate(),
    })
    }
    catch (error) {
      console.error("Airdrop failed:", error);
      toast.error("Airdrop failed. Please try again later.");
      return;
    }
    
  }

  const handleRefresh = async () => {
    // Logic to refresh the wallet state
    const solBalance = await getBalance(blockchainNetwork, address);
    return solBalance;
  }

  let content;

  switch (true) {
    case !address && alreadyHaveWallet:
      content = <WalletLogin />;
      break;

    case !!address && !openSendModal && alreadyHaveWallet:
      content = <Wallet openSendModal={() => setOpenSendModal(true)} handleRefresh={handleRefresh} handleAirdrop={handleAirdrop} />;
      break;

    case !!address && openSendModal && alreadyHaveWallet:
      content = <SendSol openDrawer={openSendModal} setOpenDrawer={setOpenSendModal} setSolAmount={setSolAmount} setRecieveAddress={setReceiveAddress} handleSendSol={handleSendSol} />;
      break;

    default:
      content = <CreateWallet alreadyHaveWallet={alreadyHaveWallet} setAlreadyHaveWallet={setAlreadyHaveWallet} />;
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
