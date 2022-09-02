const {loadUsers, storeUsers } = require("../data/dbModule")
const {validationResult} = require('express-validator');

module.exports = {
    register : (req,res) => {
        return res.render('register')
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
                password : password.trim(), 
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