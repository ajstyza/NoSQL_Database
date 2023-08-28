// 2

const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: "Thought",
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;