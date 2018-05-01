import React, { Component } from "react";
import Contact from "./Contact";

class Contacts extends Component {
    render() {
        return (
            <div className="section" id="contacts">
                <header className="section-title">
                    <h3>Contacts</h3>
                </header>
                
                <div id="contacts-content">
                    {
                        this.props.users.map(user => {
                            return <Contact firstName={user.firstName} lastName={user.lastName} imagePath={user.imagePath} />;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Contacts;
