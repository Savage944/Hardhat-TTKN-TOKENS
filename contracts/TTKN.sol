// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TTKN Token
 * @dev ERC20 token with minting functionality limited to 5 tokens per address
 */
contract TTKN is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant MAX_MINT_PER_ADDRESS = 5 * 10**18; // 5 tokens with 18 decimals
    uint256 public constant MINT_AMOUNT = 1 * 10**18; // 1 token per mint
    
    // Track how many tokens each address has minted
    mapping(address => uint256) public mintedTokens;
    
    // Track total people who have minted
    uint256 public totalPeople;
    
    // Events
    event TokensMinted(address indexed to, uint256 amount, uint256 totalMinted);
    event PersonAdded(address indexed person, uint256 personCount);
    
    constructor() ERC20("TTKN Token", "TTKN") Ownable(msg.sender) {
        // Mint initial supply to owner for testing
        _mint(msg.sender, 1000 * 10**18);
    }
    
    /**
     * @dev Mint tokens for adding a person
     * @param to Address to mint tokens to
     */
    function mintForPerson(address to) external nonReentrant {
        require(to != address(0), "Cannot mint to zero address");
        require(mintedTokens[to] < MAX_MINT_PER_ADDRESS, "Address has reached maximum mint limit");
        
        bool isNewPerson = mintedTokens[to] == 0;
        
        mintedTokens[to] += MINT_AMOUNT;
        _mint(to, MINT_AMOUNT);
        
        if (isNewPerson) {
            totalPeople++;
            emit PersonAdded(to, totalPeople);
        }
        
        emit TokensMinted(to, MINT_AMOUNT, mintedTokens[to]);
    }
    
    /**
     * @dev Get remaining mintable tokens for an address
     * @param account Address to check
     * @return Remaining tokens that can be minted
     */
    function getRemainingMintableTokens(address account) external view returns (uint256) {
        return MAX_MINT_PER_ADDRESS - mintedTokens[account];
    }
    
    /**
     * @dev Check if an address can mint more tokens
     * @param account Address to check
     * @return Boolean indicating if the address can mint
     */
    function canMint(address account) external view returns (bool) {
        return mintedTokens[account] < MAX_MINT_PER_ADDRESS;
    }
    
    /**
     * @dev Get number of tokens minted by an address
     * @param account Address to check
     * @return Number of tokens minted
     */
    function getMintedTokens(address account) external view returns (uint256) {
        return mintedTokens[account];
    }
    
    /**
     * @dev Owner can mint tokens for emergency purposes
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function ownerMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}