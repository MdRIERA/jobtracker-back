const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String
    },
    description: {
      type: String
    },
    url: {
      type: String
    },
    source: {
      type: String
    },
    salary: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Job', jobSchema);