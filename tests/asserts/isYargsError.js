module.exports = (err, messageMatch = []) => {
  err.name.should.equal('YError');
  messageMatch.forEach(term => err.message.should.contain(term));
};
