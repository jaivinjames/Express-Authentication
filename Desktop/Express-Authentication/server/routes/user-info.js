let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Connect to Users-info model
let User = require('../models/users-info');

// Get Route for User list page - Read Operation
router.get('/', (req, res, next) => {
    User.find((err, UsersList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(UsersList);

            res.render('users-info/list', {title: 'Users', UsersList: UsersList});
        }
    });
});

// Get Route for displaying Add Page - Create Operation
router.get('/add', (req, res, next) => {
    res.render('users-info/add', {title: 'Add User'});
});

// Post Route for displaying Add Page - Operation
router.post('/add', (req, res, next) => {
    let newUser = User({
        "name": req.body.username,
        "password": req.body.password,
        "email": req.body.email
    });

    User.create(newUser, (err, User) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh User list
            res.redirect('/users-list')
        }
    })
});

// Get Route for displaying Edit Page - Update Operation
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, userToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Show edit view
            res.render('/users-info/edit', {title: 'Edit User', user: userToEdit});
        }
    });
});

// Post Route for displaying Edit Page - Update Operation
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updateUser = User({
        "_id" : id,
        "name": req.body.username,
        "password": req.body.password,
        "email": req.body.email
    });

    User.updateOne({_id: id}, updateUser, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh the User list
            res.render('/users-list');
        }
    });
});

// Get Route for User deletion - Delete Operation
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    User.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // Refresh the User list
            res.render('/users-list');
        }
    });
});

module.exports = router;