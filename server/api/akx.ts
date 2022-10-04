import {ethers} from "ethers";
import {LABZABI, SALEABI} from "../../abis/PrivateSale";
import {ABI} from '../../abis/IdentityRegistry'
const GOERLI_ADDRESS = "0x399AE34B8B0AE6e1Abc25d73EFC71cD6B781F8a6";
const LABZ_ADDRESS = '0xEeF80FC4Cb371F9e00E71EC80ea7D49e004Edb9F';
const SALE_ADDRESS = '0xed904D447d2795cA4b264B1A55cde16634C563D7';

export default defineEventHandler(async (event) => {
    const appConfig = useRuntimeConfig();
    const provider = new ethers.providers.JsonRpcProvider(appConfig.SERVER_PROVIDER_MUMBAI_URL);
    const wallet = new ethers.Wallet(appConfig.PRIVATE_KEY);
    const w =  wallet.connect(provider);
    const bal = await w.getBalance();
    const contractl = new ethers.Contract(LABZ_ADDRESS, LABZABI, w);
    contractl.attach(LABZ_ADDRESS);

    return {
        api: 'welcome!',
        mumbaiUri: appConfig.SERVER_PROVIDER_MUMBAI_URL,
        walletAddress: w.address,
        walletBalance: ethers.utils.formatUnits(bal.toHexString()),
        circulating: ethers.utils.formatEther(await contractl.totalSupply())
    }
})