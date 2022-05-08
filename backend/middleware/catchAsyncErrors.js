// let's suppose we have not given the product name which was required then our api will
// await for the response forever and our server will crash so to overcome that error we have to surround 
// it by try catch statements and we also don't want to do it everytime that is why seperate file

module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };