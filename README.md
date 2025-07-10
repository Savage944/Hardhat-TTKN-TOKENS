# TTKN Token DApp

A decentralized application for minting TTKN tokens with a limit of 5 tokens per address. Built with Hardhat, React, and Tailwind CSS.

## Features

- **ERC20 Token**: Custom TTKN token with minting functionality
- **Minting Limit**: Users can mint up to 5 tokens per address
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Wallet Integration**: MetaMask wallet connection
- **Real-time Data**: Live token balance and statistics
- **Sepolia Deployment**: Ready for Sepolia testnet deployment

## Smart Contract

The TTKN contract includes:
- Standard ERC20 functionality
- Minting limit of 5 tokens per address
- Person tracking system
- Owner administrative functions
- Comprehensive event logging

## Getting Started

### Prerequisites

- Node.js (v18+)
- MetaMask browser extension
- Sepolia testnet ETH

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Fill in your values:
   - `SEPOLIA_URL`: Infura or Alchemy RPC URL
   - `PRIVATE_KEY`: Your wallet private key
   - `ETHERSCAN_API_KEY`: For contract verification

### Local Development

1. Start a local Hardhat node:
   ```bash
   npm run hardhat:node
   ```

2. Deploy the contract locally:
   ```bash
   npm run hardhat:deploy
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

### Testing

Run the test suite:
```bash
npm run hardhat:test
```

### Deployment

Deploy to Sepolia testnet:
```bash
npm run hardhat:deploy-sepolia
```

Update the contract address in `src/hooks/useContract.ts` after deployment.

## Contract Functions

### Public Functions

- `mintForPerson(address to)`: Mint 1 TTKN token to an address
- `getRemainingMintableTokens(address account)`: Get remaining tokens for an address
- `canMint(address account)`: Check if an address can mint more tokens
- `getMintedTokens(address account)`: Get tokens already minted by an address

### View Functions

- `totalPeople()`: Get total number of people who have minted tokens
- Standard ERC20 functions (balanceOf, totalSupply, etc.)

## Frontend Features

- **Wallet Connection**: Connect/disconnect MetaMask
- **Token Statistics**: View balance, minted tokens, and remaining allowance
- **Mint Interface**: User-friendly form for minting tokens
- **Transaction Tracking**: Real-time transaction status
- **Responsive Design**: Works on desktop and mobile

## Security Features

- **ReentrancyGuard**: Protection against reentrancy attacks
- **Access Control**: Owner-only functions for administrative tasks
- **Input Validation**: Comprehensive validation of all inputs
- **Event Logging**: Complete audit trail of all actions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License