exports.get404 = (req, res) => {
  res.status(404).send('Resource not found!');
};
