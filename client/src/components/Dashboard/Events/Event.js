import React, { Component } from "react";
import { BeatLoader } from "react-spinners";
import { Modal } from "react-bootstrap";
import axios from "axios";
import EventPopup from "./EventPopup";

class Event extends Component {
    constructor(props) {
        super(props);
    
        this.getDay = this.getDay.bind(this);
        this.getDate = this.getDate.bind(this);
        this.getStartTime = this.getStartTime.bind(this);
        this.getEndTime = this.getEndTime.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            loading: true,
            firstName: "",
            lastName: "",
            imagePath: "",
            temperature: "",
            weatherCondition: "",
            weatherIcon: "",
            show: false
        };
    }

    componentDidMount() {
        const self = this;

        axios.post("/api/getUserById", {
            id: (this.props.currentUser._id.localeCompare(self.props.user1) === 0) ? self.props.user2 : self.props.user1
        })
            .then(function (res) {
                self.setState({
                    loading: false,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    imagePath: res.data.imagePath,
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get(`api/weather/${this.props.location}`)
            .then((res) => {
                // Display weather picture
                const celsius = `${Math.round(res.data.main.temp - 273).toString()}`;
                let icon = "";
                if(celsius > 30){
                    icon = <img src={require("../../../images/icons/sun.png")} alt="Icon" />
                } else if(celsius > 20){
                    icon = <img src={require("../../../images/icons/cloud.png")} alt="Icon" />
                } else {
                    icon = <img src={require("../../../images/icons/windy.png")} alt="Icon" />
                }
                self.setState({
                    temperature: celsius,
                    weatherCondition: res.data.weather[0].main,
                    weatherIcon: icon
                });
            })
            .catch((error) => {
                console.log(error);
                let icon = <img src={require("../../../images/icons/error.png")} alt="Icon" />;
                self.setState({
                    temperature: "",
                    weatherCondition: "",
                    weatherIcon: icon
                });
            });
    }
    
    getDay() {
        let datetime = new Date(this.props.startDate);
        return datetime.toLocaleString("en-US", { weekday: "long" });
    }

    getDate() {
        let datetime = new Date(this.props.startDate);
        return datetime.toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" });
    }

    getStartTime() {
        let datetime = new Date(this.props.startDate);
        return datetime.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    }

    getEndTime() {
        let datetime = new Date(this.props.endDate);
        return datetime.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    }

    handleShow() {
        this.setState({
            show: true
        })
    }

    handleClose() {
        this.setState({
            show: false
        });
    }

    render() {
        const day = this.getDay();
        const date = this.getDate();
        const startTime = this.getStartTime();
        const endTime = this.getEndTime();

        return (
            <div>
                <div onClick={this.handleShow}>
                    {
                        this.state.loading ? (
                            <div className="section-loading">
                                <BeatLoader loading={this.state.loading} />
                            </div>
                        ) : (
                            <div className="event-panel">
                                <div className="event-pic">
                                    <img src={this.state.imagePath} alt={this.state.firstName} />
                                </div>

                                <div className="event-desc">
                                    <div className="event-desc-title">
                                        <h5>{this.props.title}</h5>
                                        <h6>(with {this.state.firstName} {this.state.lastName})</h6>
                                    </div>

                                    <div className="event-desc-detail">
                                        <h6>Date:</h6>
                                        <h6>Time:</h6>
                                        <h6>Location:</h6>
                                    </div>

                                    <div className="event-desc-content">
                                        <h6>{date}</h6>
                                        <h6>{startTime} - {endTime}</h6>
                                        <h6>{this.props.location}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
                    <EventPopup
                        title={this.props.title}
                        currentUser={this.props.currentUser}
                        imagePath={this.state.imagePath}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        day={day}
                        date={date}
                        startTime={startTime}
                        endTime={endTime}
                        location={this.props.location}
                        weatherIcon={this.state.weatherIcon}
                        weatherCondition={this.state.weatherCondition}
                        temperature={this.state.temperature}
                        description={this.props.description}
                    />
                </Modal>
            </div>
        )
    }
}

export default Event;
