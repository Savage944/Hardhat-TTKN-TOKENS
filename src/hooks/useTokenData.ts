import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContract } from './useContract';

export function useTokenData() {
  const { contract, account, isConnected } = useContract();
  const [tokenData, setTokenData] = useState({
    balance: '0',
    mintedTokens: '0',
    remainingTokens: '0',
    canMint: false,
    totalPeople: '0'
  });
  const [loading, setLoading] = useState(false);

  const fetchTokenData = async () => {
    if (!contract || !account) return;

    setLoading(true);
    try {
      const [balance, mintedTokens, remainingTokens, canMint, totalPeople] = await Promise.all([
        contract.balanceOf(account),
        contract.getMintedTokens(account),
        contract.getRemainingMintableTokens(account),
        contract.canMint(account),
        contract.totalPeople()
      ]);

      setTokenData({
        balance: ethers.formatEther(balance),
        mintedTokens: ethers.formatEther(mintedTokens),
        remainingTokens: ethers.formatEther(remainingTokens),
        canMint,
        totalPeople: totalPeople.toString()
      });
    } catch (error) {
      console.error('Error fetching token data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && contract && account) {
      fetchTokenData();
    }
  }, [contract, account, isConnected]);

  return {
    tokenData,
    loading,
    refetchData: fetchTokenData
  };
}