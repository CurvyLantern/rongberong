import mongoose, { Model } from "mongoose";
const PaletteSchema = new mongoose.Schema({
  paletteName: String,
  palette: [
    {
      type: String,
      code: String,
      name: String,
    },
  ],
});

const Palette =
  mongoose.models.Palette || mongoose.model("Palette", PaletteSchema);

export default Palette;
