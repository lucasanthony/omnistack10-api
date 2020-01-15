const { Schema, model } = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    github: {
       type: String,
       required: true
    },
    bio: {
        type: String,
        required: false
     },
     avatar: {
        type: String,
        required: true
     },
     tecs: {
        type: [String],
        required: false
     },
     location: {
        type: PointSchema,
        index: '2dsphere'
     },

});

module.exports = model('Dev', DevSchema);