import Country from '../models/country_model';  // more like an extension of models
// mainly for querying


// format of output structures
const cleanClimate = (climate) => {
  return {
    meanTemp: climate.meanTemp,
    meanRainfall: climate.meanRainfall,
    Elevation: climate.Elevation,
  };
};

const cleanState = (state) => {
  return {
    id: state._id,
    name: state.name,
  };
};

const cleanStates = (states) => {
  return states.map((state) => { return cleanState(state); });
};

const cleanCrop = (crop) => {
  return {
    id: crop._id,
    name: crop.name,
  };
};

const cleanCrops = (crops) => {
  return crops.map((crop) => { return cleanCrop(crop); });
};

const cleanAnimal = (animal) => {
  return {
    id: animal._id,
    name: animal.name,
  };
};

const cleanLivestock = (livestock) => {
  return livestock.map((animal) => { return cleanAnimal(animal); });
};

const cleanCountry = (country) => {
  return {
    id: country._id,
    name: country.name,
    gdp: country.gdp,
    population: country.population,
    climate: cleanClimate(country.climate),
    states: cleanStates(country.states),
    mainTrends: country.mainTrends,
    crops: cleanCrops(country.crops),
    livestock: cleanLivestock(country.livestock),
  };
};

const cleanCountries = (countries) => {
  return countries.map((country) => { return cleanCountry(country); });
};

// save a country object to the database
// req.body in creating class
export const createCountry = (req, res) => {
  const newCountry = new Country();
  newCountry.name = req.body.name;
  newCountry.gdp = req.body.gdp;
  newCountry.population = req.body.population;
  newCountry.climate = req.body.climate;
  newCountry.states = req.body.states;
  newCountry.mainTrends = req.body.mainTrends;
  newCountry.crops = req.body.crops;
  newCountry.livestock = req.body.livestock;

  if (!newCountry.name || !newCountry.mainTrends) { return res.status(422).send('You must enter name and mainTrends'); }

  newCountry.save()
    .then((result) => {
      // console.log('success');
      res.json(
        { message: 'Country created!' },
      );
    })
    .catch((error) => {
      console.log('failure');
      res.status(500).json({ error });
    });
};

// req.params to find specific object
export const updateCountry = (req, res, next) => {
  Country.findById(req.params.id).then((country) => {
    country.update(req.body).then((updatedCountry) => {
      res.json({ nation: updatedCountry });
    }).catch((error) => { res.status(422).send({ error }); });
  }).catch((error) => { res.status(500).send({ error }); });
};

export const getCountries = (req, res, next) => {
  Country.find(req.query).populate('name gdp population climate states mainTrends crops livestock').then((countries) => {
    res.send(cleanCountries(countries));
  }).catch((error) => { res.status(500).send({ error }); });
};

export const getCountry = (req, res, next) => {
  Country.findById(req.params.id).populate('name gdp population climate states mainTrends crops livestock').then((country) => {
    res.send(cleanCountry(country));
  }).catch((error) => { res.status(500).send({ error }); });
};
