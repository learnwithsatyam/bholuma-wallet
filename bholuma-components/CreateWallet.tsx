import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/index'
import { setPrivateKey, setAddress } from '@/store/walletSlice'
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter, CardAction } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createWallet } from '@/lib/solanaChain';
import { Copy } from 'lucide-react';
import MnemonicDisplay from './MneumonicDisplay';

function CreateWallet({ alreadyHaveWallet, setAlreadyHaveWallet }: { alreadyHaveWallet: boolean, setAlreadyHaveWallet: (value: boolean) => void }) {
    const dispatch = useDispatch();
    const [mnumonicPhrase, setMnumonicPhrase] = useState<string | undefined>();

    const handleCreateWallet = () => {
        var keyPair = createWallet();
        dispatch(setPrivateKey(keyPair.privateKey));
        dispatch(setAddress(keyPair.address));
        setMnumonicPhrase(keyPair.mnemonicPhrase) // Update the mnemonic phrase state
    }
    return (
        <Card>
            <CardHeader className="text-left">
                <CardTitle>Welcome!!</CardTitle>
                <CardDescription>Create wallet or login to existing wallet...</CardDescription>
                {mnumonicPhrase && <CardAction onClick={() => navigator.clipboard.writeText(mnumonicPhrase)}><Copy /></CardAction>}
            </CardHeader>
            <CardContent>
                {mnumonicPhrase ?
                    <div className="text-sm">
                        <p>Your mnemonic phrase is:</p>
                        <MnemonicDisplay phrase={mnumonicPhrase} />
                        <p>Please keep it safe and secure.</p>
                        <Button variant="outline" className="w-full rounded-lg mt-4" onClick={() => { 
                            navigator.clipboard.writeText(mnumonicPhrase || '');
                            alert('Mnemonic phrase copied to clipboard!');
                            setAlreadyHaveWallet(true) 
                            }}>
                            Copy phrase and Continue to Wallet
                        </Button>
                    </div>
                    :
                    <Button variant="secondary" className="w-full rounded-lg" onClick={ handleCreateWallet }>
                        Create New Wallet
                    </Button>
                }
            </CardContent>
            <CardFooter className='flex flex-col items-center'>
                <p className='text-sm text-center'>Already have a wallet?
                <Button variant="link" className="w-full rounded-lg" onClick={() => { setAlreadyHaveWallet(true) }}>
                    Sign in
                </Button>
                 </p>
            </CardFooter>
        </Card>
    )
}

export default CreateWallet