import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

const getConnection = () => {
    return connection;
};

const getBalance = async (address: string) => {
    try {
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);
        return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw new Error("Failed to fetch balance");
    }
};

const getAirdrop = async (address: string) => {
    try {
        const publicKey = new PublicKey(address);
        const airdropSignature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
            blockhash: latestBlockhash.blockhash,
            signature: airdropSignature
        });
        return "Airdrop successful";
    } catch (error) {
        console.error("Error requesting airdrop:", error);
        return "Failed to request airdrop";
    }
};

const sendSol = async (fromAddress: string, toAddress: string, amount: number, privateKey: string) => {
    try {
        const fromPublicKey = new PublicKey(fromAddress);
        const toPublicKey = new PublicKey(toAddress);
        const fromSecretKey = Uint8Array.from(JSON.parse(privateKey)); // Assuming privateKey is a JSON string of the secret key
        const fromKeypair = Keypair.fromSecretKey(fromSecretKey);
        // Create a transaction
        const balance = await getBalance(fromAddress);

        if(balance>=amount){
            const instruction = SystemProgram.transfer({
                fromPubkey : fromPublicKey,
                toPubkey : toPublicKey,
                lamports : amount
            });

            const transaction = new Transaction().add(instruction);

            const res = await sendAndConfirmTransaction(
                connection,
                transaction,
                [fromKeypair],
                { commitment: "confirmed" }
            );

            if(res) {
                return "transaction successful";
            }
        }
    } catch (error) {
        console.error("Error sending SOL:", error);
        return "Failed to send SOL";
    }
};
export { getBalance, sendSol, getAirdrop, getConnection };