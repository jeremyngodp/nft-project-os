const BallPlayer = artifacts.require("BallPlayer");
const fs = require('fs');

/**
 * Metadata template for OpenSea
 * name: name of the NFT 
 * description: description
 * image: URL to the image of the NFT
 * attributes: set of values such as mouth,hair,body,etc
 * Example of attribute: 
 *     {
 *          "trait_type": "Body", 
 *          "value": "Diamond"
 *     }
 * 
 */
const metadataTemple = {
    "name": "",
    "description": "",
    "image": "",
    "attributes": [
        {
            "trait_type": "Strength",
            "value": 0
        },
        {
            "trait_type": "Dexterity",
            "value": 0
        }
    ]
};

module.exports = async callback => {
    const contract = await BallPlayer.deployed()
    //This is for multple tokens
    //length = await contract.getNumberOfCharacters()
    //index = 0
    //while (index < length) {
    // console.log('Let\'s get the overview of your character ' + index + ' of ' + length)
    let tokenMetadata = metadataTemple
    
    //
    let characterOverview = await contract.characters(index)
    index++
    tokenMetadata['name'] = characterOverview['name']
    if (fs.existsSync('metadata/' + tokenMetadata['name'].toLowerCase().replace(/\s/g, '-') + '.json')) {
        console.log('test')
        continue
    }
    console.log(tokenMetadata['name'])
    tokenMetadata['attributes'][0]['value'] = characterOverview['strength']['words'][0]
    tokenMetadata['attributes'][1]['value'] = characterOverview['dexterity']['words'][0]
    tokenMetadata['attributes'][2]['value'] = characterOverview['constitution']['words'][0]
    tokenMetadata['attributes'][3]['value'] = characterOverview['intelligence']['words'][0]
    tokenMetadata['attributes'][4]['value'] = characterOverview['wisdom']['words'][0]
    tokenMetadata['attributes'][5]['value'] = characterOverview['charisma']['words'][0]
    filename = 'metadata/' + characterMetadata['name'].toLowerCase().replace(/\s/g, '-')
    let data = JSON.stringify(characterMetadata)
    fs.writeFileSync(filename + '.json', data)
    //}
    //??? what for
    callback(dnd)
}