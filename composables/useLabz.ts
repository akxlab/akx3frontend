import { ethers } from 'ethers'
import useUtils from './useUtils'
import useWallet from './useWallet'

const MUMBAI_ADDRESS = "";
const POLYGON_ADDRESS = "";
const ABI = [];

export default function () {

    const {getProvider, getSigner} = useWallet();
   let conn;
   let signer;
   let bal;
    (async () => {
        conn = await getProvider();
        signer = await getSigner();
    })();
    const contract = new ethers.Contract(`${MUMBAI_ADDRESS}`, ABI, signer);
    contract.attach(`${MUMBAI_ADDRESS}`);

    const getLabzBalance = async (signer) => {
        bal = await contract.balanceOf(signer.address);
        return bal;
    }

    (async () => {
        await getLabzBalance(signer);
    })()

}