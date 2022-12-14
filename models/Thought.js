const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Thought schema to create the Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now, // need getter to format date
    },
    username: {
      type: String,
      required: false,
    },
    reactions: [], // Array of nested documents created with reactionSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual for retrieving length of reactions array
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;