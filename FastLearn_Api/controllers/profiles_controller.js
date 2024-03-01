const ProfileModel = require('../models/schemas/schemasDB').profile;
const ProfileEntityModel = require('../models/schemas/schemasDB').profileEntity;

module.exports = {
    create: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let newProfile;
            const userProfile = await ProfileModel.findOne({user_id: req.user._id});
            if(userProfile)
                return res.status(404).send({error: 'The profile was created'});
            const { name, lastname, profession, bio, image, url_page,
                url_blog, url_linkedin, url_twitter } = req.body;
                newProfile = new ProfileModel(
                    {
                        user_id: req.user._id,
                        name: name,
                        lastname: lastname,
                        profession: profession,
                        bio: bio,
                        image: image,
                        url_page: url_page,
                        url_blog: url_blog,
                        url_linkedin: url_linkedin,
                        url_twitter: url_twitter
                    }
                );
                await newProfile.save();
            return res.status(200).send({success: 'Profile Created'});
        } catch (error) {
            return res.status(500).send({error: 'unexpected error'});
        }
    },
    update: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        try {
            let update;
            const filter = { user_id: req.user._id };
            const { name, lastname, profession, bio, image, url_page,
                url_blog, url_linkedin, url_twitter } = req.body;
                const userProfile = await ProfileModel.findOne(filter);
                if(!userProfile)
                    return res.status(404).send({error: 'Profile does not exist'});
                update = {
                    name: name, 
                    lastname: lastname, 
                    profession: profession, 
                    bio: bio,
                    image: image,
                    url_page: url_page,
                    url_blog: url_blog,
                    url_linkedin: url_linkedin,
                    url_twitter: url_twitter
                }
                await ProfileModel.findOneAndUpdate(filter, update);
            return res.status(200).send({success: 'Profile updated'});
        } catch (error) {
            return res.status(401).send({error: 'unexpected error'});
        }
    },
    get: async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin','*');
        let profiles;
        profiles = await ProfileModel.findOne({user_id: req.user._id});
        if(!profiles)
            return res.status(404).send({ error: 'Profile does not exist' });
        return res.status(200).send({ success: userProfile });
    }
};