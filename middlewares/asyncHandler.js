const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/* function asyncHandler(fn){
 return function (req, res, next)  {
     return Promise.resolve(fn(req, res, next)).catch(next)
 };
} */

export default asyncHandler;