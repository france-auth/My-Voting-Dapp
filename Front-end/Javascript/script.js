const voteButtons = document.querySelector('btn');
const wallet_btn = document.querySelector('connectWalletBtn');
const notify = document.querySelector('.content');
const notify_background = document.querySelector('.notify');
const result = document.querySelector('.check-result');
const ethers = require('ethers');
const contractAddress = '0xD16a279E2F1aA4C1B0D57fe9Ffab8269e36Ef951';
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
const connected = false;
const decentraVote = new ethers.Contract(contractAddress, decentraVoteABI, signer);
    
    wallet_btn.addEventListener('click', async () => {
        let {truncatedAddr} = await connect_metamask()
        if (!truncatedAddr) return;
        wallet_btn.textContent = truncatedAddr;
    })
    
    /*voters_form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await vote(voters_form.resources.value)
    }) */

    for (let i = 0; i < voteButtons.length; i++) {
        voteButtons[i].addEventListener('click', async (event) => {
            try {
                // Call the vote function on the smart contract
                const transaction = await decentraVote.vote(proposal);
                const receipt = transaction.wait(1);
                
                // Handle the receipt or handle the UI
                // This extracts the Proposal value
                // const proposalIndex = parseInt(event.target.value);
                console.log('Transaction Receipt:', receipt);
            } catch (error) {
                // Handle the error show an error message
                console.error('Error:', error);
            }
        });
        
    }

    result.addEventListener ('click', async () => {
        const name = await winning()
        notify_background.classList.add('success');
        notify.textContent = `Winning proposal is: ${name}`
    })
    
    const connect_metamask = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
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
            
            
            const address = await signer.getAddress();
            const truncatedAddr = address.slice(0, 4) + "..." + address.slice(-3)
            return {truncatedAddr, signer, address}
        
        } catch (error) {
            console.log("Error connecting to metamask: ", error);
        }
    }

    const vote = async (proposal) => {
        try {
            const {signer, address} = await connect_metamask()
            let receipt;
            
            const decentraVote = new ethers.Contract(contractAddress, decentraVoteABI, signer);
            const voterInfo = await decentraVote.voters(address)
            
            const hasVoted = voterInfo.anyvotes;
            console.log(hasVoted)
            
            if (hasVoted) {
                console.log("Already voted");
            }
            else {
                console.log("Voting...");
            }

            const transaction = await decentraVote.vote(proposal);
            receipt = transaction.wait(1);
            
            console.log("Vote submitted successfully!");
            console.log(notify.textContent)
            updateNotifyUI("Vote Successful", "success")
        } catch (error) {
            updateNotifyUI(error.data.message, "failed")
            console.log("Failed, reason: ", error.data.message);
        }
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