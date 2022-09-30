import { ethers } from 'ethers'
import useUtils from './useUtils'
import useWallet from './useWallet'
import {ABI} from '../abis/IdentityRegistry'

const MUMBAI_ADDRESS = "";
const POLYGON_ADDRESS = "";
const GOERLI_ADDRESS = "0x816bdcec15fca5d8e309f985a65e62a74fbe184b";


export default function () {

    const {getProvider, getSigner} = useWallet();
   let conn;
   let signer;
   let bal;
    (async () => {
        conn = await getProvider();
        signer = await getSigner();
    })();
    const contract = new ethers.Contract(`${GOERLI_ADDRESS}`, ABI, signer);
    contract.attach(`${GOERLI_ADDRESS}`);

    const getLabzBalance = async (signer) => {
        bal = await contract.balanceOf(signer.address);
        return bal;
    }

    (async () => {
        await getLabzBalance(signer);
    })()

}