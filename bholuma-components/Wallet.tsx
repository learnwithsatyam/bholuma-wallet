import * as React from "react"
import { RefreshCcw } from "lucide-react"
import { Send, RadioReceiverIcon, Replace } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getAirdrop } from "@/lib/solanaChain"
import { BholumaButton } from "./BholumaButton"
import { toast } from "sonner"
import { getDate } from "@/lib/utils"

function Wallet({ openSendModal, handleRefresh, handleAirdrop }: { openSendModal: () => void, handleRefresh: () => Promise<number>, handleAirdrop: () => void }) {
    const [solAmount, setSolAmount] = React.useState(0);
    React.useEffect(() => {
        const fetchBalance = async () => {
            const balance = await handleRefresh();
            setSolAmount(balance);
        };
        fetchBalance();
    }, []);
    return (
        <div className="flex items-center justify-center h-screen w-screen">

            <Card className="w-1/2  text-left dark:bg-gray-800 space-y-4">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">
                        Overview
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="text-5xl font-bold">
                            {solAmount} SOL
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Available balance
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div>
                        <BholumaButton variant="outline" className="w-full rounded-lg" onClick={async () => setSolAmount(await handleRefresh())} icon={<RefreshCcw className="h-4 w-4" />}>
                            <div className="text-xs text-center text-muted-foreground">
                                Refresh
                            </div>
                        </BholumaButton>
                    </div>
                    <div className="text-center">
                        <BholumaButton variant="outline" className="w-full rounded-lg" onClick={openSendModal} icon={<Send className="h-4 w-4" />}>
                            <div className="text-xs text-center text-muted-foreground">
                                SOL
                            </div>
                        </BholumaButton>
                    </div>
                    <div>
                        <BholumaButton variant="outline" className="w-full rounded-lg" onClick={handleAirdrop} icon={<RadioReceiverIcon className="h-4 w-4" />} >
                            <div className="text-xs text-center text-muted-foreground">
                                Airdrop
                            </div>
                        </BholumaButton>
                    </div>
                    <div>
                        <BholumaButton variant="outline" className="w-full rounded-lg" onClick={() => { toast("Swap is not supported yet. Use Bholuma DEX to swap tokens",{description: getDate()}) }} icon={<Replace className="h-4 w-4" />}>
                            <div className="text-xs text-center text-muted-foreground">
                                Swap
                            </div>
                        </BholumaButton>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Wallet