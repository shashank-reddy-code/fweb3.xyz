import ERC20_ABI from "../contracts/ERC20.json";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

const FWEB3_TOKEN_ADDRESS = "0x4a14ac36667b574b08443a15093e417db909d7a3";

function getProviderOrSigner(needSigner = false) {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      if (needSigner) {
        const signer = provider.getSigner();
        return signer;
      }
      return provider;
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
}

export default function useTokenBalance(address) {
  const { active } = useWeb3React();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (active && typeof address === "string") {
      const provider = getProviderOrSigner();
      const contract = new ethers.Contract(
        FWEB3_TOKEN_ADDRESS,
        ERC20_ABI,
        provider
      );
      contract.balanceOf(address).then((balance) => {
        setBalance(balance);
      });
    }
  }, [address, active]);
  return balance;
}
