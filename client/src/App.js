import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		axios.get("/messages/sync").then((response) => {
			console.log(response.data);
			setMessages(response.data);
		});
	}, []);

	console.log(messages);

	useEffect(() => {
		const pusher = new Pusher("b51f7b16ce001e4f5570", {
			cluster: "eu",
		});

		const channel = pusher.subscribe("messages");
		channel.bind("inserted", (newMessage) => {
			setMessages([...messages, newMessage]);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);

	return (
		<div className="app">
			<div className="app_body">
				<Sidebar />
				<Chat messages={messages} />
			</div>
		</div>
	);
}

export default App;
