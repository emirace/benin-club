import { Document, Schema } from "mongoose";
import { model } from "mongoose";
import { models } from "mongoose";

export interface INewsletterData extends Document {
  letter: string;
}

const newsletterDataSchema = new Schema<INewsletterData>(
  {
    letter: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model based on the schema
const NewsletterData =
  models.NewsletterData ||
  model<INewsletterData>("NewsletterData", newsletterDataSchema);

export default NewsletterData;
