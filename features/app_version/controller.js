// controllers/versionController.js

const Version = require('./version_model');

// Controller function for version checking
exports.checkVersion = async (req, res) => {
  try {
    const latestVersion = await Version.findOne().sort({ last_updated: -1 });

    if (!latestVersion) {
      return res.status(404).json({ message: 'No version information found.' });
    }

    const requestedVersion = req.query.app_version;
    const isForce = req.query.is_force === 'true';
    if (requestedVersion !== latestVersion.app_version) {
      return res.json({ isUpdateAvailable: true, isForce });
    } else {
      return res.json({ isUpdateAvailable: false });
    }
  } catch (error) {
    console.error('Error while checking version:', error);
    res.status(500).json({ message: error });
  }
};



// Controller function for inputting information via POST
exports.inputInfo = async (req, res) => {
  try {
    // Retrieve the data from the request body
    const inputData = req.body;

    // Check if a version document already exists
    let existingVersion = await Version.findOne();

    if (!existingVersion) {
      // If no version document exists, create a new one
      existingVersion = new Version(inputData);
    } else {
      // If a version document exists, update it with the new data
      existingVersion.app_version = inputData.version;
      existingVersion.isForce = inputData.isForce;

    }

    // Update the last_updated field with the current date
    existingVersion.last_updated = new Date();

    // Save the version document to the database
    await existingVersion.save();

    // Respond with a success message

    res.status(201).json({ message: 'Version information updated successfully' });
  } catch (error) {
    console.error('Error while updating version information:', error);
    res.status(500).json({ message: error.message});
  }
};




