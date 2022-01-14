import Castle from "../models/Castle.js";

export const getAllCastles = async (req, res) => {
  try {
    const castles = await Castle.find();
    res.json(castles);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleCastle = async (req, res) => {
  try {
    const castles = await Castle.findById(req.params.id);
    res.json(castles);
  } catch (error) {
    res.status(500).json(error);
  }
};
