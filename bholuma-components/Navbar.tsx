"use client"

import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import { setAddress, setPrivateKey } from '@/store/walletSlice';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';


function Navbar() {
  const address = useSelector((state: RootState) => state.wallet.address);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);
  const dispatch = useDispatch();
  return (
    <div className='flex items-center justify-between w-full px-4 py-4 text-primary shadow-white shadow-sm '>
      <div className='text-lg font-bold'>
        BholumaWallet
      </div>
      {address &&
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Button variant="ghost" className='w-full' onClick={() => {
                    navigator.clipboard.writeText(address.toString());
                  }}>
                    <Copy className='h-4 w-4' />
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <span className='p-2 rounded-md text-primary font-bold flex items-center'>
                    {address.toString().substring(0, 20)}
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Button variant="ghost"
                    className='w-full'
                    onClick={() => {
                      dispatch(setAddress(''));
                      dispatch(setPrivateKey(''));
                    }}>
                    Disconnect
                  </Button>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      }
    </div>
  )
}

export default Navbar;