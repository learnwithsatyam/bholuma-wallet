import Navbar from "@/bholuma-components/Navbar";
import WalletLogin from "@/bholuma-components/WalletLogin";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <WalletLogin />
        </div>
      </div>
    </div>
  );
}
