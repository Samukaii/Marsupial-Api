function removeAccents(word = '') {
  var mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g,
  };

  for (var letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra];
    word = word.replace(expressaoRegular, letra);
  }

  return word;
}




function toInitialUpperCase(word = '') {
  word = word.toLowerCase();
  word = word.split(' ');

  word = word.map((splitedWord) => {
    return splitedWord.replace(splitedWord[0], splitedWord[0].toUpperCase())
  })
  return word.join(' ');
}


module.exports = { removeAccents, toInitialUpperCase };
