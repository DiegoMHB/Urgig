import { Booking } from "@/types/booking";
import { Document, Schema } from "mongoose";
import { SetSchema } from "./setSchema";

export interface BookingDoc extends Booking, Document {
  _id: string;
}

export const BookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: false },
  bannerURL: { type: String, required: false },
  location: { type: String, required: true },
  offer: { type: Number, required: true },
  sets: { type: [SetSchema], required: true },
  genre: { type: [String], required: true }, //preselected values
  maxCapacity: { type: Number, required: true },
  status: { type: String, required: true }, //negotiating, confirmed, declined
  bookingPromoterId: { type: String, required: true },
  bookingArtistId: { type: String, required: true },
  bookingEventId: { type: String, required: true },
  landed: { type: Boolean, required: false },
  travelExpenses: { type: Number, required: false },
});
