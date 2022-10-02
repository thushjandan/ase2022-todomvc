import mongoose from 'mongoose';
import MongooseSequence from 'mongoose-sequence';

const TagSchema = new mongoose.Schema({
    title: String,
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
        index: true
    }]
});

// Set up autoincrement fields
const AutoIncrement = MongooseSequence(mongoose);
TagSchema.plugin(AutoIncrement, {id: 'tag_id_counter', inc_field: 'id'});

export const TagModel = mongoose.model(
    "Tag",
    TagSchema    
);