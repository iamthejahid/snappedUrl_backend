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

        await urlStoreModel.save();

        return res.status(201).json({
            message: 'Short link Created',
            data: {
                "url": url,
                "shortLink": `http://localhost:${port}/sl/${urlStoreModel.short_link}`
            }
        });



    } catch (error) {
        console.error('Error while checking version:', error);
        return res.status(500).json({ message: error.message });
    }
};


exports.shortLinkFiring = async (req, res) => {

    const { shortLinkId } = req.params;

    try {

        let urlStoreModel = await UrlStoreModel.findOne({
            short_link: shortLinkId
        });

        if (urlStoreModel) {
            try {
                urlStoreModel.total_visit = urlStoreModel.total_visit + 1;
                urlStoreModel.last_visited_at = Date.now();
                await urlStoreModel.save();
            } catch (e) {
                console.log(e);
            }
            return res.redirect(urlStoreModel.url);
        } else {
            console.log("Not found");
            return res.status(404).json({ message: "Not Found" });
        }

    } catch (error) {
        console.error('Error while checking version:', error);
        return res.status(500).json({ message: error.message });
    }
};

