import mongoose, { Schema } from 'mongoose';


// will add type of service industry present in the counrtry
// for example GMB in Zim

const CountrySchema = new Schema({
  name: String,
  gdp: Number,
  population: Number,
  climate: {
    meanTemp: Number,
    meanRainfall: Number,
    Elevation: Number,
  },
  states: [{
    type: Schema.ObjectId,
    ref: 'State',
  }],
  mainTrends: String,
  crops: [{
    type: Schema.ObjectId,
    ref: 'Crop',
  }],
  livestock: [{
    type: Schema.ObjectId,
    ref: 'Livestock',
  }],
});

// create country model
const CountryModel = mongoose.model('Country', CountrySchema);

export default CountryModel;
