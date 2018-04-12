// Requires and global variables
require("dotenv").config();
var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var command = process.argv[2];
var input = process.argv[3]

// Twitter Function
function tweety() {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: 'DukeSilver247',
        count: 20,
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            return console.log("error: " + error);
        };
        console.log("\n" + "**DukeSilver Tweets**" + "\n");
        for (var i = 0; i < tweets.length; i++) {
            console.log(
                "-----------"
                + "\n" + tweets[i].created_at
                + "\n" + tweets[i].text
                +"\n"
            );
        }
    });
}


// Spotify Functions
function spoty() {
    var spotifyKey = new Spotify(keys.spotify);
    spotifyKey.search({ type: 'track', query: input.split("-").join(" ") }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artist = data.tracks.items[0].album.artists[0].name;
        var songName = data.tracks.items[0].name;
        var songUrl = data.tracks.items[0].external_urls.spotify;
        var album = data.tracks.items[0].album.name;
        console.log(
            "\nArtist: " + artist
            + "\nSong Name: " + songName
            + "\nPreview Link: " + songUrl
            + "\nAlbum: " + album
            +"\n"
        );
    });
}

function spotyDefault() {
    var spotifyKey = new Spotify(keys.spotify);
    spotifyKey.search({ type: 'track', query: 'The Sign' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var artist = data.tracks.items[5].album.artists[0].name;
        var songName = data.tracks.items[5].name;
        var songUrl = data.tracks.items[5].external_urls.spotify;
        var album = data.tracks.items[5].album.name;
        console.log(
            "\nArtist: " + artist
            + "\nSong Name: " + songName
            + "\nPreview Link: " + songUrl
            + "\nAlbum: " + album
            +"\n"
        );
    });
}

// OMDB Functions
function omdbDefault(){
    request.get('http://www.omdbapi.com/?apikey=trilogy&t=mr+nobody', function (error, response, body) {
        if(error){
            return console.log('error:', error);
        }
        newBody = JSON.parse(body);
    
        var movieTitle = newBody.Title;
        var year = newBody.Year;
        var imdbRating = newBody.Ratings[0].Value;
        var rottenRating = newBody.Ratings[1].Value;
        var country = newBody.Country;
        var language = newBody.Language;
        var plot = newBody.Plot;
        var actors = newBody.Actors;
    
        console.log(
            "\nTitle: " + movieTitle
            + "\nRelease: " + year
            + "\nIMDB: " + imdbRating
            + "\nRotten Tomatoes: " + rottenRating
            + "\nCountry: " + country
            + "\nLanguage: " + language
            + "\nPlot: " + plot
            + "\nActors: " + actors
            +"\n"
        );
    });
}

function omdbGo(){
    request.get('http://www.omdbapi.com/?apikey=trilogy&t=' + input.split("-").join(" "), function (error, response, body) {
        if(error){
            return console.log('error:', error);
        }
        newBody = JSON.parse(body);
    
        var movieTitle = newBody.Title;
        var year = newBody.Year;
        var imdbRating = newBody.Ratings[0].Value;
        var rottenRating = newBody.Ratings[1].Value;
        var country = newBody.Country;
        var language = newBody.Language;
        var plot = newBody.Plot;
        var actors = newBody.Actors;
    
        console.log(
            "\nTitle: " + movieTitle
            + "\nRelease: " + year
            + "\nIMDB: " + imdbRating
            + "\nRotten Tomatoes: " + rottenRating
            + "\nCountry: " + country
            + "\nLanguage: " + language
            + "\nPlot: " + plot
            + "\nActors: " + actors
            +"\n"
        );
    });
}
// Welcome Message
console.log(
    "\n========================================"
    +"\nTWITTER, OMDB, SPOTIFY, AWESOME MACHINE!"
    +"\n========================================"
    +"\n"
    +"\n*FYI*"
    +"\n-----"
    +"\nREMEMBER TO USE '-' INSTEAD OF 'SPACE' BETWEEN YOUR WORDS. ;)"
    +"\n-----"
)

// Logic
if (command === "my-tweets") {
    tweety();
}
else if (command === "spotify-this-song" && typeof input === "string") {
    spoty()
}
else if (command === "spotify-this-song") {
    spotyDefault();
}
else if (command === "movie-this" && typeof input === "string"){
    omdbGo();
}
else if (command === "movie-this"){
    omdbDefault();
}
