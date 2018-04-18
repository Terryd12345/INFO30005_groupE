const chats = require("../models/chats.js")
const connections = require("../models/connections.js")
const skills = require("../models/skills.js");
const mentors = require("../models/mentors.js");

module.exports.getHome = (req, res) => {
    res.render("home");
};

module.exports.getSelectSkills = (req, res) => {
    res.render("selectSkills", {
        skills: skills
    });
};

module.exports.getFindMentor = (req, res) => {
    res.render("findMentor", {
        mentors: mentors
    });
};

module.exports.getDashboard = (req, res) => {
    res.render("dashboard");
};

module.exports.getProfile = (req, res) => {
    res.render("profile");
};

module.exports.getRelationsips = (req, res) => {
  res.render("relationships", {chats: chats, connections: connections});
}