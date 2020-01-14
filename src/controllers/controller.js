const service = require('../service');
const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async store(req,res) {
        try {
            const { github , tecs, latitude, longitude } = req.body;
            const dev = await Dev.findOne({github});
            if (!dev) {
                const apiData = await axios.get(`https://api.github.com/users/${github}`);
                const { name = login, avatar_url, bio , html_url} = apiData.data;
                const tecsArray = parseStringAsArray(tecs);
                const location = {type: 'Point', coordenadas: [longitude, latitude]}
                return res.json(await service.save(name, avatar_url, bio, github, tecsArray, location))
            } else {
                return res.send('Usuario ja cadastrado');
            }
            
        } catch (error) {
            return res.status(400).json({error:error.message});
        }
    },

    async index(req,res) {
        try {
            return res.json(await service.devs());
        } catch (error) {
            return res.status(500).json({error:error.message});
        }
    },

    async search(req, res) {
        try {
            const {latitude, longitude, tecs} = req.query;
            const tecsArray = parseStringAsArray(tecs);
            console.log(tecsArray);
            return res.status(200).json(await service.search(latitude, longitude, tecsArray));
        } catch (error) {
            return res.json({error:error.mesage});
        }
    }
}