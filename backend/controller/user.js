exports.create = (req, res) => {
  //req.body: access json format request in backend.
  console.log(req.body);

  //res.json(): send a json format response to front end
  res.json({
    user: req.body,
  });
};
