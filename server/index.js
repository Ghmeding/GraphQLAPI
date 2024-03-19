const express = require("express");
const app = express();
const PORT = 6969;
const userData = require("./MOCK_DATA.json");
const { graphqlHTTP } = require("express-graphql");
const schema = require('./Schemas/index.js');

const cors = require('cors');

// Enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// Handle preflight requests explicitly
app.options('/graphql', cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT,() => {
    console.log("Server running!");
});
