import mongoose from "mongoose";

const Chat = mongoose.model("chat");
const Event = mongoose.model("event");
const Skill = mongoose.model("skill");
const User = mongoose.model("user");

export default {
    loggingIn: function (req, res) {
        User.findById(req.user._id)
            .exec((err, user) => {
                if (!err) {
                    if (req.user.skills.length > 0) {
                        res.redirect("/dashboard");
                    } else {
                        res.redirect("/welcome");
                    }
                }
            });
    },

    getCurrentUser: function (req, res) {
        User.findById(req.user._id)
            .populate("skills")
            .populate("learnedSkills")
            .populate({ path: "connections", populate: { path: "skills" } })
            .exec((err, user) => {
                if (!err) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    getUser: function (req, res) {
        let userID = req.params.id;
        User.findById(userID)
            .populate("skills")
            .populate("connections")
            .exec((err, user) => {
                if (!err) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    editUser: function (req, res) {
        User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $set: {
                    birthDate: req.body.birthDate,
                    gender: req.body.gender,
                    location: req.body.location,
                    isMentor: req.body.isMentor,
                    description: req.body.description
                }
            },
            (err) => {
                if (!err) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    createUser: function (req, res) {
        User.create(new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            location: req.body.location,
            isMentor: req.body.isMentor,
            description: req.body.description,
            skills: req.body.skills,
            learnedSkills: req.body.learnedSkills,
            connections: req.body.connections,
            imagePath: req.body.imagePath
        }, (err) => {
            if (err) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
            res.flush();
        }));
    },

    /* ============================================================================================================= */

    allSkills: function (req, res) {
        Skill.find({}, (err, skills) => {
            if (!err) {
                res.send(skills);
            } else {
                res.sendStatus(404);
            }
            res.flush();
        });
    },

    mentorsBySkills: function (req, res) {
        User.find({ $and: [{ isMentor: true }, { skills: { $in: req.body.skills } }, { $nin: {connections: req.user.connections}}] })
            .populate("skills")
            .populate("connections")
            .exec((err, user) => {
                if (!err) {
                    res.send(user);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    addSkills: function (req, res) {
        User.findById(req.user._id)
            .exec((err, user) => {
                if (!err) {
                    req.body.skills.forEach(skill => {
                        user.skills.push(skill);
                        user.save(user);
                    });
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    removeSkills: function (req, res) {
        User.findById(req.user._id)
            .exec((err, user) => {
                if (!err) {
                    req.body.skills.forEach(skill => {
                        user.skills.pull(skill);
                        user.save(user);
                    });
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    createSkill: function (req, res) {
        Skill.create(new Skill({
            skill: req.body.skill,
            imagePath: req.body.imagePath
        }), (err) => {
            if (err) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
            res.flush();
        });
    },

    /* ============================================================================================================= */

    addLearned: function (req, res) {
        User.findById(req.user._id)
            .exec((err, user) => {
                if (!err) {
                    req.body.skills.forEach(skill => {
                        user.learnedSkills.push(skill);
                        user.save(user);
                    });
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    removeLearned: function (req, res) {
        User.findById(req.user._id)
            .exec((err, user) => {
                if (!err) {
                    req.body.skills.forEach(skill => {
                        user.learnedSkills.pull(skill);
                        user.save(user);
                    });
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    /* ============================================================================================================= */

    addConnections: function (req, res) {
        User.findById(req.user._id)
            .exec((err, user) => {
                if (!err) {
                    req.body.connections.forEach(connection => {
                        user.connections.push(connection);
                        user.save(user);
                    });
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
                res.flush();
            });
    },

    /* ============================================================================================================= */

    createEvent: function (req, res) {
        Event.create(new Event({
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            user1: req.user._id,
            user2: req.body.user2
        }, (err) => {
            if (err) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
            res.flush();
        }));
    },

    allEvents: function (req, res) {
        Event.find({}, (err, events) => {
            if (!err) {
                res.send(events);
            } else {
                res.sendStatus(404);
            }
            res.flush();
        });
    },


    /* ============================================================================================================= */

    getChat: function (req, res) {
        let user1ID = req.user._id;
        let user2ID = req.params.id;
        Chat.findOne({ $or: [{ user1: user1ID, user2: user2ID }, { user1: user2ID, user2: user1ID }] }, (err, chat) => {
            if (!err) {
                res.send(chat);
            } else {
                let newChat = new Chat({
                    user1: user1ID,
                    user2: user2ID,
                });
                newChat.save((err) => {
                    if (err) {
                        res.sendStatus(500);
                    }
                });
                res.send(newChat);
            }
            res.flush();
        });
    },

    postMessage: function (req, res) {
        let user1ID = req.user._id;
        let user2ID = req.params.id;
        Chat.findOne({ $or: [{ user1: user1ID, user2: user2ID }, { user1: user2ID, user2: user1ID }] }, (err, chat) => {
            if (!err) {
                chat.messages.push({
                    date: req.body.date,
                    sender: req.body.sender,
                    message: req.body.message
                });
                chat.save(done);
            } else {
                res.sendStatus(404);
            }
            res.flush();
        });
    }
}
