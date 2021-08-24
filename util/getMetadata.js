/**
 * This function will get the metadata if the token Id exist, else return 404
 * This is a strategy to avoid posting all metadata to IPFS and exposing the
 * rarity strategies before launch
 */

// import {INFURA_ADDRESS, ADDRESS, ABI} from "../../config.js"
// need to import the INFURA provider details, and the contract address
// and ABI (after deployed)
 import Web3 from "web3";

 const infuraAddress ="<INSERT INFURA ADDRESS HERE>";
 const ABI = "<IMPORT THE ABI>";
 const ADDRESS = "<INSERT ADDRESS HERE>";

 const getBPmetadata = async(req, res) => {
     // instantiate instance of the contract
    const provider = new Web3.providers.HttpProvider(infuraAddress);
    const web3infura = new Web3(provider);
    const contract = new web3infura.eth.Contract(ABI, ADDRESS);

    const totaSupply = await contract.methods.totaSupply().call();

    // This would mean the tokenID provided is already minted
    if(parseInt(req.query.id) < totaSupply) {
        let metadata =  {}

        metadata = {
            "name" : "<insert the token name if any, else #tokenID ",
            "description" : "description of the collection",
            "tokenId" : parseInt(req.query.id),
            "image" : "image hash",
            "external_url": "url to the nft website",

            // can be obtained from a json file containing trait info for 
            // all the generated artwork.git
            "attributes": [
                {
                    "trait_type" : "name of type, such as BG, Headwear...", 
                    "value" : "value for the type"
                },

                {
                    "trait_type" : "name of another trait type",
                    "value" : "value for the type"
                }
            ]
        }
        
        res.statusCode = 200;
        res.json(metadata);
    } else {
        res.statusCode = 404;
        res.json({error: "The token requested doesnot exist"})
    }
 }