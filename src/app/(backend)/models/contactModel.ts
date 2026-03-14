import mongoose, { Schema, models, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

const Contact =
  models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
