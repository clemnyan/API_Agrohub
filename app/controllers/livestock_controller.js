import Livestock from '../models/livestock_model';

const cleanLivestock = (c) => {
  return {
    id: c._id,
    name: c.name,
    weight: c.weight,
    pests: c.pests,
    diseases: c.diseases,
    uses: c.uses,
    description: c.description,
    biology: c.morphology,
    breeds: c.diseases,
  };
};

const cleanAnimals = (animals) => {
  return animals.map((animal) => { return cleanLivestock(animal); });
};

export const createLivestock = (req, res) => {
  const newAnimal = new Livestock();

  newAnimal.name = req.body.name;
  newAnimal.weight = req.body.weight;
  newAnimal.nutrition = req.body.nutrition;
  newAnimal.pests = req.body.pests;
  newAnimal.diseases = req.body.diseases;
  newAnimal.uses = req.body.uses;
  newAnimal.description = req.body.description;
  newAnimal.biology = req.body.biology;
  newAnimal.breeds = req.body.breeds;

  if (!newAnimal.name) {
    return res.status(422).send('You must enter name');
  }

  newAnimal.save().then((result) => {
    res.json({
      message: 'animal  created!',
    });
  }).catch((error) => {
    console.log('failure');
    res.status(500).json({ error });
  });
};

export const updateAnimal = (req, res, next) => {
  Livestock.findById(req.params.id).then((animal) => {
    animal.update(req.body).then((updatedLivestock) => {
      res.json({ animal: updatedLivestock });
    }).catch((error) => { res.status(422).send({ error }); });
  }).catch((error) => { res.status(500).send({ error }); });
};

export const getLivestock = (req, res, next) => {
  Livestock.find(req.query).populate('name weight nutrition pests diseases uses description biology breeds').then((livestock) => {
    res.send(cleanAnimals(livestock));
  }).catch((error) => { res.status(500).send({ error }); });
};

export const getAnimal = (req, res, next) => {
  Livestock.findById(req.params.id).populate('name weight nutrition pests diseases uses description biology breeds').then((animal) => {
    res.send(cleanLivestock(animal));
  }).catch((error) => { res.status(500).send({ error }); });
};
