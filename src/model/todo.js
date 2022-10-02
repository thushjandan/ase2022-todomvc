import mongoose from 'mongoose';
import MongooseSequence from 'mongoose-sequence';

const TodoSchema = new mongoose.Schema({
    title: String,
    order: Number,
    completed: Boolean,
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        index: true
    }]
});
// Set up autoincrement fields
const AutoIncrement = MongooseSequence(mongoose);
TodoSchema.plugin(AutoIncrement, {id: 'todo_id_counter', inc_field: 'id'});

TodoSchema.pre('remove', function(next) {
    this.model('Tag').update(
        {_id: {$in: this.tags}},
        {$pull: {todos: this._id}},
        {$multi: true},
        next
    );
});

export const TodoModel = mongoose.model(
    "Todo",
    TodoSchema
);