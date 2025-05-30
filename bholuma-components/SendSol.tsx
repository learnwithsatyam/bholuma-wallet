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

function SendSol({ openDrawer, setOpenDrawer }: { openDrawer: boolean, setOpenDrawer: (open: boolean) => void }) {
    return (
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
            {/* No DrawerTrigger here since you're controlling it externally */}
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <div className="space-y-4 items-center space-x-1 px-3">
                    <Input type="number" placeholder="0" className='text-6xl md:text-6xl h-fit md:h-fit border-none outline-none text-center text-lg dark:focus:outline-none dark:focus:ring-0' />
                    <Input type="number" placeholder="Address to send..." />
                </div>
                <DrawerFooter>
                    <div className="flex space-x-2">
                        <Button className='w-1/2' onClick={() => { /* submit action */ }}>Send</Button>
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