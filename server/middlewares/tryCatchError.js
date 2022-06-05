// as try catch statement makes the code lengthy on rep , here we will handle
// try catch error so that we should not write try-catch statement

module.exports = (checkError) => (req, res, next) => {
  Promise.resolve(checkError(req, res, next)).catch(next);
};
