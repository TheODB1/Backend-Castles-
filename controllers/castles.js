import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import Castle from "../models/Castle.js";

export const getAllCastles = async (req, res) => {
  try {
    const castles = await Castle.find().populate("owner");
    res.json(castles);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCastle = asyncHandler(async (req, res) => {
  const {
    body,
    user: { _id },
  } = req;
  const newCastle = await Castle.create({ ...body, owner: _id });
  res.status(201).json(newCastle);
});

export const getSingleCastle = async (req, res) => {
  try {
    //   const {
    //   params: { id }
    // } = req;
    const castle = await Castle.findById(req.params.id).populate("owner");
    res.json(castle);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCastle = asyncHandler(async (req, res) => {
  const {
    user,
    params: { id },
    body,
  } = req;
  console.log(user)
  const castleToUpdate = await Castle.findById(id);
  if (user.id !== castleToUpdate.owner?.toString())
  //without '?'  postman get an "error": "Cannot read property 'toString' of undefined" when i wanted to update or delete a castle which doesn't belong to me . 
    //maybe that castle doesn't have an owner 
    //The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid. if you use the optional chaining, it won't throw an error, rather because the equality of the compaarison is not mantained, it will throw this throw new ErrorResponse(
    //   Only the owner of the castle can modify it. Go away,   403
    // what you REALLY have to do is add an owner to EVERY castle
    throw new ErrorResponse(
      `Only the owner of the castle can modify it. Go away`,
      403
    );
  const updatedCastle = await Castle.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  if (!castleToUpdate)
    throw new ErrorResponse(
      `Castle with id of ${id} not found, could not update`,
      404
    );
  res.json(updatedCastle);
});

export const deleteCastle = asyncHandler(async (req, res) => {
  const {
    user,
    params: { id },
  } = req;
  const castleToUpdate = await Castle.findById(id);
  if (!castleToUpdate)
    throw new ErrorResponse(
      `Castle with id of ${id} not found, could not update`,
      404
    );
  if (user.id !== castleToUpdate.owner?.toString()) 
    //user.id is like "65425626503". castleToUpdate.owner: ObjectId("65425626503")
    throw new ErrorResponse(
      `Only the owner of the castle can delete it. Go away`,
      403
    );
  const deleted = await Castle.findOneAndDelete({ _id: id });
  if (!deleted)
    throw new ErrorResponse(
      `Castle with id of ${id} not found, could not delete`,
      404
    );
  res.json({ success: `Castle with id of ${id} was deleted` });
});
