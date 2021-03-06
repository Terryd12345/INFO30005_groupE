import React, { Component } from "react";
import Profile from "./Profile";

class Contact extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
    }

    handleShow() {
        this.profile.handleShow();
    }

    render() {
        const connection = "/connections?userID=" + this.props.user._id;

        return (
            <div>
                <div className="contact-panel">
                    <div className="contact-pic centered">
                        <img
                            src={this.props.user.imagePath}
                            alt={this.props.user.firstName} />
                    </div>

                    <div className="contact-desc centered">
                        {this.props.user.firstName} {this.props.user.lastName}

                        <Profile
                            user={this.props.user}
                            ref={profile => this.profile = profile}
                            isMentor={this.props.isMentor} />

                        <h6>
                            <a onClick={this.handleShow} className="button" id="contact-btn-1">
                                Profile
                            </a>

                            <span className="contact-br">
                                <br />
                            </span>

                            <a href={connection} className="button" id="contact-btn-2">
                                Message
                            </a>
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
