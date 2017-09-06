import Crop from '../models/crop_model';

const cleanCrop = (crop) => {
  return {
    id: crop._id,
    name: crop.name,
    rainfall: crop.rainfall,
    temperature: crop.temperature,
    sunlight: crop.sunlight,
    pests: crop.pests,
    fertiliser: crop.fertiliser,
    soilType: crop.soilType,
    uses: crop.uses,
    nutrition: crop.nutrition,
    description: crop.description,
    physiology: crop.physiology,
    morphology: crop.morphology,
    diseases: crop.diseases,
  };
};

const cleanCrops = (crops) => {
  return crops.map((crop) => { return cleanCrop(crop); });
};

export const createCrop = (req, res) => {
  const newCrop = new Crop();

  newCrop.name = req.body.name;
  newCrop.rainfall = req.body.rainfall;
  newCrop.temperature = req.body.temperature;
  newCrop.sunlight = req.body.sunlight;
  newCrop.pests = req.body.pests;
  newCrop.fertiliser = req.body.fertiliser;
  newCrop.soilType = req.body.soilType;
  newCrop.uses = req.body.uses;
  newCrop.nutrition = req.body.nutrition;
  newCrop.description = req.body.description;
  newCrop.physiology = req.body.physiology;
  newCrop.morphology = req.body.morphology;
  newCrop.diseases = req.body.diseases;

  if (!newCrop.name) {
    return res.status(422).send('You must enter name');
  }

  newCrop.save().then((result) => {
    res.json({
      message: 'crop created!',
    });
  }).catch((error) => {
    console.log('failure');
    res.status(500).json({ error });
  });
};

export const updateCrop = (req, res, next) => {
  Crop.findById(req.params.id).then((crop) => {
    crop.update(req.body).then((updatedCrop) => {
      res.json({ plant: updatedCrop });
    }).catch((error) => { res.status(422).send({ error }); });
  }).catch((error) => { res.status(500).send({ error }); });
};

export const getCrops = (req, res, next) => {
  Crop.find(req.query).populate('name rainfall temperature sunlight pests fertiliser soilType uses nutrition description physiology morphology diseases').then((crops) => {
    res.send(cleanCrops(crops));
  }).catch((error) => { res.status(500).send({ error }); });
};

export const getCrop = (req, res, next) => {
  Crop.findById(req.params.id).populate('name rainfall temperature sunlight pests fertiliser soilType uses nutrition description physiology morphology diseases').then((crop) => {
    res.send(cleanCrop(crop));
  }).catch((error) => { res.status(500).send({ error }); });
};
