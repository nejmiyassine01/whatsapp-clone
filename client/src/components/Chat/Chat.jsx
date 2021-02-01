import React, { useState } from "react";
import "./Chat.css";
import SearchOutlined from "@material-ui/icons/Search";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "../../axios";

import { Avatar, IconButton } from "@material-ui/core";

const Chat = ({ messages }) => {
	const [input, setInput] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();

		await axios.post("/messages/new", {
			message: input,
			name: "DEMO APP",
			timestamp: "Just now!",
			received: false,
		});

		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat_header">
				<Avatar />

				<div className="chat_headerInfo">
					<h3>Room name</h3>
					<p>Last seen at ...</p>
				</div>

				<div className="chat_headerRight">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className="chat_body">
				{messages.map((message, index) => (
					<p
						className={`chat_message ${message.received && "chat_receiver"}`}
						key={index}
					>
						<span className="chat_name">{message.name}</span>
						{message.message}
						<span className="chat_timestamp">{message.timestamp}</span>
					</p>
				))}
			</div>

			<div className="chat_footer">
				<IconButton>
					<InsertEmoticonIcon />
				</IconButton>
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type="text"
						placeholder="Type a message"
					/>
					<button type="submit" onClick={sendMessage}>
						Send a message
					</button>
				</form>
				<IconButton>
					<MicIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default Chat;
