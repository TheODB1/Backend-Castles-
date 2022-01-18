import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Castle from "../models/Castle.js";

export const getAllCastles = async (req, res) => {
  try {
    const castles = await Castle.find().populate('owner');
    res.json(castles);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCastle = asyncHandler(async (req, res) => {
  const {
    body, 
    user: {_id}
  } = req;
  const newCastle = await Castle.create({ ...body, owner: _id });
  res.status(201).json(newCastle);
});

export const getSingleCastle = async (req, res) => {
  try {
  //   const {
  //   params: { id }
  // } = req;
    const castle = await Castle.findById(req.params.id).populate('owner');
    res.json(castle);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const updateCastle = asyncHandler(async (req, res) => {
  const {
    params: { id },
    body
  } = req;
  const castleToUpdate = await Castle.findById(id);
  if (!castleToUpdate)
    throw new ErrorResponse(`Castle with id of ${id} not found, could not update`, 404);
  // ??  if (user.id !== postToUpdate.author.toString())
  //  ?? throw new ErrorResponse(`Only the author of the post can modify it. Go away`, 403);
  const updatedCastle = await Castle.findOneAndUpdate({ _id: id }, body, { new: true });
  res.json(updatedCastle);
});

export const deleteCastle = asyncHandler(async (req, res) => {
  const {
      params: { id }
  } = req;
  const castleToUpdate = await Castle.findById(id);
  if (!castleToUpdate)
    throw new ErrorResponse(`Castle with id of ${id} not found, could not update`, 404);
  // ??if (user.id !== postToUpdate.author.toString())
  //  ? throw new ErrorResponse(`Only the author of the post can modify it. Go away`, 403);
  const deleted = await Castle.findOneAndDelete({ _id: id });
  if (!deleted) throw new ErrorResponse(`Castle with id of ${id} not found, could not delete`, 404);
  res.json({ success: `Castle with id of ${id} was deleted` });
});