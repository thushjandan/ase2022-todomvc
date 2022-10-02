import { TodoModel } from '../model/todo.js'
import { TagModel } from '../model/tag.js'

const selectTodoFields = {
    _id: 0,
    id: 1, 
    title: 1, 
    completed: 1, 
    order: 1
}

const selectTagFields = {
    _id: 0,
    id: 1, 
    title: 1, 
}

export function createTodo(todo) {
    return TodoModel.create(todo).then(docTodo => {
        return docTodo;
    })
}

export function listTodos() {
    return TodoModel.find().populate({path: "tags", select: selectTagFields}).select(selectTodoFields);
}

export function findTodoById(id)  {
    return TodoModel.findOne({id: id}).populate({path: "tags", select: selectTagFields}).select(selectTodoFields);
}

export function updateTodo(id, todo) {
    return TodoModel.findOneAndUpdate({id: id}, todo, {new: true}).select(selectTodoFields);
}

export function deleteTodo(todoId) {
    return TodoModel.deleteMany({id: todoId});
}

export function deleteAllTodos() {
    return TodoModel.deleteMany({});
}

export function createTag(tag) {
    return TagModel.create(tag).then(docTag => {
        return docTag;
    })
}

export function listTags() {
    return TagModel.find().populate({path: "todos", select: selectTodoFields}).select(selectTagFields);
}

export function findTagById(id)  {
    return TagModel.findOne({id: id}).populate({path: "todos", select: selectTodoFields}).select(selectTagFields);
}

export function updateTag(id, tag) {
    return TagModel.findOneAndUpdate({id: id}, tag, {new: true}).select(selectTagFields);
}

export function deleteTag(id) {
    return TagModel.deleteMany({id: id});
}

export function deleteAllTags() {
    return TagModel.deleteMany({});
}

export async function addTagToTodo(todoId, tagId) {
    const tagObject = await TagModel.findOne({id: tagId}).exec();
    if (!tagObject) {
        return null;
    }
    const result = await TodoModel.findOneAndUpdate({id: todoId}, { $push: { tags: tagObject._id } });
    return TagModel.findByIdAndUpdate(tagObject._id, { $push: { todos: result._id } });
}

export async function deleteAllTagsFromTodo(todoId) {
    const todoObj = await TodoModel.findOne({id: todoId}).exec();
    await TagModel.updateMany(
        { _id: { $in: todoObj.tags } },
        {$pull: { todos: todoObj._id}},
        {multi: true}
    ).exec()
    return TodoModel.updateOne({id: todoId}, { $set: { tags: [] } }).exec();
}

export async function deleteTagFromTodo(todoId, tagId) {
    const tagObject = await TagModel.findOne({id: tagId}).exec();
    if (!tagObject) {
        return null;
    }
    const todoObject = await TodoModel.findOneAndUpdate({id: todoId}, { $pull: { tags: tagObject._id } });
    return TagModel.updateOne({_id: tagObject._id}, {$pull: { todos: todoObject._id}})
}