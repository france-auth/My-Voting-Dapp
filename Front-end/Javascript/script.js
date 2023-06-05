import { ethers } from "ethers"; 
import decentraVoteABI from "../Javascript/decentraVoteABI"


    const voters_form = document.querySelector('#v-form');
    const wallet_btn = document.querySelector('connectWalletBtn');
    const notify = document.querySelector('.content');
    const notify_background = document.querySelector('.notify');

    let loader = document.getElementById('loader');
    const result = document.querySelector('.check-result');
    const contractAddress = '0xD16a279E2F1aA4C1B0D57fe9Ffab8269e36Ef951';
    const connected = false;
    
    
    wallet_btn.addEventListener('click', async () => {
        let {truncatedAddr} = await connect_metamask()
        if (!truncatedAddr) return;
        wallet_btn.textContent = truncatedAddr;
    })
    
    voters_form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await vote(voters_form.resources.value)
    })

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