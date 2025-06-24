const Profile = require('../models/profile');

exports.login = async(req, res) => {
    console.log(req.body);
    const profile = new Profile(req.body);
    try{
        const user = await profile.save()
    
    return res.status(200).json(user);
    }catch(err){
        return res.status(500).json({error: "Failure"})
    }

}