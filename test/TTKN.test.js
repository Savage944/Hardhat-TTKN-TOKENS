const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TTKN Token", function () {
  let ttkn;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    
    const TTKN = await ethers.getContractFactory("TTKN");
    ttkn = await TTKN.deploy();
    await ttkn.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await ttkn.owner()).to.equal(owner.address);
    });

    it("Should have correct name and symbol", async function () {
      expect(await ttkn.name()).to.equal("TTKN Token");
      expect(await ttkn.symbol()).to.equal("TTKN");
    });

    it("Should mint initial supply to owner", async function () {
      const ownerBalance = await ttkn.balanceOf(owner.address);
      expect(ownerBalance).to.equal(ethers.parseEther("1000"));
    });
  });

  describe("Minting", function () {
    it("Should mint tokens for a person", async function () {
      await ttkn.mintForPerson(addr1.address);
      
      const balance = await ttkn.balanceOf(addr1.address);
      expect(balance).to.equal(ethers.parseEther("1"));
      
      const minted = await ttkn.getMintedTokens(addr1.address);
      expect(minted).to.equal(ethers.parseEther("1"));
    });

    it("Should track total people", async function () {
      await ttkn.mintForPerson(addr1.address);
      expect(await ttkn.totalPeople()).to.equal(1);
      
      await ttkn.mintForPerson(addr2.address);
      expect(await ttkn.totalPeople()).to.equal(2);
    });

    it("Should allow up to 5 tokens per address", async function () {
      // Mint 5 tokens
      for (let i = 0; i < 5; i++) {
        await ttkn.mintForPerson(addr1.address);
      }
      
      const balance = await ttkn.balanceOf(addr1.address);
      expect(balance).to.equal(ethers.parseEther("5"));
      
      // Should not allow 6th token
      await expect(ttkn.mintForPerson(addr1.address))
        .to.be.revertedWith("Address has reached maximum mint limit");
    });

    it("Should calculate remaining mintable tokens correctly", async function () {
      await ttkn.mintForPerson(addr1.address);
      
      const remaining = await ttkn.getRemainingMintableTokens(addr1.address);
      expect(remaining).to.equal(ethers.parseEther("4"));
    });

    it("Should check if address can mint", async function () {
      expect(await ttkn.canMint(addr1.address)).to.be.true;
      
      // Mint 5 tokens
      for (let i = 0; i < 5; i++) {
        await ttkn.mintForPerson(addr1.address);
      }
      
      expect(await ttkn.canMint(addr1.address)).to.be.false;
    });
  });

  describe("Events", function () {
    it("Should emit TokensMinted event", async function () {
      await expect(ttkn.mintForPerson(addr1.address))
        .to.emit(ttkn, "TokensMinted")
        .withArgs(addr1.address, ethers.parseEther("1"), ethers.parseEther("1"));
    });

    it("Should emit PersonAdded event for new person", async function () {
      await expect(ttkn.mintForPerson(addr1.address))
        .to.emit(ttkn, "PersonAdded")
        .withArgs(addr1.address, 1);
    });
  });

  describe("Owner functions", function () {
    it("Should allow owner to mint tokens", async function () {
      await ttkn.ownerMint(addr1.address, ethers.parseEther("10"));
      
      const balance = await ttkn.balanceOf(addr1.address);
      expect(balance).to.equal(ethers.parseEther("10"));
    });

    it("Should not allow non-owner to use owner mint", async function () {
      await expect(ttkn.connect(addr1).ownerMint(addr2.address, ethers.parseEther("10")))
        .to.be.revertedWithCustomError(ttkn, "OwnableUnauthorizedAccount");
    });
  });
});