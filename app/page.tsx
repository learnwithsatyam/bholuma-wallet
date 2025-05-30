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

  let content;

  switch (true) {
    case !address:
      content = <WalletLogin />;
      break;

    case !!address && !openSendModal:
      content = <Wallet openSendModal={() => setOpenSendModal(true)} />;
      break;

    case !!address && openSendModal:
      content = <SendSol onClose={() => setOpenSendModal(false)} />;
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
