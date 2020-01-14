const Dev = require('../src/models/Dev');

module.exports = {
    async save(name, avatar_url, bio, github, tecs, location) {
        const dev = await Dev.create({
            nome: name,
            github,
            bio,
            avatar: avatar_url,
            tecs,
            location
        });
        return dev;
    },

    async devs() {
        const devs = await Dev.find();
        return devs;
    },

    async search(latitude, longitude, tecs) {
        const devs = await Dev.find({
            tecs: {
                $in: tecs
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        return devs;
    }

}