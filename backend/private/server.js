const {app} = require("./src/init");
const application_config = require("./src/config.json").application_config

app.get("/", (req, res) => {
    res.json({message: "Serviço de inserção de BU executando"});
});

const bu_controller = require("./src/controllers/bu.controller");
app.use("/bu", bu_controller);

// set port, listen for requests
app.listen(application_config.port, () => {
    console.log(`Server is running on port ${application_config.port}.`);
});
