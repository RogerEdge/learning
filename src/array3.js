const Characters = [
  {
    name: 'SpongeBob SquarePants',
    height: "4 inches",
    weight: "1 pounds",
    skinColor: "Yellow",
    eyeColor: "Blue",
    sex: "Male"
  },
  {
    name: 'Patrick Star',
    height: "2 feet",
    weight: "2 pounds",
    skinColor: "Pink",
    eyeColor: "Black",
    sex: "Male"
  },
  {
    name: 'Squidward Tentacles',
    height: "6 feet",
    weight: "180 pounds",
    skinColor: "Turquoise",
    eyeColor: "Red",
    sex: "Male"
  },
  {
    name: 'Eugene Krabs',
    height: "1 foot",
    weight: "5 pounds",
    skinColor: "Red",
    eyeColor: "Black",
    sex: "Male"
  },
  {
    name: 'Sandy Cheeks',
    height: "3 feet",
    weight: "120 pounds",
    skinColor: "Light Brown",
    eyeColor: "Black",
    sex: "Female"
  },
  {
    name: 'Sheldon Plankton',
    height: "0.5 inches",
    weight: "0.01 pounds",
    skinColor: "Green",
    eyeColor: "Red",
    sex: "Male"
  }
];

//**map**
//array of all names
const names = Characters.map(Character => Character.name)
console.log('names', names)


//array of all heights
const heights = Characters.map(Character => Character.height)
console.log('height', heights)


//array of objects with just weight and eyecolor properties
const selectRecords = Characters.map((Character) => ({ weight: Character.weight, eyeColor: Character.eyeColor }))
console.log('selectRecords', selectRecords)


//array of all first names
const firstNames = Characters.map(Character => Character.name.split(" ")[0])
console.log('firstNames', firstNames)



//**Reduce**
//get total weight of all characters
const totalWeightByPound = Characters.map(character => {
  const [number]= character.weight.split(' ')
  return Number(number)
}).reduce((total, weight) => {
  return total = total + weight
}, 0)
console.log('totalWeight', totalWeightByPound)



//get total height of all characters
const totalHeightByInches = Characters.map(character => {
  const [number,type]= character.height.split(' ')
  if (["feet","foot"].includes(type)){
    return Number(number)*12
  }
  return Number(number)
}).reduce((total, height) => {
  return total = total + height
}, 0)
console.log('totalHeight', totalHeightByInches)



//get total number of characters by eye color
const totalByEyeColor=Characters.reduce((character, cur)=> {
  const color=[cur.eyeColor]
  if (character[color]){
    character[color]=character[color] + 1
  }else character[color] = 1;
return character;
}, {})
console.log('totalByEyeColor', totalByEyeColor)


//get total number of characters in all the characters names
const totalNameCharacters= Characters.reduce((character, cur)=>character + cur.name.length, 0)
console.log('totalNameCharacters', totalNameCharacters)


//.filter to just females
console.log("females",Characters.filter(character=>character.sex.toLowerCase()==="female"))
