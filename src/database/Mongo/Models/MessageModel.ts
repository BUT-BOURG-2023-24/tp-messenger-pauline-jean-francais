import mongoose, { Schema, Document, Types } from "mongoose";
import { MongooseID } from "../../../types";

export interface IMessage extends Document {
	// conversationId: Types.ObjectId | string;
	// from: Types.ObjectId | string;
	conversationId: MongooseID;
	from: MongooseID;
  	content: string;
  	postedAt: Date;
  	replyTo: Types.ObjectId | string | null;
  	edited: boolean;
  	deleted: boolean;
	// reactions:{[userId:string]:string};
  	reactions: Record<MongooseID, string>;
}

const MessageSchema: Schema<IMessage> = new Schema<IMessage>({
	conversationId: {
		type: Schema.Types.ObjectId,
		ref: "Conversation",
		required: true,
	  },
	  from: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	  },
	  content: {
		type: String,
		required: true,
	  },
	  postedAt: {
		type: Date,
		default: Date.now,
	  },
	  replyTo: {
		type: Schema.Types.ObjectId,
		ref: "Message",
	  },
	  edited: {
		type: Boolean,
		default: false,
	  },
	  deleted: {
		type: Boolean,
		default: false,
	  },
	 reactions: { 
		type: Map, 
		of: String 
	},
});

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export { MessageModel, MessageSchema };
