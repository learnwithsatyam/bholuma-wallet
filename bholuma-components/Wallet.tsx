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

function Wallet() {
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
                        0.00 SOL
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Available balance
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div>
                    <Button variant="outline" className="w-full rounded-lg">
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <div className="text-xs text-center text-muted-foreground">
                        Refresh
                    </div>
                </div>
                <div className="text-center">
                    <Button variant="outline" className="w-full rounded-lg">
                        <Send className="h-4 w-4" />
                    </Button>
                    <div className="text-xs text-center text-muted-foreground">
                        SOL
                    </div>
                </div>
                <div>
                    <Button variant="outline" className="w-full rounded-lg">
                        <RadioReceiverIcon className="h-4 w-4" />
                    </Button>
                    <div className="text-xs text-center text-muted-foreground">
                        Recieve
                    </div>
                </div>
                <div>
                    <Button variant="outline" className="w-full rounded-lg">
                        <Replace className="h-4 w-4" />
                    </Button>
                    <div className="text-xs text-center text-muted-foreground">
                        Swap
                    </div>
                </div>
            </CardFooter>
        </Card>
        </div>
    )
}

export default Wallet