import React from "react";
import SidebarChat from "../SidebarChat/SidebarChat";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar_header">
				<Avatar src="" />
				<div className="sidebar_headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className="sidebar_search">
				<div className="sidebar_searchContainer">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<input type="text" placeholder="Search or start new chat" />
				</div>
			</div>

			<div className="sidebar_chats">
				<SidebarChat />
				<SidebarChat />
				<SidebarChat />
			</div>
		</div>
	);
};

export default Sidebar;
