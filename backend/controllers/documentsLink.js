const DocsLinkData = require("../models/DocsLinkSchema");

const postDocsLinks = async(req, res) => {
    try {
        console.log(req.body);
        const { user_id } = req.body;
        console.log(user_id);
        const aadharImage = req.files['aadhar'] ? req.files['aadhar'][0] : null;
        const panImage = req.files['pan'] ? req.files['pan'][0] : null;
        const profileImage = req.files['profile'] ? req.files['profile'][0] : null;

        console.log('User ID:', user_id);
        console.log('Aadhar Image:', aadharImage ? aadharImage : 'Not provided');
        console.log('Pan Image:', panImage ? panImage : 'Not provided');
        console.log('Profile Image:', profileImage ? profileImage : 'Not provided');

        const aadharResult = aadharImage ? await cloudinary.uploader.upload(aadharImage.path) : null;
        const panResult = panImage ? await cloudinary.uploader.upload(panImage.path) : null;
        const profileResult = profileImage ? await cloudinary.uploader.upload(profileImage.path) : null;

        console.log('Aadhar Upload Result:', aadharResult);
        console.log('Pan Upload Result:', panResult);
        console.log('Profile Upload Result:', profileResult);

        const newDocsLinkData = new DocsLinkData({
            user_id,
            aadharLink: aadharResult ? { public_id: aadharResult.public_id, url: aadharResult.secure_url } : null,
            panLink: panResult ? { public_id: panResult.public_id, url: panResult.secure_url } : null,
            profileLink: profileResult ? { public_id: profileResult.public_id, url: profileResult.secure_url } : null
        });

        await newDocsLinkData.save();

        console.log('Saved Docs Link Data:', newDocsLinkData);

        res.status(200).send(newDocsLinkData);
    } catch(err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

module.exports = {
    postDocsLinks
};