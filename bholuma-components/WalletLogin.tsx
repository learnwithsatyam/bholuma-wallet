"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/index';
import { setPrivateKey, setAddress } from '@/store/walletSlice';
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';

function WalletLogin() {
    const [localPrivateKey, setLocalPrivateKey] = useState("");
    const [localPassphrase, setLocalPassphrase] = useState("");
    const dispatch = useDispatch();
    const privateKey = useSelector((state: RootState) => state.wallet.privateKey);
    const address = useSelector((state: RootState) => state.wallet.address);

    const handleRecoveryFromPrivateKey = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Use localPrivateKey here to recover the wallet
        // Example: dispatch(setPrivateKey(localPrivateKey));

        var privateKeyBytes = bs58.decode(localPrivateKey);
        var keyPair = Keypair.fromSecretKey(privateKeyBytes);

        dispatch(setPrivateKey(keyPair.secretKey));
        dispatch(setAddress(keyPair.publicKey));
    };

    const handleRecoveryFromPassphrase = (event: React.MouseEvent<HTMLButtonElement>) => {

        const seed = bip39.mnemonicToSeedSync(localPassphrase, "");
        const keyPair = Keypair.fromSeed(seed.subarray(0, 32));

        dispatch(setPrivateKey(bs58.encode(keyPair.secretKey)));
        dispatch(setAddress(keyPair.publicKey.toBase58()));
    };

    return (
        <div className=' flex flex-col items-center justify-center h-screen w-screen'>
            <Tabs defaultValue="passphrase" className="w-full max-w-md">
                <TabsList>
                    <TabsTrigger value="privateKey">Private key</TabsTrigger>
                    <TabsTrigger value="passphrase">Passphrase</TabsTrigger>
                </TabsList>
                <TabsContent value="privateKey">
                    <Card className="w-full h-full text-left">
                        <CardHeader>
                            <CardTitle>Recover from Private Key</CardTitle>
                            <CardDescription>
                                Please enter your private key to recover your wallet. It never leaves your device.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Private key</Label>
                                    <Input onChange={(e) => setLocalPrivateKey(e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button onClick={handleRecoveryFromPrivateKey}>Recover</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="passphrase">
                    <Card className="w-full h-full text-left">
                        <CardHeader>
                            <CardTitle>Recover from Pass Phrase</CardTitle>
                            <CardDescription>
                                Enter your 12 or 24 word passphrase to recover your wallet. It never leaves your device.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Passphrase</Label>
                                    <Input onChange={(e) => setLocalPassphrase(e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button onClick={handleRecoveryFromPassphrase}>Recover</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default WalletLogin