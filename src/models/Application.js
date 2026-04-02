const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job'
    },
    company: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['guardada', 'aplicada', 'entrevista', 'rechazada', 'oferta'],
      default: 'guardada'
    },
    appliedAt: {
      type: Date
    },
    notes: {
      type: String
    },
    contactPerson: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Application', applicationSchema);