import React, { useState } from 'react';
import { Plus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { ethers } from 'ethers';

interface MintFormProps {
  contract: ethers.Contract | null;
  account: string;
  canMint: boolean;
  onMintSuccess: () => void;
}

export function MintForm({ contract, account, canMint, onMintSuccess }: MintFormProps) {
  const [mintAddress, setMintAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !mintAddress) return;

    setLoading(true);
    setError('');
    setSuccess(false);
    setTxHash('');

    try {
      // Validate address
      if (!ethers.isAddress(mintAddress)) {
        throw new Error('Invalid Ethereum address');
      }

      const tx = await contract.mintForPerson(mintAddress);
      setTxHash(tx.hash);
      
      await tx.wait();
      setSuccess(true);
      setMintAddress('');
      onMintSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to mint tokens');
    } finally {
      setLoading(false);
    }
  };

  const fillMyAddress = () => {
    setMintAddress(account);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Plus className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mint TTKN Tokens</h3>
          <p className="text-sm text-gray-600">Add a person and mint 1 TTKN token</p>
        </div>
      </div>

      <form onSubmit={handleMint} className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Person's Ethereum Address
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="address"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              placeholder="0x..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={loading}
            />
            <button
              type="button"
              onClick={fillMyAddress}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
              disabled={loading}
            >
              Use My Address
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
            <div className="text-sm text-green-800">
              <p className="font-medium">Tokens minted successfully!</p>
              {txHash && (
                <a
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 underline"
                >
                  View transaction
                </a>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !canMint || !mintAddress}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Minting...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Mint 1 TTKN
            </>
          )}
        </button>

        {!canMint && (
          <p className="text-sm text-gray-500 text-center">
            You have reached the maximum mint limit of 5 TTKN tokens.
          </p>
        )}
      </form>
    </div>
  );
}