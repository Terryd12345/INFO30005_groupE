import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import PersonalProfile from "../Dashboard/PersonalProfile/PersonalProfile";
import Popups from "../Dashboard/Popups/Popups";
import Notifications from "../Dashboard/Notifications/Notifications";
import Contacts from "../Dashboard/Contacts/Contacts";
import Events from "../Dashboard/Events/Events";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: {},
    
            redirectToHome: false,
            redirectToWelcome: false,
            redirectToGetStarted: false,

            allSkills: [],
            learnedSkills: [],
            selectedSkills: [],

            notifications: [
                {
                    _id: "1",
                    notification: "Jon sent you a message.",
                    time: "Just Now",
                    imagePath: "user"
                },
                {
                    _id: "2",
                    notification: "Jane sent you a message.",
                    time: "1hr ago",
                    imagePath: "user"
                },
                {
                    _id: "3",
                    notification: "Fred sent you a message.",
                    time: "2hr ago",
                    imagePath: "user"
                }
            ],

            connections: [],

            events: [
                {
                    _id: "1",
                    date: "1 January 2019",
                    time: "12 - 2 PM",
                    location: "Melbourne Central",
                    imagePath: "user"
                },
                {
                    _id: "2",
                    date: "8 January 2019",
                    time: "1 - 3 PM",
                    location: "Victoria Market",
                    imagePath: "user"
                },
                {
                    _id: "3",
                    date: "15 January 2019",
                    time: "12 - 2 PM",
                    location: "Melbourne Central",
                    imagePath: "user"
                }
            ]
        };
    }

    componentDidMount() {
        const self = this;

        axios.get("/api/user")
            .then(function (res) {
                if (res.data.description) {
                    if (res.data.skills.length > 0) {
                        self.setState({
                            loading: false,
                            user: res.data,
                            allSkills: res.data.skills,
                            learnedSkills: res.data.learnedSkills,
                            connections: res.data.connections
                        });
                    } else {
                        self.setState({
                            redirectToGetStarted: true
                        });
                    }
                } else {
                    self.setState({
                        redirectToWelcome: true
                    });
                }
            })
            .catch(function (error) {
                self.setState({
                    redirectToHome: true
                });
                console.log(error);
            });
    }

    /* ============================================================================================================= */

    render() {
        return (
            <div id="page-wrap">
                {
                    this.state.loading ? (
                        <div id="loading">
                            <MoonLoader loading={this.state.loading} />
        
                            {
                                this.state.redirectToHome ? (<Redirect to="/" />) : (null)
                            }
        
                            {
                                this.state.redirectToWelcome ? (<Redirect to="/welcome" />) : (null)
                            }
        
                            {
                                this.state.redirectToGetStarted ? (<Redirect to="/get-started" />) : (null)
                            }
                        </div>
                    ) : (
                        <div id="dashboard">
                            <PersonalProfile user={this.state.user}
                                             connections={this.state.connections}
                                             allSkills={this.state.allSkills}
                                             learnedSkills={this.state.learnedSkills} />
                            <Popups />
                            <Notifications notifications={this.state.notifications} />
                            <Contacts connections={this.state.connections} />
                            <Events events={this.state.events} />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Dashboard;
