import React, { Component } from "react";
import User from "./User";

class UserSelection extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            fromDashboard: false
        };
    }
    
    render() {
        return (
            <div className="page-wrap">
                <div className="wrapper">
                    <header className="header">
                        <h2>We found {this.props.allUsers.length} mentors for you!</h2>
                        <h5>The first one to confirm your request will be paired up with you.</h5>
                    </header>
    
                    <div id="user-selection">
                        {
                            console.log(this.props.allUsers)
                        }
                        {
                            this.props.allUsers.map(user => {
                                return <User key={user._id} user={user}
                                             updateSelectedUsers={this.props.updateSelectedUsers}
                                             isSelected={this.props.selectedUsers.indexOf(user._id) > -1}/>;
                            })
                        }
                    </div>
                    
                    {
                        this.state.fromDashboard ? (
                            <a className="button" id="user-selection-btn" href="/dashboard">
                                Confirm
                            </a>
                        ) : (null)
                    }
                </div>
            </div>
        );
    }
}

export default UserSelection;
