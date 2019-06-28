require('dotenv').config();
var fs = require("fs");
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var axios = require("axios");

console.log(keys.spotify);

var spacing = "\n\n=========================================================================\n\n";

var spotify = new Spotify(keys.spotify);
var randText = "random.txt";

inquirer.prompt([
    {
        name: "command",
        message: "Welcome!  My name is Liri-Bot, and I am here to make your movie, music and band query dreams come true!  All you have to do is select from the following menu:",
        choices: ["Spotify This", "Concert This", "Movie This", "A Walk on the Wild Side"],
        type: "list",
    }
]).then(function(answer) {

    var command = answer.command;

    function spotifyThis() {
        inquirer.prompt([
            {
                name: "whatSong",
                message: "What song would you like to know more about?"
            }
        ]).then(function(answer) {
            console.log(answer);
        })
    }

    function doWhatItSays() {
        fs.readFile(randText, "utf8", function(error, data) {
            if (error) return console.log(error);

            var dataArray = data.split(", ");
            // console.log(dataArray)
            var action = dataArray[0];
            var reAction = dataArray[1];
                        
            function spotifyThis(reAction) {
                spotify.search(
                    { 
                        type: 'track', 
                        query: reAction,
                    }, 
                    function(err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }

                        
                        var songInfo = data.tracks.items[0];
                        console.log(spacing);
                        console.log(`${songInfo.name} \n\n Artist: ${songInfo.artists[0].name} \n\n Album : ${songInfo.album.name} \n\n Preview: ${songInfo.preview_url}`);
                        console.log(spacing);
 
                    });
            }

            function concertThis(reAction) {

            }

            function movieThis(reAction) {
                axios.get("http://www.omdbapi.com/?t=" + reAction + "&y=&plot=short&apikey=trilogy").then(
                    function(response) {

                        var movInfo = response.data

                        console.log(spacing);
                        console.log(`${movInfo.Title} \n\n Year: ${movInfo.Year} \n\n IMDB Rating: ${movInfo.Ratings[0].Value} \n\n Rotten Tomatoes Rating: ${movInfo.Ratings[1].Value} \n\n Country: ${movInfo.Country} \n\n Language: ${movInfo.Language} \n\n Plot: ${movInfo.Plot} \n\n Actors: ${movInfo.Actors}`);
                        console.log(spacing);

                    })

            }
            
            switch(action) {
                case "Spotify This":
                    return spotifyThis(reAction);
                case "Concert This":
                    return concertThis(reAction);
                case "Movie This":
                    return movieThis(reAction);
                default:
                    return console.log("Error?!");
            }
    
        });
    };

    switch(command) {
        case "Spotify This":
            return spotifyThis();
        case "Concert This":
            return concertThis(band);
        case "Movie This":
            return movieThis(movie);
        case "A Walk on the Wild Side":
            return  doWhatItSays();
        default:
            return console.log("choose one option please")
    };
})

// var command = process.argv[2];
// var query = process.argv.slice(3).join("+");




