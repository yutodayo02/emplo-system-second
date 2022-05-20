const mongoose = require("mongoose");

const EmploSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "タスク名を入れてください。"],
        trim: true,
        maxlength: [20, "タスク名は20文字以内で入力してください。"],
    },
    attend: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Emplo", EmploSchema);