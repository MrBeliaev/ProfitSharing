const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('ProfitSharing contract', () =>{
  var ProfitSharing;
  var profitsharing;
  var owner;
  var partner1;
  var partner2;
  var partner3;
  var client;
  var share1;
  var share2;
  var share1;
  it("deploy", async function () {
    ProfitSharing = await ethers.getContractFactory("ProfitSharing");
    profitsharing = await ProfitSharing.deploy();
    await profitsharing.deployed();
    [...addrs] = await ethers.getSigners();
    owner = addrs[0];
    partner1 = addrs[1];
    partner2 = addrs[2];
    partner3 = addrs[3];
    client - addrs[4];
  })
  it("setPartners", async function () {
    await profitsharing.setPartners(partner1.address, 40);
    await profitsharing.setPartners(partner2.address, 30);
    await profitsharing.setPartners(partner3.address, 25);
    share1 = await profitsharing.Partners(partner1.address);
    share2 = await profitsharing.Partners(partner2.address);
    share3 = await profitsharing.Partners(partner3.address);
    console.log("partner1:", share1.toString(), "%");
    console.log("partner2:", share2.toString(), "%");
    console.log("partner3:", share3.toString(), "%");   
  });
  it("totalPercents", async function () {
    persents = await profitsharing.connect(partner2).allPersents();
    console.log("allPersents:", persents.toString());
  });
  it("partnerID", async function () {
    partnerID = await profitsharing.connect(partner3).partnerID();    
    console.log("totalPartners:", partnerID.toString());
  });
  it("deposit", async function () {
    eth = ethers.utils.parseEther('1.0')
    await profitsharing.deposit({ from: client, value: eth });    
    balance1 = await partner1.getBalance()
    console.log("Partner1 Balance", ethers.utils.formatEther(balance1));
    balance2 = await partner2.getBalance()
    console.log("Partner2 Balance", ethers.utils.formatEther(balance2));
    balance3 = await partner3.getBalance()
    console.log("Partner3 Balance", ethers.utils.formatEther(balance3));
    contractBalance = await profitsharing.connect(owner).getBalance();
    console.log("Contract Balance:", ethers.utils.formatEther(contractBalance));
  });
  it("withdraw", async function () {
    await profitsharing.connect(owner).withdraw();
    balance1 = await partner1.getBalance()
    console.log("Partner1 Balance", ethers.utils.formatEther(balance1));
    balance2 = await partner2.getBalance()
    console.log("Partner2 Balance", ethers.utils.formatEther(balance2));
    balance3 = await partner3.getBalance()
    console.log("Partner3 Balance", ethers.utils.formatEther(balance3));
    contractBalance = await profitsharing.connect(owner).getBalance();
    console.log("Contract Balance:", ethers.utils.formatEther(contractBalance));
  });
  it("withdrawTo", async function () {
    await profitsharing.connect(owner).withdrawTo(partner3.address);
    balance1 = await partner1.getBalance()
    console.log("Partner1 Balance", ethers.utils.formatEther(balance1));
    balance2 = await partner2.getBalance()
    console.log("Partner2 Balance", ethers.utils.formatEther(balance2));
    balance3 = await partner3.getBalance()
    console.log("Partner3 Balance", ethers.utils.formatEther(balance3));
    contractBalance = await profitsharing.connect(owner).getBalance();
    console.log("Contract Balance:", ethers.utils.formatEther(contractBalance));
  })
 


});
