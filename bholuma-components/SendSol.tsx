import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function SendSol({ openDrawer, setOpenDrawer, setSolAmount, setRecieveAddress, handleSendSol }: { openDrawer: boolean, setOpenDrawer: (open: boolean) => void, setSolAmount: (amount: number) => void, setRecieveAddress: (address: string) => void, handleSendSol: () => void }) {
    return (
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
            {/* No DrawerTrigger here since you're controlling it externally */}
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <div className="space-y-4 items-center space-x-1 px-3">
                    <Input type="text" placeholder="0" className='text-6xl md:text-6xl h-fit md:h-fit border-none outline-none text-center text-lg dark:focus:outline-none dark:focus:ring-0'
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => {
                            const val = e.target.value;
                            if (/^\d*$/.test(val)) {
                                setSolAmount(Number(val)); // only set state if it's an integer or empty
                            }else{
                                e.target.value = ''; // reset input if invalid
                            }
                        }} />
                    <Input type="text" placeholder="Address to send..." onChange={(e) => {
                        setRecieveAddress(e.target.value);
                    }} />
                </div>
                <DrawerFooter>
                    <div className="flex space-x-2">
                        <Button className='w-1/2' onClick={() => handleSendSol()}>Send</Button>
                        <DrawerClose className='w-1/2' asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default SendSol