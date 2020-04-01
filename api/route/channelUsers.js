const express = require('express');
const router = express.Router();

const checkAuth = require ('../middleware/check-auth');
const channelUsersControllers = require('../controllers/channelUsers');

//add users to channel 
router.post('/:channelid',checkAuth, channelUsersControllers.add_user_to_channel);
router.delete('/:channelid',checkAuth, channelUsersControllers.delete_user_channel);
router.get('/:channelid',checkAuth, channelUsersControllers.list_all_channel_Users);
router.get('/',checkAuth, channelUsersControllers.get_all_user_channel);

//export the servlet to the server
module.exports = router;