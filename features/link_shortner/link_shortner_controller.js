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


exports.generatedLinkList = async (req, res) => {
    const user_id = req.user.userId; 

    try {
        // Find all entries created by the user
        const links = await UrlStoreModel.find({ created_by: user_id });

        // Create an array of short links from the fetched documents
        const shortLinks = links.map(link => ({
            url: link.url,
            shortLink: `http://localhost:${port}/sl/${link.short_link}`
        }));

        return res.status(200).json({
            message: 'List of Short Links',
            data: links,
        });
    } catch (error) {
        console.error('Error while fetching links:', error);
        return res.status(500).json({ message: error.message });
    }
};



exports.updateLink = async (req, res) => {
    const user_id = req.user.userId; 
    const {link_id, new_link} = req.body; 


    try {
        // Find all entries created by the user
        const urlModel = await UrlStoreModel.findOne({ created_by: user_id, short_link: link_id });

        if(urlModel) {
            urlModel.url = new_link;

            await urlModel.save();

            return res.status(201).json({
                message: 'Short link Updated',
                data: {
                    "url": `${urlModel.url}`,
                    "shortLink": `http://localhost:${port}/sl/${urlModel.short_link}`
                }
            });
        } else {
            return res.status(404).json({
                message: 'Not found',
            });
        }s

    } catch (error) {
        console.error('Error while fetching links:', error);
        return res.status(500).json({ message: error.message });
    }
};


exports.shortLinkdelete = async (req, res) => {
    const user_id = req.user.userId; 
    const {link_id} = req.body; 
    try {
        // Find all entries created by the user
        const urlModel = await UrlStoreModel.findOne({ created_by: user_id, short_link: link_id });

        if(urlModel) {
            const deletedEntry = await UrlStoreModel.findOneAndDelete({ _id: urlModel._id });

            if (deletedEntry) {
                return res.status(200).json({ message: 'Short link deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Short link not found' });
            }
        } else {
            return res.status(404).json({
                message: 'Not found',
            });
        }s

    } catch (error) {
        console.error('Error while fetching links:', error);
        return res.status(500).json({ message: error.message });
    }
};