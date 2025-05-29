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
        <Card className="w-[350px] text-left dark:bg-gray-800 dark">
            <CardHeader>
                <CardTitle>
                    Overview
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="text-2xl font-bold">
                        0.00 SOL
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Available balance
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div>
                    <Button variant="ghost" className="w-full rounded-lg">
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        Refresh
                    </div>
                </div>
                <div className="text-center">
                    <Button variant="outline" className="w-full rounded-lg">
                        <Send className="h-4 w-4" />
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        SOL
                    </div>
                </div>
                <div>
                    <Button variant="ghost" className="w-full rounded-lg">
                        <RadioReceiverIcon className="h-4 w-4" />
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        Recieve
                    </div>
                </div>
                <div>
                    <Button variant="ghost" className="w-full rounded-lg">
                        <Replace className="h-4 w-4" />
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        Swap
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default Wallet