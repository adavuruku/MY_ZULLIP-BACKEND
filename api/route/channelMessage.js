const express = require('express');
const router = express.Router();

const checkAuth = require ('../middleware/check-auth');
const channelMessageControllers = require('../controllers/channelMessage');

//all users
router.post('/create',checkAuth, channelMessageControllers.users_add_message);
router.get('/:channelid',checkAuth, channelMessageControllers.users_view_channel_message);
router.patch('/:messageid',checkAuth, channelMessageControllers.channel_message_to_conversation);
router.patch('/react/:messageid',checkAuth, channelMessageControllers.channel_add_reaction_to_channel_message);
// router.get('/:channelid',checkAuth,channelListControllers.find_channel)
// router.get('/users/:userid',checkAuth,channelListControllers.find_all_user_channel)
// router.get('/',checkAuth, channelListControllers.list_all_channel);
// router.delete('/:channelid',checkAuth, channelListControllers.delete_channel);
// router.patch('/:channelid',checkAuth, channelListControllers.update_channel);

//export the servlet to the server
module.exports = router;