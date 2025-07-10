import React, { useState } from 'react';
import { Coins, Github, ExternalLink, AlertCircle } from 'lucide-react';
import { WalletConnect } from './components/WalletConnect';
import { TokenCard } from './components/TokenCard';
import { MintForm } from './components/MintForm';
import { useContract } from './hooks/useContract';
import { useTokenData } from './hooks/useTokenData';

function App() {
  const [error, setError] = useState('');
  const { contract, account, isConnected, connectWallet, disconnectWallet } = useContract();
  const { tokenData, loading, refetchData } = useTokenData();

  const handleConnect = async () => {
    try {
      setError('');
      await connectWallet();
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    }
  };

  const handleMintSuccess = () => {
    refetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Coins className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TTKN Token</h1>
                <p className="text-sm text-gray-600">Mint tokens for adding people</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <WalletConnect
                isConnected={isConnected}
                account={account}
                onConnect={handleConnect}
                onDisconnect={disconnectWallet}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to TTKN Token Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mint up to 5 TTKN tokens by adding people to our network. Each person can receive tokens 
            to participate in our decentralized ecosystem.
          </p>
        </div>

        {!isConnected ? (
          /* Connection Prompt */
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 bg-blue-50 rounded-lg mb-4">
                  <Coins className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Connect Your Wallet
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect your MetaMask wallet to start minting TTKN tokens and interacting with the smart contract.
                </p>
                <WalletConnect
                  isConnected={isConnected}
                  account={account}
                  onConnect={handleConnect}
                  onDisconnect={disconnectWallet}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Connected Dashboard */
          <div className="space-y-8">
            {/* Token Statistics */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Token Statistics</h3>
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Loading token data...</p>
                </div>
              ) : (
                <TokenCard
                  balance={tokenData.balance}
                  mintedTokens={tokenData.mintedTokens}
                  remainingTokens={tokenData.remainingTokens}
                  canMint={tokenData.canMint}
                  totalPeople={tokenData.totalPeople}
                />
              )}
            </div>

            {/* Mint Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Mint Tokens</h3>
              <MintForm
                contract={contract}
                account={account}
                canMint={tokenData.canMint}
                onMintSuccess={handleMintSuccess}
              />
            </div>

            {/* Network Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-blue-900">Network Information</h4>
              </div>
              <p className="text-sm text-blue-800">
                This contract is deployed on the Sepolia test network. Make sure your wallet is connected to Sepolia.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Built with Hardhat, React, and Tailwind CSS. Deployed on Sepolia testnet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;