"use client";
import Navbar from "@/bholuma-components/Navbar";
import Wallet from "@/bholuma-components/Wallet";
import WalletLogin from "@/bholuma-components/WalletLogin";
import { RootState } from "@/store/index";
import {useSelector, useDispatch} from "react-redux";

export default function Home() {
  const address = useSelector((state: RootState) => state.wallet.address);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          { address ?
            <Wallet /> : <WalletLogin />}
        </div>
      </div>
    </div>
  );
}
