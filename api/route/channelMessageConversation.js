const express = require('express');
const router = express.Router();

const checkAuth = require ('../middleware/check-auth');
const channelMessageConversationControllers = require('../controllers/channelMessageConversation');

//all users
router.post('/create',checkAuth, channelMessageConversationControllers.add_message);
router.patch('/react/:conversationid',checkAuth, channelMessageConversationControllers.channel_add_reaction_to_conversation_message);
router.get('/:messageid',checkAuth, channelMessageConversationControllers.users_view_conversation_message);
router.delete('/:conversationid',checkAuth, channelMessageConversationControllers.delete_conversation);
// router.get('/:channelid',checkAuth,channelListControllers.find_channel)
// router.get('/users/:userid',checkAuth,channelListControllers.find_all_user_channel)
// router.get('/',checkAuth, channelListControllers.list_all_channel);
// router.delete('/:channelid',checkAuth, channelListControllers.delete_channel);
// router.patch('/:channelid',checkAuth, channelListControllers.update_channel);

//export the servlet to the server
module.exports = router;