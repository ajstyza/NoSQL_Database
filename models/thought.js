const User = require('./user');

const thoughtSchema = new Schema(
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

  const Thought = model('Thought', thoughtSchema);

module.exports = Thought;