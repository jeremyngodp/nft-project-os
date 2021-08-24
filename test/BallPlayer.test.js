const assert = require('assert');
const BallPlayer = artifacts.require('./BallPlayer.sol');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// console.log(AppleBanana);

// const web3 = new Web3(ganache.provider())

// require('chai')
//     .use(require('chai-as-promised'))
//     .should()

// let appleBanana;
// let accounts;
// beforeEach(async() => {
//     accounts = await web3.eth.getAccounts();
//     appleBanana = await new web3.eth.Contract(JSON.parse(AppleBanana._json.abi))
//         .deploy({
//             data: AppleBanana._json.bytecode
//         })
//         .send({from: accounts[0], gas: 1000000});
// } )


contract('BallPlayer', (accounts) => {
    let contract;
    before( async() => {
        contract = await BallPlayer.deployed();
        contract.setSaleState({from: accounts[0], gas: 1000000})
    })
    
    describe('deployment', async() => {
        it('deploys successfully', async() => {
            // console.log(contract.mintAB);
            assert.ok(contract.address);
        })

        it('has a name', async() => {
            const name = await contract.name();
            assert.equal("The Ball Player", name);
        })

        it('max to mint = 30', async() => {
            const maxToMint = await contract.maxToMint(); 
            assert.equal(30, maxToMint);
        })

        it('has a symbol', async() => {
            const symbol = await contract.symbol();
            assert.equal("BP", symbol);
        })

        it('sale is active', async() => {
            const saleState = await contract.saleIsActive();
            assert.equal(true, saleState);
        })

        it('minting', async() => {
            const result = await contract
                .mintBP(1,{from: accounts[0],value: 89000000000000000})
            let totalMinted = await contract.totalSupply();
            let tx = result.logs[0].args;
            assert.equal(1, totalMinted);
            assert.equal(accounts[0],tx.to);
        })
    })
})