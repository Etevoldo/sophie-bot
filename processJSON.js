const fs = require('node:fs');
const path = require('node:path');
const table = require('html-table-to-json');

const outputName = process.argv[2];

try {
  const rawJsonPath = path.join(__dirname, 'input.html');
  let rawJSON = (fs.readFileSync(rawJsonPath)).toString();
  rawJSON = rawJSON.replaceAll('&nbsp;', ' ');
  rawJSON = rawJSON.replaceAll(/\[.\]/g, '');
  const OBJArray = (table.parse(rawJSON)).results[0];
  //const OBJArray = JSON.parse(rawJSON);

  const doneDocument = { [outputName]: {} };

  for (let i = 0; i < OBJArray.length; i++) {
    // cut kanji
    const name = OBJArray[i]['Arte Name'];
    const cutName = cutNonAscii(name);
    OBJArray[i]['Arte Name'] = cutName;

    // all fields need description
    OBJArray[i]['Description'] = '-';

    // comma separate Effects
    const enabledEffects = [
      'Stand Up', 'Knockdown', 'Aerial', 'Guard Break'
    ];
    OBJArray[i]['Enabled Effects']
      = separateWords(OBJArray[i]['Enabled Effects'], enabledEffects);

    const elementalAttributes = [
      'Fire', 'Water', 'Wind', 'Earth', 'Dark', 'Light'
    ];
    OBJArray[i]['Elemental Attributes']
      = separateWords(OBJArray[i]['Elemental Attributes'], elementalAttributes);

    const damageEffects = [
      'Burn', 'Weak', 'Slow', 'Paralysis', 'Terror', 'Stun'
    ];
    OBJArray[i]['Damage Effect']
      = separateWords(OBJArray[i]['Damage Effect'], damageEffects);

    doneDocument[outputName][cutName.toLowerCase()] = OBJArray[i];

    let nextObjLength;
    // end loop if it's the end of the array, otherwise check if next obj exists
    if (OBJArray[i] === OBJArray.at(-1)) {
      break;
    } else {
      nextObjLength = Object.keys(OBJArray[i + 1]).length;
    }

    // see if next entry is just the description
    if (nextObjLength < 2) {
      OBJArray[i]['Description'] = OBJArray[i + 1]['Arte Name'];
      // skip to the next since there's nothing to put here
      i++;
    }

  }

  console.log(doneDocument);
  fs.writeFileSync('output.json', JSON.stringify(doneDocument));

} catch (err) {
  console.error(err);
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

