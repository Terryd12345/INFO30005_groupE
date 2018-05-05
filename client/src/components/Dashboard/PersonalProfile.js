import React, { Component } from "react";
import Awards from "../Dashboard/Awards/Awards";
import Stats from "../Dashboard/Stats";

class PersonalProfile extends Component {
    render() {
        return (
            <div id="personal-profile">
                <div id="personal-pic">
                    <img src={this.props.user.imagePath} alt={this.props.user.firstName} />
                    <br />
                    <a className="button" id="personal-btn-1" href="">
                        Change Picture
                    </a>
                    <br />
                    <a className="button" id="personal-btn-2" href="">
                        Edit Info
                    </a>
                </div>

                <header className="section-title">
                    <h3>Good afternoon, {this.props.user.firstName}!</h3>
                </header>

                <Stats />
                <Awards awards={this.props.awards} />
            </div>
        );
    }
}

export default PersonalProfile;
