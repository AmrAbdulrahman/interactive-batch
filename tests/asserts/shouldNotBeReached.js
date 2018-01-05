module.exports = (message = 'this line should not be reached') => {
  throw new Error(message);
};
