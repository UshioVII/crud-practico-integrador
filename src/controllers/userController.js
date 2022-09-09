const {loadUsers, storeUsers } = require("../data/dbModule")
const {validationResult} = require('express-validator');
let bcrypt = require('bcryptjs');
const session = require('express-session');

module.exports = {

    register : (req,res) => {
        return res.render('register')
    },

    login : (req,res) => {
        return res.render('login')
    },

    processLogin : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){

            let {id, email, password,} = loadUsers().find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                email,
                password
            }

            if(req.body.remember){
                res.cookie('crud',req.session.userLogin,{
                    maxAge : 1000 * 60
                })
            }

            return res.redirect('/')
        }else {
            return res.render('login',{
                errors : errors.mapped()
            })
        }
    },

    processRegister : (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            const {firstname, lastname, email, password} = req.body;
            const users = loadUsers();

        const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                firstname : firstname.trim(),
                lastname : lastname.trim(),
                email : email.trim(),
                password : bcrypt.hashSync(password.trim(), 10),
            }
    
        const usersModify = [...users, newUser];
    
        storeUsers(usersModify);
            return res.redirect('/')
        }else {
            return res.render('register', {
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
}