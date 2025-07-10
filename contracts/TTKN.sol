// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TTKN is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant MAX_MINT_PER_ADDRESS = 5 * 10**18; // 5 tokens with 18 decimals
    uint256 public constant MINT_AMOUNT = 1 * 10**18; // 1 token per mint
    

    mapping(address => uint256) public mintedTokens;
    

    uint256 public totalPeople;
    

    event TokensMinted(address indexed to, uint256 amount, uint256 totalMinted);
    event PersonAdded(address indexed person, uint256 personCount);
    
    constructor() ERC20("TTKN Token", "TTKN") Ownable(msg.sender) {

        _mint(msg.sender, 1000 * 10**18);
    }

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

    function getRemainingMintableTokens(address account) external view returns (uint256) {
        return MAX_MINT_PER_ADDRESS - mintedTokens[account];
    }

    function canMint(address account) external view returns (bool) {
        return mintedTokens[account] < MAX_MINT_PER_ADDRESS;
    }

    function getMintedTokens(address account) external view returns (uint256) {
        return mintedTokens[account];
    }

    function ownerMint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
