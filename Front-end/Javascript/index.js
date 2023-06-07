/////////////// YOU CAN IMPORT YOUR ABI FROM A SEPARATE FILE ///////////////
////////////// OR DECLARE AND INITIALIZE IT IN THIS FILE ///////////////

// import decentraVoteABI from "./decentraVoteABI"; // IMPORT
// OR
/* const decentraVoteABI = [ // DECLARE
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "giveRightToVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "proposalNames",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "authenticator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "vote",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "anyVotes",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningName",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "winningName_",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winningProposal_",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; 
 */ 


import { SnackbarProvider } from 'notistack';
import { useSnackbar } from 'notistack';
const ethers = require('ethers');
const connected = false;

// Assuming Metamask is already installed and the user is connected to the Polygon Mumbai Testnet
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Declare & Initialize: // 1. Contract Address     // 2. ABI
const contractAddress = '0xD16a279E2F1aA4C1B0D57fe9Ffab8269e36Ef951';
const decentraVoteABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "voter",
				"type": "address"
			}
		],
		"name": "giveRightToVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "proposalNames",
				"type": "bytes32[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "authenticator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "voteCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voters",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "vote",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "anyVotes",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningName",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "winningName_",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winningProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "winningProposal_",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

/////// Creating Contract Instance using the Contract Address, ABI, and signer ////////
// ** This will allow you to interact with the functions defined in your contract
const contract = new ethers.ethers.Contract(contractAddress, decentraVoteABI, provider.getSigner());



//////////////////// CONNECT WALLET ////////////////////
const connectButton = document.getElementById('connectWalletBtn');
connectButton.addEventListener('click', async () => {
	try {
		await window.ethereum.request({ method: 'eth_requestAccounts'});
		const signer = await provider.getSigner();
		const chainID = await signer.getChainId();
		if( chainID !=="0x13881"){
			try{
				await provider.send("wallet_switchEthereumChain", [{ chainId: `0x13881` }, ]);
			} catch (error) {
				console.error("Error requesting account switch:", error)
				return;
			}
		}
		console.log('Connected to wallet:', signer.getAddress());
		const address = await signer.getAddress();
		const truncatedAddr = address.slice(0, 4) + "..." + address.slice(-3)
		return {truncatedAddr, signer, address}
	} catch (error) {
		console.error('Error connecting to wallet: ', error);
	}
});



/////////////// INTERACTING WITH SMART CONTRACT FUNCTIONS ///////////////

const voteButtons = document.getElementsByClassName('btn');

// Attach click event listener to each button
for (let i = 0; i < voteButtons.length; i++) {
	voteButtons[i].addEventListener('click', async (event) => {
		try {
			const {signer, address} = await contract()
            
            const contract = new ethers.ethers.Contract(contractAddress, decentraVoteABI, provider.getSigner());
            const voterInfo = await contract.voters(address)
            
            const hasVoted = voterInfo.anyvotes;
            console.log(hasVoted)
            
            if (hasVoted) {
                console.log("Already voted");
            }
            else {
                console.log("Voting...");
            }

			// Call the vote function on the smart contract
            const transaction = await contract.vote(proposal);
            const receipt = transaction.wait(1);
            
			// Handle the receipt or handle the UI
            console.log("Vote submitted successfully!", receipt);
            console.log(notify.textContent)
            updateNotifyUI("Vote Successful", "success")

			// This extracts the Proposal value
			const proposalIndex = parseInt(event.target.value);

			console.log('Transaction Receipt:', receipt);
		} catch (error) {
			// Handle the error show an error message
			console.error('Error:', error);
		}
	});
	
}


const winning = async () => {
        
        
	// try {
		const {signer} = await connect_metamask();
		
		const decentraVote = new ethers.Contract(contractAddress, decentraVoteABI, signer);
		
		let name = await decentraVote.winningName();
		let winner =  ethers.utils.parseBytes32String(name);
		return winner;
		
		// } catch (error){ 
			//     console.log(error.data.message)
			// }
		}

		const updateNotifyUI = (message, status) => {
			if(!message) return;
			notify_background.classList.add(status);
			notify.textContent = message;
		}