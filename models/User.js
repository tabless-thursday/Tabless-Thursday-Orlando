const { Schema, ...mongoose } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: { type: String, require: true, unique: true },
    hash: { type: String, required: true },
    username: { type: String, require: true, unique: true},
    phone: { type: String, required: true },
    createdTabs: [{ type: Schema.Types.ObjectId, ref: 'Tab' }]
});

userSchema.plugin(uniqueValidator);

mongoose.model('User', userSchema);