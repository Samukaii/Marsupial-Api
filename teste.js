const validSubjects = require('./src/config/validSubjects.json');
const { removeAccents } = require('./src/helpers/convertions');

const validateSubject = function (subject) {
    console.log(removeAccents(subject));
    return validSubjects.some(validSubject => removeAccents(subject).toLocaleUpperCase === removeAccents(validSubject).toLocaleUpperCase);
}

const compose = (...fns) => value =>
    fns.reduce((previousValue, fn) =>
        fn(previousValue), value);


function toInitialUpperCase(word = '') {
    word = word.toLowerCase();
    word = word.split(' ');

    word = word.map((splitedWord) => {
        return splitedWord.replace(splitedWord[0], splitedWord[0].toUpperCase())
    })
    return word.join(' ');
}

const fna = value => value.toUpperCase();
const fnb = value => value.split('');


const funcaoTal = compose(toInitialUpperCase, removeAccents);
console.log(funcaoTal('edUcAção fíSica'))