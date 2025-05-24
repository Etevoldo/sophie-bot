const fs = require('node:fs');
const path = require('node:path');
const table = require('html-table-to-json');

const game = process.argv[2] ?? 'graces';
const type = process.argv[3] ?? 'mystic';

try {
  const rawJsonPath = path.join(__dirname, 'input.html');
  let rawJSON = (fs.readFileSync(rawJsonPath)).toString();
  rawJSON = rawJSON.replaceAll('&nbsp;', ' ');
  rawJSON = rawJSON.replaceAll(/\[.\]/g, '');
  const OBJArray = (table.parse(rawJSON)).results[0];

  let doneDocument = {};
  if (game === 'xillia') doneDocument = xilliaPipeline(OBJArray);
  if (game === 'graces') doneDocument = gracesPipeline(OBJArray);


  console.log(doneDocument);
  fs.writeFileSync('output.json', JSON.stringify(doneDocument));

} catch (err) {
  console.error(err);
}

function xilliaPipeline(arteArray) {
  const doneDocument = {};

  for (let i = 0; i < arteArray.length; i++) {
    // cut kanji
    const name = arteArray[i]['Arte Name'];
    const cutName = cutNonAscii(name);
    arteArray[i]['Arte Name'] = cutName;

    // all fields need description
    arteArray[i]['Description'] = '-';

    // comma separate Effects
    const enabledEffects = [
      'Stand Up', 'Knockdown', 'Aerial', 'Guard Break'
    ];
    arteArray[i]['Enabled Effects']
      = separateWords(arteArray[i]['Enabled Effects'], enabledEffects);

    const elementalAttributes = [
      'Fire', 'Water', 'Wind', 'Earth', 'Dark', 'Light'
    ];
    arteArray[i]['Elemental Attributes'] = separateWords(
      arteArray[i]['Elemental Attributes'],
      elementalAttributes
    );

    const damageEffects = [
      'Burn', 'Weak', 'Slow', 'Paralysis', 'Terror', 'Stun'
    ];
    arteArray[i]['Damage Effect']
      = separateWords(arteArray[i]['Damage Effect'], damageEffects);

    doneDocument[cutName.toLowerCase()] = arteArray[i];


    let nextObjLength;
    // end loop if it's the end of the array, otherwise check if next obj exists
    if (arteArray[i] === arteArray.at(-1)) {
      break;
    } else {
      nextObjLength = Object.keys(arteArray[i + 1]).length;
    }

    // see if next entry is just the description
    if (nextObjLength < 2) {
      arteArray[i]['Description'] = arteArray[i + 1]['Arte Name'];
      // skip to the next since there's nothing to put here
      i++;
    }
  }
  return doneDocument;
}

function gracesPipeline(arteArray) {
  const mastery = require('./gracesmastery.js');
  const doneDocument = {};

  for (let i = 0; i < arteArray.length; i++) {
    // cut kanji
    let name = arteArray[i]['Arte Name'];
    name = name.replace('\n', ' ');
    name = name.replace('             ', ' ');
    const cutName = cutNonAscii(name);
    arteArray[i]['Arte Name'] = cutName;

    // comma separate Effects
    const enabledEffects = [
      'Stand Up', 'Knockdown', 'Guard Break'
    ];
    arteArray[i]['Enabled Effects']
      = separateWords(arteArray[i]['Enabled Effects'], enabledEffects);

    const enemyTypes = [
      'Unknown', 'Bird', 'Insect', 'Aquatic', 'Reptile',
      'Plant', 'Beast', 'Amorphous', 'Dragon', 'Human', 'Spirit', 'Inorganic',
      'Fiend', 'Machine', 'Nova'
    ];
    arteArray[i]['Enemy Attributes']
      = separateWords(arteArray[i]['Enemy Attributes'], enemyTypes);

    const dmgType = [
      'Slash', 'Strike', 'Impact', 'Shot', 'Paralysis', 'Slow',
      'Burn', 'Poison'
    ];
    arteArray[i]['Damage Type']
      = separateWords(arteArray[i]['Damage Type'], dmgType);

    arteArray[i]['Mastery'] = mastery[cutName.toLowerCase()];

    doneDocument[cutName.toLowerCase()] = arteArray[i];

    // end loop if it's the end of the array, otherwise check if next obj exists
    if (arteArray[i] === arteArray.at(-1)) {
      break;
    }


    const nextObjLength = Object.keys(arteArray[i + 1]).length;

    // see if next entry is the same column
    if (nextObjLength < 11) {
      if (type === 'mystic') {
        i++;
        continue;
      }

      Object.values(arteArray[i + 1]).forEach(item => {
        if (/^[0-9]*\./.test(item)) {
          doneDocument[cutName.toLowerCase()]['Damage Multiplier (per hit)']
            = item;
        } else if (/^[0-9]*$/.test(item)) {
          doneDocument[cutName.toLowerCase()]['Total Damage (%)'] = item;
        } else if (includesMany(item, enemyTypes)) {
          item = separateWords(item, enemyTypes);
          doneDocument[cutName.toLowerCase()]['Enemy Attributes'] = item;
        } else if (includesMany(item, dmgType)) {
          item = separateWords(item, dmgType);
          doneDocument[cutName.toLowerCase()]['Damage Type'] = item;
        } else {
          doneDocument[cutName.toLowerCase()]['Description'] = item;
        }
      });
      // description
      if (arteArray[i + 2] && Object.keys(arteArray[i + 2]).length < 11) {
        doneDocument[cutName.toLowerCase()]['Description']
          = Object.values(arteArray[i + 2])[0];
        i++;
      }
      // skip to the next since there's nothing to put here
      i++;
    }
  }
  return doneDocument;
}

// trim a string that has non-asci characters appended to it.
// e.g: 'Healer治癒功Chiyukou' returns 'Healer'
function cutNonAscii(string) {
  let position = 0;
  for (const c of string) {
    if (/[\x20-\x7F]/.test(c)) position++;
    else break;
  }
  return string.slice(0, position);
}

function separateWords(string, wordList) {
  if (string == '-') {
    return string;
  }
  const curList = [];
  wordList.forEach(effect => {
    if (string?.includes(effect)) {
      curList.push(effect);
    }
  });
  return curList.join(', ');
}

function includesMany(string, array) {
  let isIncluded = false;
  array.forEach(subString => {
    if (string.includes(subString)) isIncluded = true;
  });
  return isIncluded;
}

