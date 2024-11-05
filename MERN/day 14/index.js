const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter = require('./routers/userRouter');

const server = express();
server.use(express.json());
server.use(cors(
    {
        origin: ["http://localhost:5173", "https://www.wscubetech.com"]
    }
));

server.use("/user", UserRouter)
// server.use("/product", productRouter)
// server.use("/color", colorRouter)

mongoose.connect(
    "mongodb://localhost:27017",
    {
        dbName: "WSJP52"
    }
).then(
    () => {
        server.listen(
            5000,
            () => {
                console.log('Server start Port number 5000')
            }
        )
    }
)
    .catch(
        () => {
            console.log('DB not connected')
        }
    )



