import mongoose from "mongoose";

const paletteItemSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const PaletteSchema = new mongoose.Schema(
  {
    paletteName: { type: String, required: true },
    palette: [paletteItemSchema],
  },
  {
    timestamps: true,
  }
);

const Palette =
  mongoose.models.Palette || mongoose.model("Palette", PaletteSchema);

export default Palette;
