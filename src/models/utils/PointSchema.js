const { Schema, model } = require('mongoose');

const PointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordenadas: {
        type: [Number],
        index: '2dsphere',
        required: true
    }
})

module.exports = PointSchema;