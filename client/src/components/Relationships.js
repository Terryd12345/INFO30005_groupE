import React, { Component } from "react";
import ChatWindow from '../containers/Connections/ChatWindow';
import Connections from '../containers/Connections/Connections';
import Calendar from '../containers/Connections/Calendar';

class Relationships extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [
                {
                    connection: "John Doe",
                    chatID: 0,
                    messages: [
                        {
                            date: new Date(2018, 3, 1),
                            sender: "Omja Das",
                            message: "hey"
                        },
                        {
                            date: new Date(2018, 3, 2),
                            sender: "John Doe",
                            message: "how are you?"
                        },
                        {
                            date: new Date(2018, 3, 3),
                            sender: "Omja Das",
                            message: "good"
                        }
                    ]
                },
                {
                    connection: "Jane Doe",
                    chatID: 1,
                    messages: [
                        {
                            date: new Date(2018, 3, 1),
                            sender: "Jane Doe",
                            message: "Would you like to schedule a meeting?"
                        }
                    ]
                }
            ],
            chatID: 0
        }

        this.chatHandler = this.chatHandler.bind(this);
        this.messageHandler = this.messageHandler.bind(this);
    }

    chatHandler(e, newChatID) {
        e.preventDefault();
        this.setState({ chatID: newChatID });
    }

    messageHandler(e) {

    }

    render() {
        return (
            <div id="relationships">
                <div id="chat">
                    <Connections chats={this.state.chats} chatHandler={this.chatHandler}/>
                    <ChatWindow chat={this.state.chats[this.state.chatID]} />
                </div>
                <Calendar />
            </div>
        );
    }
}

export default Relationships;
