require('dotenv').config();
var fs = require("fs");
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var axios = require("axios");

console.log(keys.spotify);

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
            console.log(dataArray)
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
                   
                        console.log(data); 
                    });
            }

            function concertThis(reAction) {

            }

            function movieThis() {
                // console.log(reAction);
                var movieName = reAction.join("+");
                console.log(movieName);
                axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
                    function(response) {
                    console.log(response.data);
                    // console.log(`Title: ${movieName}`)
                    // console.log("This movie was released: " + response.data.Released);
                    // console.log("The movie's genre is " + response.data.Genre);
                    // console.log("This movie was directed by " + response.data.Director);

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




