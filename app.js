const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
const { connect } = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(express.static("./public"));

const PORT = 5000;

//ルーティング設計
app.use("/api/v1/tasks", taskRoute);

//データベースと接続
const start = async () => {//start関数:非同期処理
    try {
        await connectDB(process.env.MONGO_URL);
            app.listen(PORT, console.log("サーバーが起動しました"));
    } catch (err) {
        console.log(err);
    }
};

start();

