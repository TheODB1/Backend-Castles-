import ErrorResponse from "../utils/ErrorResponse.js";

export const uploadResponse = (req, res) => {
  const { file } = req;
  if (!file) throw new ErrorResponse("Please upload a file", 400);
  const location = process.env.AWS_BUCKET
    ? req.file.location
    : `${protocol}://${host}/uploads/${file.filename}`;
  res.status(201).json({
    location,
  });
};
