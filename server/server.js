// Importing
const express = require("express");
const mongoose = require("mongoose");
const Messages = require("./dbMessage");
const Pusher = require("pusher");
const cors = require("cors");

// App Config
const app = express();
const PORT = process.env.PORT || 9000;

const pusher = new Pusher({
	appId: "1148261",
	key: "b51f7b16ce001e4f5570",
	secret: "8f880b22e80a2911fe97",
	cluster: "eu",
	useTLS: true,
});

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "*");
	next();
});

// Db Config
const mongoDB =
	"mongodb+srv://YassineNejmi:aallaahh@cluster0.mdh2p.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGO_URI || mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;

db.once("open", () => {
	console.log("DB connected");

	const msgCollection = db.collection("messagecontents");
	const changeStream = msgCollection.watch();

	changeStream.on("change", (change) => {
		console.log(change);

		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument;
			pusher.trigger("messages", "inserted", {
				name: messageDetails.name,
				message: messageDetails.message,
				timestamp: messageDetails.timestamp,
				received: messageDetails.received,
			});
		} else {
			console.log("Error triggering Pusher");
		}
	});
});

// Api Routes
app.get("/", (req, res) => {
	res.status(200).send("Hello World!");
});

app.get("/messages/sync", (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post("/messages/new", (req, res) => {
	const dbMessage = req.body;

	Messages.create(dbMessage, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

// Listen
app.listen(PORT, () => {
	console.log(`Listening on localhost:${PORT}`);
});
