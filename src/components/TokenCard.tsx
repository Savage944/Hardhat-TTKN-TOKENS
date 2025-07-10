import React from 'react';
import { Coins, Users, Clock, CheckCircle } from 'lucide-react';

interface TokenCardProps {
  balance: string;
  mintedTokens: string;
  remainingTokens: string;
  canMint: boolean;
  totalPeople: string;
}

export function TokenCard({ 
  balance, 
  mintedTokens, 
  remainingTokens, 
  canMint, 
  totalPeople 
}: TokenCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Coins className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-2xl font-bold text-gray-900">{balance}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">TTKN</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Minted</p>
              <p className="text-2xl font-bold text-gray-900">{mintedTokens}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">/ 5 TTKN</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-2xl font-bold text-gray-900">{remainingTokens}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">TTKN</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total People</p>
              <p className="text-2xl font-bold text-gray-900">{totalPeople}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${canMint ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <p className="text-sm text-gray-600">
              {canMint ? 'Can mint more' : 'Mint limit reached'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}