import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with deployed address
const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function mintForPerson(address) external",
  "function getMintedTokens(address) view returns (uint256)",
  "function getRemainingMintableTokens(address) view returns (uint256)",
  "function canMint(address) view returns (bool)",
  "function totalPeople() view returns (uint256)",
  "event TokensMinted(address indexed to, uint256 amount, uint256 totalMinted)",
  "event PersonAdded(address indexed person, uint256 personCount)"
];

export function useContract() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      setContract(contractInstance);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setSigner(signer);
      setAccount(address);
      setIsConnected(true);
      
      if (contract) {
        setContract(contract.connect(signer));
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setSigner(null);
    setAccount('');
    setIsConnected(false);
    if (contract) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider));
    }
  };

  return {
    contract,
    signer,
    account,
    isConnected,
    connectWallet,
    disconnectWallet
  };
}