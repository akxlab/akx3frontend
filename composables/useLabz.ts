import { ethers } from 'ethers'
import useUtils from './useUtils'
import useWallet from './useWallet'
import {LABZABI, SALEABI} from "../abis/PrivateSale";

const MUMBAI_ADDRESS = "";
const POLYGON_ADDRESS = "";
const LABZ_ADDRESS = '0xEeF80FC4Cb371F9e00E71EC80ea7D49e004Edb9F';


export default function () {

    const {getProvider, getSigner} = useWallet();
   let conn;
   let signer;
   const labzbal = useState('labzBalance', () => null);
    (async () => {
        conn = await getProvider();
        signer = await getSigner();
    })();
 


}