const ethers = require("ethers");

async function parseBytes(args) {
    const name = args[0];
    const bytes = ethers.utils.parseBytes32String(name);
    console.log("name: ", bytes);
}

parseBytes(process.argv.slice(2));
