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


function Navbar() {
  const address = useSelector((state: RootState) => state.wallet.address);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);
  const dispatch = useDispatch();
  return (
    <div className='flex items-center justify-between w-full px-4 py-4 bg-white text-primary shadow shadow-sm '>
      <div className='text-lg font-bold border-b-2 px-2 border-black'>
        BholumaWallet
      </div>
      {address &&
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {address.toString().substring(0, 20)}
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