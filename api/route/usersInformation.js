const express = require('express');
const router = express.Router();

const checkAuth = require ('../middleware/check-auth');
const UsersControllers = require('../controllers/usersInformation');

//all users
router.patch('/update',checkAuth, UsersControllers.users_update_information);
//user login
router.post('/login',UsersControllers.users_user_login)
//user sign up
router.post('/signup',UsersControllers.users_create_signup);
//get a user information
router.get('/:userid',checkAuth,UsersControllers.get_a_user_information);
router.patch('/updatepics',checkAuth,UsersControllers.users_update_profileImage_information);

router.get('/search/:username',checkAuth,UsersControllers.get_a_list_of_users_information);

// router.post('/pics',UsersControllers.fileLoad);
//remove a user
// router.delete('/:email',checkAuth, UsersControllers.users_delete_usre);

//export the servlet to the server
module.exports = router;