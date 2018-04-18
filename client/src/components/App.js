import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";


import Header from './Header';
import Dashboard from './Dashboard';
import UserSelection from './UserSelection';
import Home from './Home';
import Skills from './SkillSelection';
import Profile from './Profile';
import Connections from './Connections';

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route path="/" render={(props) => (props.location.pathname !== "/") && <Header />} />
                        <div className="content">
                            <Route exact path='/' component={Home} />
                            <Route exact path='/select-skills' component={Skills} />
                            <Route exact path='/find-mentor' component={UserSelection} />
                            <Route exact path='/profile' component={Profile} />
                            <Route exact path='/dashboard' component={Dashboard} />
                            <Route exact path='/connections' component={Connections} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    };
};

export default App;
