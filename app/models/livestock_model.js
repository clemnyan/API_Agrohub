import mongoose, { Schema } from 'mongoose';

const LivestockSchema = new Schema({
  name: String,
  weight: Number,
  nutrition: String,
  pests: String,
  diseases: String,
  uses: String,
  description: String,
  biology: String,
  breeds: String,
});

const LivestockModel = mongoose.model('Livestock', LivestockSchema);

export default LivestockModel;
