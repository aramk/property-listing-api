module.exports = function(options) {
  // All errors caught in routes should be delegated to this middleware by being passed into the next() callback.
  return function(err, req, res, next) {
    if (!err) next();
    console.error('Server error:', err);
    // TODO(aramk) Distinguish between API errors (public) and internal errors (private).
    res.status(500).send({
      error: {
        message: err.message
      }
    });
  }
}
