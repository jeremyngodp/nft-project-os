from PIL import Image, ImageOps
import random
import json
import os
scriptDir = os.path.dirname(__file__)
imagePath = os.path.join(scriptDir, '..\image')

print(imagePath)

background = ["Blue", "Pink", "Yellow", "Mint"]
backgroundWeight = [50, 25, 15, 10]

square = ["Red", "Black", "Purple", "White"]
squareWeight = [52, 27, 13, 8]

eye = ["Green", "Lilac", "Amber"]
eyeWeight = [43, 33, 24]

backgroundFile = {
    "Blue" : "bg1",
    "Pink" : "bg2",
    "Yellow" : "bg3",
    "Mint" : "bg4"
}

squareFiles = {
    "Red" :"sq1",
    "Black" :"sq2",
    "Purple" :"sq3",
    "White" :"sq4",
}

eyeFiles = {
    "Green" :"ey1",
    "Lilac" :"ey2",
    "Amber" :"ey3",
}


TOTAL_COMBO = len(background) * len(square) * len(eye)

traits = []

def createCombo():
    
    trait = {}

    trait["Background"] = random.choices(background, backgroundWeight)[0]
    trait["Square"] = random.choices(square, squareWeight)[0]
    trait["Eye"] = random.choices(eye, eyeWeight)[0]
    
    if trait in traits:
        return createCombo()
    else:
        return trait
    
for i in range(TOTAL_COMBO):
    
    newtraitcombo = createCombo()
    
    traits.append(newtraitcombo)


def allUnique(x):
    seen = list()
    return not any(i in seen or seen.append(i) for i in x)

print(allUnique(traits))

# ADD TOKEN IDS TO JSON

i = 1
for item in traits:
    item["tokenId"] = i
    i = i + 1

for item in traits:

    im1 = Image.open(f'../image/Backgrounds/{backgroundFile[item["Background"]]}.jpeg').convert('RGBA')
    im2 = Image.open(f'../image/Squares/{squareFiles[item["Square"]]}.png').convert('RGBA')
    im3 = Image.open(f'../image/Eyes/{eyeFiles[item["Eye"]]}.png').convert('RGBA')
    im3 = im3.resize((499,499))



    #Create each composite
    com1 = Image.alpha_composite(im1, im2)
    # rgb_im = com1.convert('RGB')
    com2 = Image.alpha_composite(com1, im3)

    #Convert to RGB
    rgb_im = com2.convert('RGB')
    # display(rgb_im.resize((400,400), Image.NEAREST))

    
    # create new image file 
    file_name = str(item["tokenId"]) + ".jpg"
    rgb_im.save("../image/output/" + file_name)
    print(f'{str(item["tokenId"])} done')

    #upload image to IPFS, get hash

    # create new entry in the json file / create new json file.
    metadata = {
        "name": f'AB #{item["tokenId"]}',
        "description": f'A weird aninmal having {item["Square"]} body and a {item["Eye"]} eye!',
        "image_url" : f'ipfs://ipfs/<place_holder>/{item["tokenId"]}',
        "Background" : item["Background"],
        "Body" : item["Square"],
        "Eye" : item["Eye"],
        "tokenId": item["tokenId"]
    }

    json_object  = json.dumps(metadata, indent=4)

    with open(f'./metadata_out/{item["tokenId"]}.json', "w") as outfile:
        outfile.write(json_object)
        # outfile.write(",\n")

