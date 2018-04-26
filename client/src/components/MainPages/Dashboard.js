import React, { Component } from "react";
import Notifications from "../Dashboard/Notifications/Notifications";
import Awards from "../Dashboard/Awards/Awards";
import Stats from "../Dashboard/Stats";
import Contacts from "../Dashboard/Contacts/Contacts";
import Events from "../Dashboard/Events/Events";
import Recommendations from "../Dashboard/Recommendations";

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <div className="personal-profile">
                    <div className="personal-pic">
                        <img src={require("../../images/user.png")} alt="Profile" />
                        <br />
                        <a className="button button-pink" id="personal-btn-1" href="#">
                            Change Picture
                        </a>
                        <br />
                        <a className="button button-pink" id="personal-btn-2" href="#">
                            Edit Info
                        </a>
                    </div>
                    <div className="section-title">
                        <h1>Good afternoon, John!</h1>
                    </div>
                    <Stats />
                    <Awards />
                </div>

                <div className="section" id="notifications">
                    <div className="section-title">
                        <h1>Notifications</h1>
                    </div>
                    <Notifications />
                </div>

                <div className="section" id="contacts">
                    <div className="section-title">
                        <h1>Contacts</h1>
                    </div>
                    <Contacts />
                </div>

                <div className="section" id="events">
                    <div className="section-title">
                        <h1>Events</h1>
                    </div>
                    <Events />
                </div>

                <div className="section" id="recommendations">
                    <div className="section-title">
                        <h1>Recommended for You</h1>
                    </div>
                    <Recommendations />
                    <a className="button" id="recommendations-btn" href="#">
                        Find Mentor
                    </a>
                </div>
            </div>
        );
    }
}

export default Dashboard;
