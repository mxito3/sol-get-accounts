import { Connection, GetProgramAccountsFilter,PublicKey } from "@solana/web3.js";

const rpcEndpoint = 'https://capable-necessary-liquid.solana-mainnet.discover.quiknode.pro/ccb3d9879908145ed52034fcecbeb3a3f18a08cb/';
const solanaConnection = new Connection(rpcEndpoint);

const walletToQuery = 'vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg'; //example: 

async function getTokenAccounts(wallet: string, solanaConnection: Connection) {
    const filters:GetProgramAccountsFilter[] = [
        {
          dataSize: 165,    //size of account (bytes)
        },
        {
          memcmp: {
            offset: 32,     //location of our query in the account (bytes)
            bytes: wallet,  //our search criteria, a base58 encoded string
          },            
        }];
    const accounts = await solanaConnection.getParsedProgramAccounts(
        new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        {filters: filters}
    );
    console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
    accounts.forEach((account, i) => {
        //Parse the account data
        const parsedAccountInfo:any = account.account.data;
        const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
        const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
        //Log results
        console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
        console.log(`--Token Mint: ${mintAddress}`);
        console.log(`--Token Balance: ${tokenBalance}`);
    });
}
getTokenAccounts(walletToQuery,solanaConnection);

