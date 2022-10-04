import {ethers} from "ethers";
import axios from "axios";

import {LABZABI, SALEABI} from "../../abis/PrivateSale";
import {ABI} from '../../abis/IdentityRegistry'
const GOERLI_ADDRESS = "0x399AE34B8B0AE6e1Abc25d73EFC71cD6B781F8a6";
const LABZ_ADDRESS = '0xEeF80FC4Cb371F9e00E71EC80ea7D49e004Edb9F';
const SALE_ADDRESS = '0xed904D447d2795cA4b264B1A55cde16634C563D7';
const MATICUSDRequest = `https://api.coincap.io/v2/assets?search=MATIC`

const ETHUSDRequest = `https://api.coincap.io/v2/assets?search=ethereum`


export default defineEventHandler(async (event) => {
  
    const appConfig = useRuntimeConfig();
    const provider = new ethers.providers.JsonRpcProvider(appConfig.SERVER_PROVIDER_MUMBAI_URL);
    const wallet = new ethers.Wallet(appConfig.PRIVATE_KEY);
    const w =  wallet.connect(provider);
    const bal = await w.getBalance();
    const contractl = new ethers.Contract(LABZ_ADDRESS, LABZABI, w);
    contractl.attach(LABZ_ADDRESS);

    const saleContract = new ethers.Contract(SALE_ADDRESS, SALEABI, w);
    saleContract.attach(SALE_ADDRESS);

    const network = await provider.getNetwork();
    const lastBlock = await provider.getBlockNumber();
    

    const prices = {
        matic: await getMaticUsd(),
        eth: await getEthUsd()
    }

    const conversions = {
        maticsForEth: prices.eth / prices.matic,
        ethForMatics: prices.matic / prices.eth,
    }

   

    const baseAKXPrice = 0.1;

  

    const akxDeployed = {
        chainId: network.chainId,
        netName: network.name,
        lastBlock: lastBlock,
        addresses: [{
            contract:"", address: ""
        }]
    }

    const inflPerUnitSold = 0.0000002;

    const stats = {
        maxSupply: 30000000000,
        maxCirculating: 1800000000,
        circulating: parseFloat(ethers.utils.formatEther(await contractl.totalSupply())),
        maxPresaleCirculating: parseFloat(ethers.utils.formatEther(await saleContract.maxTokensForPrivateSale())),
        leftForPresale: parseFloat(ethers.utils.formatEther(await saleContract.maxTokensForPrivateSale())) - parseFloat(ethers.utils.formatEther(await contractl.totalSupply())),
        stage: "presale",
        holders: 0,
        etherscan_uri: "",
        logo_uri: "",
        website: "https://akx3.com",
        dapp: "https://dapp.akx3.com",
        socials: [{
            network: "",
            uri: ""
        }]
    }

    const totalInflP = inflPerUnitSold * stats.circulating;
    const value = stats.circulating * (baseAKXPrice * totalInflP);
   
    const valueOfOne = () => {
        if((value / stats.circulating) > (1/10)) {
            return value / stats.circulating
        } else {
           return 0.1;
        }};
    const currMarketCap = stats.circulating * valueOfOne() > 0 ? stats.circulating * valueOfOne() : 0;

    const akxPricings = {
        baseUSD: valueOfOne(),
        akxForMatics: prices.matic / valueOfOne(),
        AKXForEth: prices.eth / valueOfOne(),
        ethForAKX: valueOfOne() / prices.eth,
        maticsForAKX: valueOfOne() / prices.matic
    }

   

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

      const financials = {
        USDValuePerAKX: valueOfOne() ? valueOfOne() : 0.10,
        currentMarketCap: typeof currMarketCap == undefined ? 0 : formatter.format(currMarketCap) 
    }
    
    return {
        prices: prices,
        conversion: conversions,
        akx: akxPricings,
        networkDeployment: akxDeployed,
        info: stats,
        finance: financials
    }
})

const getMaticUsd = async () => {
    const appConfig = useRuntimeConfig();
    axios.create({headers: {
        Authorization: `Bearer ${appConfig.PRICE_API_KEY}`
    }});

    const res = await axios.get(MATICUSDRequest);

    const data = res.data.data[0]

    return data.priceUsd

}

const getEthUsd = async () => {
    const appConfig = useRuntimeConfig();
    axios.create({headers: {
        Authorization: `Bearer ${appConfig.PRICE_API_KEY}`
    }});

    const res = await axios.get(ETHUSDRequest);

    const data = res.data.data[0]

    return data.priceUsd
    

}