import State from '../models/state_model';

export const createState = (req, res) => {
  const newState = new State();

  newState.name = req.body.name;
  newState.rainfall = req.body.rainfall;
  newState.temperature = req.body.temperature;
  newState.sunshine = req.body.sunshine;
  newState.pestsAndDiseases = req.body.pestsAndDiseases;
  newState.geology = req.body.geology;
  newState.crops = req.body.crops;
  newState.livestock = req.body.livestock;
  newState.details = req.body.details;
  if (!newState.name) { return res.status(422).send('You must enter the name of the state'); }

  newState.save()
    .then((result) => {
      // console.log('success');
      res.json(
        { message: 'State created!' },
      );
    })
    .catch((error) => {
      console.log('failure');
      res.status(500).json({ error });
    });
};


export const updateState = (req, res, next) => {
  State.findById(req.params.id).then((state) => {
    state.update(req.body).then((updatedState) => {
      res.json({ province: updatedState });
    }).catch((error) => { res.status(422).send({ error }); });
  }).catch((error) => { res.status(500).send({ error }); });
};

const cleanRainfall = (rainfall) => {
  return {
    January: rainfall.January,
    February: rainfall.February,
    March: rainfall.March,
    April: rainfall.April,
    May: rainfall.May,
    June: rainfall.June,
    July: rainfall.July,
    August: rainfall.August,
    September: rainfall.September,
    October: rainfall.October,
    November: rainfall.November,
    December: rainfall.December,
  };
};


const cleanTemperature = (rainfall) => {
  return {
    January: rainfall.January,
    February: rainfall.February,
    March: rainfall.March,
    April: rainfall.April,
    May: rainfall.May,
    June: rainfall.June,
    July: rainfall.July,
    August: rainfall.August,
    September: rainfall.September,
    October: rainfall.October,
    November: rainfall.November,
    December: rainfall.December,
  };
};

const cleanCrop = (crop) => {
  return {
    id: crop._id,
    name: crop.name,
  };
};

const cleanAnimal = (animal) => {
  return {
    id: animal._id,
    name: animal.name,
  };
};

const cleanCrops = (crops) => {
  return crops.map((crop) => { return cleanCrop(crop); });
};

const cleanLivestock = (crops) => {
  return crops.map((crop) => { return cleanAnimal(crop); });
};

const cleanState = (state) => {
  return {
    id: state._id,
    name: state.name,
    rainfall: cleanRainfall(state.rainfall),
    temperature: cleanTemperature(state.temperature),
    sunshine: state.sunshine,
    pestsAndDiseases: state.pestsAndDiseases,
    geology: state.geology,
    crops: cleanCrops(state.crops),
    livestock: cleanLivestock(state.livestock),
    details: state.details,
  };
};


const cleanStates = (states) => {
  return states.map((state) => { return cleanState(state); });
};

export const getStates = (req, res, next) => {
  State.find(req.query).populate('name rainfall temoerature sunshine pestsAndDiseases geology crops livestock details').then((states) => {
    res.send(cleanStates(states));
  }).catch((error) => { res.status(500).send({ error }); });
};

export const getState = (req, res, next) => {
  State.find(req.params.id).populate('name rainfall temoerature sunshine pestsAndDiseases geology crops livestock details').then((state) => {
    res.send(cleanState(state));
  }).catch((error) => { res.status(500).send({ error }); });
};
