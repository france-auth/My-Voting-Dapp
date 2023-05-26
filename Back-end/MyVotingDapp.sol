//SPDX-License-Identifier: MIT

pragma solidity >= 0.7.0<0.9.0;

/*

Intrinsic function of a Voting Dapp:

    1. It will accept proposals Name and number for tracking.
    
    2. Allow for members to vote and exercise voting ability.
        It'll keep track of the voting process and check if the voters are authenticated to vote.
    
    3. There will be an "authority" that will serve as an authenticator.

*/

contract decentraVote {

    struct Voter {
        uint vote; //This tracks the number of proposals
        bool anyVotes; // True or False value that checks if there's any vote not
        uint value; // Authenticator to approve a wallet to vote
    }

    struct Proposal {
        bytes32 name; // We can use 'strings' too, but 'bytes' saves more gas
        uint voteCount; // Number of votes
    }

    Proposal [] public proposals;


// Mapping helps us connect two data types together. It is the conversion of data types between incompatible 'type systems'
// We're mapping 'address' to 'Voters' so we can look up the ETH addresses of the voters
// When we put the address into the 'public voters', we'll be able to get the count they made and the proposals they voted for
    //and any other thing they did

    mapping(address => Voter) public voters;

    address public authenticator;

    constructor (bytes32 [] memory proposalNames) {

        authenticator = msg.sender; // 'msg.sender' is a global variable that'll make the deployer's wallet an authenticator


// Then we'll a create a loop that sets the authenticator value, that will push proposals, set the vote count.
// So when we want to the proposal from this array, we'll get the by loop (numbers)
    
        voters[authenticator].value = 1;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name:proposalNames[i],
                voteCount: 0
            }));
        }
    
    }

// Function to authenticate votes

    function giveRightToVote(address voter) public {
        require(msg.sender == authenticator, 'Only the authenticator gives access to vote');


// Require that voter hasn't voted yet

    require(!voters[voter].anyVotes, 'The voter has already voted');

    require(voters[voter].value == 0);
    voters[voter].value = 1;
    }


// Function for voting

    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];

// If it is = 0 then it has no right to vote
        require(sender.value !=0, 'Has no right to vote');

        require(!sender.anyVotes, 'Already voted');

        sender.anyVotes = true;
        sender.vote = proposal;

        proposals [proposal].voteCount = proposals[proposal].voteCount + sender.value; 
    }


// Function for showing results

    // 1. Function that shows the winning proposal by integer

        function winningProposal() public
        view returns (uint winningProposal_) {
            
            uint winningVoteCount = 0;

                for (uint i = 0; i < proposals.length; i++) {
                    
                    if (proposals[i].voteCount > winningVoteCount) {

                        winningVoteCount = proposals[i].voteCount;
                        winningProposal_ = i;
                    }
                }
        }

    // 2. Function that shows the winner by name

        function winningName() public view returns (bytes32 winningName_) {
            
            winningName_ = proposals[winningProposal()].name; 
        }
    
}