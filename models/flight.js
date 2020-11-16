const Schema = mongoose.Schema;
	
const movieSchema = new Schema({
  airline: String,
  airport: String,
  flightNo: Number,
  departs: Date
  
});