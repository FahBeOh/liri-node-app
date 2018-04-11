require("dotenv").config();
var keys = require("./keys");
var command = process.argv[2];
var input = process.argv[3];

// Twitter
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var params = {
    screen_name: 'DukeSilver247',
    count: 20,
};
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
       return console.log("error: " + error);
    };
    if (command === "my-tweets") {
        console.log("\n" + "**DukeSilver Tweets**" + "\n");
        for (var i = 0; i < tweets.length; i++) {
            console.log(
                "-----------"
                + "\n" + tweets[i].created_at
                + "\n" + tweets[i].text
            );
        }

    }
});

// Spotify
var spotify = require('spotify');
var Spotify = require('node-spotify-api');
var spotifyKey = new Spotify(keys.spotify);

spotifyKey.search({ type: 'track', query: input }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    if (command === "spotify-this-song") {

        var artist = data.tracks.items[0].album.artists[0].name;
        var songName = data.tracks.items[0].name;
        var songUrl = data.tracks.items[0].external_urls.spotify;   
        var album = data.tracks.items[0].album.name;
        console.log(
            "\nArtist: " + artist
            + "\nSong Name: " + songName
            + "\nPreview Link: " + songUrl
            + "\nAlbum: " + album
        );

    }
  
  });

OMDB
var request = require('request');
request.get('http://www.omdbapi.com/?apikey=trilogy&t=happy+gilmore', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  newBody = JSON.parse(body);
  console.log(newBody.Title);// Print the HTML for the Google homepage.
//   console.log(response.body.Title);
});







