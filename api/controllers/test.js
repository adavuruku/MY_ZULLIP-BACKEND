// var async = require('async');

// var calls = [];

// router.get('/', function(req, res, next) {
//     Playlist.find(function (err, playlists) {
//         if (err) return next(err);
//         /* Loop through every playlists */
//         var globalArr = [];
//         for (var increment = 0; increment < playlists.length; ++increment)
//         {
//             (function() {
//                 var i = increment;
//                 calls.push(function(callback) {
//                     globalArr[i] = [];
//                     globalArr[i]["name"] = playlists[i].name;
//                     /* Loop through every links between Songs and Playlist */
//                     PlaylistSong.find({idPlaylist: playlists[increment]._id}, function (err, songs) {
//                         if (err) return next(err);
//                         for (var songIncrement = 0; songIncrement < songs.length; ++songIncrement) {
//                         {
//                             console.log("increment"+i);
//                             globalArr[i][songIncrement] = [];
//                             /* Getting the actual song by his ID */
//                             Song.find({_id: song.idSong}, function (err, song) {
//                                 if (err) return next(err);
//                                 globalArr[i][songIncrement]["name"] = songs[songIncrement].name;
//                                 globalArr[i][songIncrement]["artist"] = songs[songIncrement].artist;
//                                 globalArr[i][songIncrement]["picture"] = songs[songIncrement].picture;
//                                 globalArr[i][songIncrement]["price"] = songs[songIncrement].price;
//                                 globalArr[i][songIncrement]["file"] = songs[songIncrement].file;
//                                 globalArr[i][songIncrement]["difficulty"] = songs[songIncrement].difficulty;
//                                 globalArr[i][songIncrement]["downloaded"] = songs[songIncrement].downloaded;
//                             });
//                         }
//                         callback();
//                     }});
//                 });
//             })();
//         }
//         async.parallel(calls, function(err, result) {
//             if (err) {
//                 // TODO: Handle error here
//             }
//             res.contentType('application/json');
//             res.send(JSON.stringify(globalArr));
//         });
//     });


//     var async = require('async'); 
//     async.series([ 
//         function (callback) { 
//             console.log('First Execute..'); 
//             callback(null, 'userPersonalData'); 
//         }, function (callback) { 
//             console.log('Second Execute.. '); 
//             callback(null, 'userDependentData'); 
//         } ], function (err, result) { 
//             console.log(result); 
//         });