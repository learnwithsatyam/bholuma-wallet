"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/index";
import { setAddress, setPrivateKey } from "@/store/walletSlice";
import { setNetwork, resetNetwork } from "@/store/blockchainNetworkSlice";
import { Button } from "@/components/ui/button";
import { Copy, MenuIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function Navbar() {
  const address = useSelector((state: RootState) => state.wallet.address);
  const privateKey = useSelector((state: RootState) => state.wallet.privateKey);
  const network = useSelector(
    (state: RootState) => state.blockchainNetwork.network,
  );
  const isDevnet = network === "devnet"; // Assuming 'devnet' is the name of the devnet network
  const handleNetworkChange = (checked: boolean) => {
    if (checked) {
      dispatch(setNetwork("devnet"));
    } else {
      dispatch(resetNetwork());
    }
  };
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between w-full px-4 py-4 text-primary shadow-white shadow-sm ">
      <div className="flex items-center space-x-2">
        <img
          src="/bholumaIcon.png"
          alt="BholumaWallet Logo"
          className="h-8 mr-2"
        />
        <div className="text-lg font-bold">BholumaWallet</div>
      </div>
      {address && (
        <div>
          <div className="hidden md:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airplane-mode"
                      checked={isDevnet}
                      onCheckedChange={handleNetworkChange}
                    />
                    <Label htmlFor="Devnet">Devnet</Label>
                  </div>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <div className="">
                      <Button
                        variant="ghost"
                        className="flex items-center mx-2"
                        onClick={() => {
                          navigator.clipboard.writeText(address.toString());
                        }}
                      >
                        <Copy className="h-4 w-4" />
                        {address.toString().substring(0, 10)}...
                      </Button>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <Button
                      variant="ghost"
                      className="w-full bg-pink-600"
                      onClick={() => {
                        dispatch(setAddress(""));
                        dispatch(setPrivateKey(""));
                      }}
                    >
                      Disconnect
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <Sheet>
            <SheetTrigger className="md:hidden">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="mb-10">Menu</SheetTitle>
              </SheetHeader>
              <div>
                <NavigationMenu>
                  <NavigationMenuList className="flex flex-col space-y-5 items-start">
                    <NavigationMenuItem>
                      <div className="flex items-center space-x-2 pl-3">
                        <Switch
                          id="airplane-mode"
                          checked={isDevnet}
                          onCheckedChange={handleNetworkChange}
                        />
                        <Label htmlFor="Devnet">Devnet</Label>
                      </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <div>
                          <Button
                            variant="ghost"
                            className="flex items-center justify-start"
                            onClick={() => {
                              navigator.clipboard.writeText(address.toString());
                            }}
                          >
                            <Copy className="h-4" />
                            {address.toString().substring(0, 10)}...
                          </Button>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink>
                        <Button
                          variant="ghost"
                          className="w-full bg-pink-600 ml-3"
                          onClick={() => {
                            dispatch(setAddress(""));
                            dispatch(setPrivateKey(""));
                          }}
                        >
                          Disconnect
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </div>
  );
}

export default Navbar;
