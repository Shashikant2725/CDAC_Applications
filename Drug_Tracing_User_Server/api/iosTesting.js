var express = require('express');
let User = require('../models/user');
let IosTesting= require('../models/iosTesting');
const userRoutes = express.Router();

// Get all users
global.userReg='';
userRoutes.route('/iosUsers/showall').get(function (req, res) {
    IosTesting.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//Get all vendors
userRoutes.route('/iosUsers/showall').get(function (req, res) {
    User.find({ "type": "Vendor" }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Get the names and IDs of all users
userRoutes.route('/user/getnames').get(function (req, res) {
    User.find({}, { username: 1 }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// Add a new user
userRoutes.route('/iosUser/addUsers').post(function (req, res) {
    userReg = new IosTesting(req.body);
    console.log(userReg)
    userReg.save().then(userReg => { res.status(200).json({ 'Status': 'Successful',userReg}) }).catch(err => { res.status(400).json({ 'Status': err }); console.log(err) });
});

// get username by id
userRoutes.route('/user/name/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user.username);
    });
});

// Get a user by id
userRoutes.route('/user/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            res.json("")
        } else {
            res.json(user);
        }
    });
});

// login given username and password
userRoutes.route('/user/login').post(function (req, res) {
    let name = req.body.username
    let pass = req.body.password
    console.log("name", name)
    console.log("password",pass);
    User.find({ "username": name, "password": pass }, function (err, users) {
        if (users != undefined) {
            if (err) {
                res.status(200).json(0)
            } else {
                let current_user = users[0]
                if (current_user != undefined) {
                    res.status(200).json(current_user._id);
                }
                else {
                    res.status(200).json(0)
                }
            }
        }
        else {
            res.status(200).json(0)
        }
    });
});

// get the user type given id
userRoutes.route('/user/get_type/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            res.json("")
        } else {
            res.json(user.type);
        }
    });

});


// delete the user by id
userRoutes.delete('/iosUsers/:postId', function (req, res) {
    IosTesting.findByIdAndRemove(req.params.postId, function (err, user) {
        if (err) {
            res.status(500).send("There was a problem deleting the user.")
        }
        else {
            res.status(200).send("Product: " + user.author + " was deleted.")
        }
    })
})

//Update Users

userRoutes.route('/updateIosUsers/:postId').put((req, res) => {
    IosTesting.findById(req.params.postId, (err, user) => {
        console.log(req.body)
        if (err) {
            console.log(err);
        }
        else {
            user.author=req.body.author;
            user.title=req.body.title;
            user.save()
            res.json("SUCCESS")
        }
    })
})

module.exports = userRoutes;