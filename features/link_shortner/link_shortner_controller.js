const UrlStoreModel = require('./link_shortner_model');
const port = process.env.PORT


exports.shortLinkCreate = async (req, res) => {

    const user_id = req.user.userId;
    try {
        const {
            url
        } = req.body;

        const count = await UrlStoreModel.countDocuments();




        let urlStoreModel = new UrlStoreModel({
            created_by: user_id,
            url: url,
            short_link: count + 1,
        });

        console.log(user_id);

        await urlStoreModel.save();

        res.status(201).json({
            message: 'Short link Created',
            data: {
                "url": url,
                "shortLink": `http://localhost:${port}/${urlStoreModel.short_link}`
            }
        });



    } catch (error) {
        console.error('Error while checking version:', error);
        res.status(500).json({ message: error.message });
    }
};
