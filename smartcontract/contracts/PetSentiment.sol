//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.8;

contract PetSentiment{

    address public owner;
    string[] public petsArray;

    constructor() {
        owner = msg.sender;
    }

    struct pet {
        bool exists;
        uint256 up;
        uint256 down;
        mapping(address => bool) Voters;
    }

    event petupdated (
        uint256 up,
        uint256 down,
        address voter,
        string pet
    );

    mapping(string => pet) private Pets;

    function addPet(string memory _pet) public {
        require(msg.sender == owner, "Only the owner can add a pet");
        pet storage newPet = Pets[_pet];
        newPet.exists = true;
        petsArray.push(_pet);
    }

    function vote(string memory _pet, bool _vote) public {
        require(Pets[_pet].exists, "Can't vote on this pet");
        require(!Pets[_pet].Voters[msg.sender], "You have already voted for this pet");
        

        pet storage t = Pets[_pet];
        t.Voters[msg.sender] = true;

        if(_vote){
            t.up++;
        } else {
            t.down++;
        }

        emit petupdated (t.up,t.down,msg.sender,_pet);
    }

    function getVotes(string memory _pet) public view returns (
        uint256 up,
        uint256 down
    ){
        require(Pets[_pet].exists, "No such pet defined");
        pet storage t = Pets[_pet];
        return(t.up,t.down);
        
    }
}