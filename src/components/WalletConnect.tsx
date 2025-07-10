import React from 'react';
import { Wallet, LogOut } from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  account: string;
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
  loading?: boolean;
}

export function WalletConnect({ 
  isConnected, 
  account, 
  onConnect, 
  onDisconnect, 
  loading = false 
}: WalletConnectProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
          <Wallet className="h-4 w-4 text-green-600" />
          <span className="text-green-800 font-medium">
            {formatAddress(account)}
          </span>
        </div>
        <button
          onClick={onDisconnect}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onConnect}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium"
    >
      <Wallet className="h-5 w-5" />
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}