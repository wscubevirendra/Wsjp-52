const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors')
const CategoryRouter = require('./routers/CategoryRouter')
const ColorRouter = require('./routers/ColorRouter')
const server = express();
server.use(express.static("public"));

server.use(express.json());
server.use(cors(
    {
        origin: ["http://localhost:5173"]
    }
))

server.use("/category", CategoryRouter);
server.use("/color", ColorRouter);



mongoose.connect("mongodb://localhost:27017/", {
    dbName: "ishop"
}
).then(
    () => {

        server.listen(
            '5000',
            () => {
                console.log('server start ')
            }
        )
    }
)
    .catch(() => {
        console.log('DB not connected')
    })
