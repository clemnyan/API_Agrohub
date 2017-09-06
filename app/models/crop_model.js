import mongoose, { Schema } from 'mongoose';

const CropSchema = new Schema({
  name: String,
  rainfall: Number,
  temperature: Number,
  sunlight: Number,
  pests: String,
  fertiliser: String,
  soilType: String,
  uses: String,
  nutrition: String,
  description: String,
  physiology: String,
  morphology: String,
  diseases: String,
});

const CropModel = mongoose.model('Crop', CropSchema);

export default CropModel;
