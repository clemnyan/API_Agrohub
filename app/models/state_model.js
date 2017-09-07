import mongoose, { Schema } from 'mongoose';

const StateSchema = new Schema({
  name: String,
  rainfall: {
    January: Number,
    February: Number,
    March: Number,
    April: Number,
    May: Number,
    June: Number,
    July: Number,
    August: Number,
    September: Number,
    October: Number,
    November: Number,
    December: Number,
  },
  temperature: {
    January: Number,
    February: Number,
    March: Number,
    April: Number,
    May: Number,
    June: Number,
    July: Number,
    August: Number,
    September: Number,
    October: Number,
    November: Number,
    December: Number,
  },
  sunshine: String,
  pestsAndDiseases: String,
  geology: String,
  crops: [{
    type: Schema.ObjectId,
    ref: 'Crop',
  }],
  livestock: [{
    type: Schema.ObjectId,
    ref: 'Livestock',
  }],
  details: String,
});

const StateModel = mongoose.model('State', StateSchema);

export default StateModel;
