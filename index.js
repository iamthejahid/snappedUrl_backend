const express = require('express');
const { connectDB } = require('./config/database');
const { clientError, serverError } = require('./controller/error');
require('dotenv').config();


const app = express();
const log = console.log;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Define the route for version checking
const versionRoutes = require('./features/app_version/version_routes.js'); // Adjust the path as needed
const registerRoutes
    = require('./features/registration/registration_routes.js');
const loginRoutes
    = require('./features/login/login_routes.js');
const linkShortenRoutes
    = require('./features/link_shortner/link_shortner_routes.js');


// ROUTE USES    
app.use('/api', versionRoutes);
app.use('/api', registerRoutes);
app.use('/api', loginRoutes);
app.use('/api', linkShortenRoutes);
app.use('/sl', linkShortenRoutes);








app.get('/', (req, res) => {
    res.status(200).send("Snapped URL API.");
});





app.use(clientError);
app.use(serverError);

app.listen(port, async () => {
    // log(`server is running at http://localhost:${port}`);
    log(`server is running`);

    await connectDB();
});
