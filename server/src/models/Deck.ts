import mongoose from "mongoose";

const { Schema } = mongoose;

const DeckSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  cards: [String],
});

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;
