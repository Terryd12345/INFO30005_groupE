import React, { Component } from "react";
import Contact from "./Contact";

class Contacts extends Component {
    render() {
        return (
            <div className="section" id="contacts">
                <header className="section-title">
                    {
                        this.props.isMentor ? (
                            <h3>Mentees</h3>
                        ) : (
                            <h3>Mentors</h3>
                        )
                    }
                </header>
                
                <div id="contacts-content">
                    {
                        this.props.connections.map(user => {
                            return <Contact key={user._id}
                                            user={user} />;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Contacts;
