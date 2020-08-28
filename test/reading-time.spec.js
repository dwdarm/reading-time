const expect = require('expect.js');
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const readingTime = require('../src/reading-time.js');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

describe('fromText tests' , () => {
  
  it('should handle empty text', () => {
    const res = readingTime.fromText('')
    expect(res.wordCount).to.be.eql(0);
    expect(res.miliSeconds).to.be.eql(0);
    expect(res.minutes).to.be.eql(0);
    expect(res.text).to.be.eql('0 min read');
  });
  
  it('should handle one word text', () => {
    const res = readingTime.fromText('hello')
    expect(res.wordCount).to.be.eql(1);
    expect(res.miliSeconds).to.be.eql(300);
    expect(res.minutes).to.be.eql(0);
    expect(res.text).to.be.eql('0 min read');
  });
  
  it('should handle short text', () => {
    const res = readingTime.fromText('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
    expect(res.wordCount).to.be.eql(8);
    expect(res.miliSeconds).to.be.eql(2400);
    expect(res.minutes).to.be.eql(0);
    expect(res.text).to.be.eql('0 min read');
  });
  
  it('should handle text with starting whitespaces', () => {
    const res = readingTime.fromText('   Lorem ipsum dolor sit amet')
    expect(res.wordCount).to.be.eql(5);
    expect(res.miliSeconds).to.be.eql(1500);
    expect(res.minutes).to.be.eql(0);
    expect(res.text).to.be.eql('0 min read');
  });
  
  it('should handle text with ending whitespaces', () => {
    const res = readingTime.fromText('Lorem ipsum dolor sit amet   ')
    expect(res.wordCount).to.be.eql(5);
    expect(res.miliSeconds).to.be.eql(1500);
    expect(res.minutes).to.be.eql(0);
    expect(res.text).to.be.eql('0 min read');
  });
  
  it('should handle text with whitespaces on both sides', () => {
    const res = readingTime.fromText('   Lorem ipsum dolor sit amet   ')
    expect(res.wordCount).to.be.eql(5);
    expect(res.miliSeconds).to.be.eql(1500);
    expect(res.minutes).to.be.eql(0);
    expect(res.text).to.be.eql('0 min read');
  });
  
  it('should handle text with breaklines', () => {
    const res = readingTime.fromText('Lorem\nipsum\ndolor\nsit\namet')
    expect(res.wordCount).to.be.eql(5);
    expect(res.miliSeconds).to.be.eql(1500);
    expect(res.minutes).to.be.eql(0);
    expect(res.text).to.be.eql('0 min read');
  });
  
  it('should handle text with less than 1 minute read', () => {
    const res = readingTime.fromText(lorem.generateWords(80))
    expect(res.wordCount).to.be.eql(80);
    expect(res.miliSeconds).to.be.eql(24000);
    expect(res.minutes).to.be.eql(0);
    expect(res.text).to.be.eql('0 min read');
  });
  
  it('should handle text with 1 minute read', () => {
    const res = readingTime.fromText(lorem.generateWords(150))
    expect(res.wordCount).to.be.eql(150);
    expect(res.miliSeconds).to.be.eql(45000);
    expect(res.minutes).to.be.eql(1);
    expect(res.text).to.be.eql('1 min read');
  });
  
  it('should handle text greater than 1 minute read', () => {
    const res = readingTime.fromText(lorem.generateWords(350))
    expect(res.wordCount).to.be.eql(350);
    expect(res.miliSeconds).to.be.eql(105000);
    expect(res.minutes).to.be.eql(2);
    expect(res.text).to.be.eql('2 min read');
  });
  
  it('should handle long text', () => {
    const res = readingTime.fromText(lorem.generateWords(1000))
    expect(res.wordCount).to.be.eql(1000);
    expect(res.miliSeconds).to.be.eql(300000);
    expect(res.minutes).to.be.eql(5);
    expect(res.text).to.be.eql('5 min read');
  });
  
});
