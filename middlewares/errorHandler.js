const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err.message === 'invalid signature') {
      err.message = 'Invalid login';
    }
    res.status(err.statusCode || 500).json({ error: err.message });
  };
  
  export default errorHandler;