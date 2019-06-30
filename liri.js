require('dotenv').config();
var fs = require("fs");
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);

var randText = "random.txt";

var spacing = "\n\n=========================================================================\n\n";
var bandSpacing = "\n+++++++++++++++++++++++++++++++++++++++++++++++++++++\n";

// var song;
// var artist;
// var film;

var userInput;

function spotThis(userInput) {
    spotify.search(
        { 
            type: 'track', 
            query: userInput,
        }, 
        function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            };

            
            var songInfo = data.tracks.items[0];
            console.log(spacing);
            console.log(`${songInfo.name} \n\n Artist: ${songInfo.artists[0].name} \n\n Album : ${songInfo.album.name} \n\n Preview: ${songInfo.preview_url}`);
            console.log(spacing);

            liri();

        });
};

function conThis(userInput) {
    axios.get("https://rest.bandsintown.com/artists/"+ userInput +"/events?app_id=codingbootcamp")
        .then(
            function(response) {

                var bandInfo = response.data.slice(1);
                console.log(spacing)
                console.log(userInput);
                // console.log(bandInfo)

                for(i=0; i<bandInfo.length; i++) {
                    var date
                    var dateTimeArry = bandInfo[i].datetime.split("T");
                    var date = moment(dateTimeArry[0]).format("dddd, MMMM Do YYYY");
                    var time = dateTimeArry[1].split("\"").join("");
                    console.log(bandSpacing);
                    console.log(`Venue: ${bandInfo[i].venue.name} \n Location: ${bandInfo[i].venue.city}, ${bandInfo[i].venue.country} \n Date: ${date} \n Time: ${time}`);
                }

                console.log(spacing);
                liri();

            }
        );
}

function movThis(userInput) {
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function(response) {

            var movInfo = response.data

            console.log(spacing);
            console.log(`${movInfo.Title} \n\n Year: ${movInfo.Year} \n\n IMDB Rating: ${movInfo.Ratings[0].Value} \n\n Rotten Tomatoes Rating: ${movInfo.Ratings[1].Value} \n\n Country: ${movInfo.Country} \n\n Language: ${movInfo.Language} \n\n Plot: ${movInfo.Plot} \n\n Actors: ${movInfo.Actors}`);
            console.log(spacing);

            liri();

        });

};

function liri(){
    inquirer.prompt([
        {
            name: "command",
            message: "I AM LIRI! Select from the following menu: [ctrl-C to close]",
            choices: ["Spotify This", "Concert This", "Movie This", "A Walk on the Wild Side"],
            type: "list",
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
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
                userInput = `"${answer.whatSong}"`;    

                spotThis(userInput);
                
                
            });
        };

        function concertThis() {
            inquirer.prompt([
                {
                    name: "whatBand",
                    message: "What artist would you like to see?"
                }
            ]).then(function(answer) {
                userInput = answer.whatBand;
                conThis(userInput);

            })
        }

        function movieThis() {
            inquirer.prompt([
                {
                    name: "whatMovie",
                    message: "What movie would you like to know more about?"
                }
            ]).then(function(answer) {
                userInput = `"${answer.whatMovie}"`;        
                movThis(userInput);

            });
        };

        function doWhatItSays() {
            fs.readFile(randText, "utf8", function(error, data) {
                if (error) return console.log(error);

                var dataArray = data.split(", ");
                var liriCommand = eval(dataArray[0]);
                console.log(liriCommand);

                userInput = dataArray[1];
                liriCommand(userInput);
                            
        
            });
        };

        switch(command) {
            case "Spotify This":
                return spotifyThis();
            case "Concert This":
                return concertThis();
            case "Movie This":
                return movieThis();
            case "A Walk on the Wild Side":
                return  doWhatItSays();
            default:
                return console.log("make a better choice")
        };
    
    })
};
liri();