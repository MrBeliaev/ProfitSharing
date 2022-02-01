//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ProfitSharing {
    address public owner;
    address payable private partner;
    mapping(uint256 => address) public PartnersByID;
    mapping(address => uint256) public Partners;
    uint256 public partnerID;

    constructor() {
        owner = msg.sender;
    }
    
    event Deposit(address indexed _from, uint _value);
    event Send(address _address, uint _value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function deposit() public payable returns (bool) {
        uint value = msg.value * 1000000;
        emit Deposit(msg.sender, value);
        for (uint256 index = 0; index < partnerID; index++) {
            if (Partners[PartnersByID[index]] > 0) {
                partner = payable(PartnersByID[index]);
                partner.transfer((value * Partners[partner]) / 100000000);
                emit Send(partner, (value * Partners[partner]) / 100000000);
            }
        }
        return true;
    }

    function setPartners(address _address, uint256 _share) public onlyOwner {
        require((allPersents() + _share) <= 100, "Only 100%");
        require(getPartner(_address), "This address has already been added");
        PartnersByID[partnerID] = _address;
        Partners[_address] = _share;
        partnerID++;
    }

    function getPartner(address _address) public view returns (bool) {
        for (uint256 index = 0; index < partnerID; index++) {
            if (PartnersByID[index] == _address) {
                return false;
            }
        }
        return true;
    }

    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function allPersents() public view returns (uint256) {
        uint256 persents;
        for (uint256 index = 0; index < partnerID; index++) {
            persents += Partners[PartnersByID[index]];
        }
        return persents;
    }

    function withdrawTo(address payable _address) public onlyOwner {
        _address.transfer(address(this).balance);
    }

    function withdraw() public onlyOwner {
        for (uint256 index = 0; index < partnerID; index++) {
            if (Partners[PartnersByID[index]] > 0) {
                partner = payable(PartnersByID[index]);
                partner.transfer(
                    ((address(this).balance * 1000000)* Partners[partner]) / 100000000
                );
                emit Send(((address(this).balance * 1000000)* Partners[partner]) / 100000000);
            }
        }
    }
}
