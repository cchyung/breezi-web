import { Schema } from "mongoose";

export enum TopicState {
  PENDING = "pending",
  LIVE = "live",
  ENDED = "ended",
}

export interface Topic {
  _id: Schema.Types.ObjectId;
  title: string;
  description?: string;
  state: TopicState;
  start?: Date;
  end?: Date;
  createdAt: Date;
  updatedAt: Date;
  style?: {
    color?: string;
    backgroundImageURL?: string;
    backgroundColor?: string;
  };
}

export const TopicSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    state: {
      type: String,
      required: true,
      enum: Object.values(TopicState),
      default: TopicState.PENDING,
    },
    start: {
      type: Schema.Types.Date,
    },
    end: {
      type: Schema.Types.Date,
    },
    style: {
      color: { type: String },
      backgroundImageURL: { type: String },
      backgroundColor: { type: String },
    },
  },
  { timestamps: true }
);
