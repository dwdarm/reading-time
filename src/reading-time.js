const htmlparser2 = require('htmlparser2');

const DEFAULT_WORDS_PER_MINUTE = 200;

function makeTextArray(input = '') {
  return input.replace(/\s/g, ' ').split(' ');
}

function countWords(input = '') {
  let count = 0;
  makeTextArray(input).forEach((item) => {
    count += (item.length > 0 ? 1 : 0);
  });
  return count;
}

function extractTextFromHTML(input = '') {
  return new Promise((resolve, reject) => {
    let result = '';
    const parser = new htmlparser2.Parser({
      ontext(text) {
        result += `${text} `;
      },
      onend() {
        resolve(result);
      },
      onerror(err) {
        reject(err);
      },
    });
    parser.write(input);
    parser.end();
  });
}

function fromText(input = '', options = {}) {
  const WPM = options.wordsPerMinute || DEFAULT_WORDS_PER_MINUTE;
  const wordCount = countWords(input);
  const result = wordCount / WPM;
  return {
    wordCount,
    miliSeconds: result * 60 * 1000,
    minutes: Math.round(result),
    text: `${Math.round(result)} min read`,
  };
}

async function fromHTML(input = '', options = {}) {
  const text = await extractTextFromHTML(input);
  return fromText(text, options);
}

module.exports = {
  fromText,
  fromHTML,
};
