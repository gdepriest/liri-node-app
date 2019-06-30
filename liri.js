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

var song;
var artist;
var film;

var command;



function spotThis(song) {
    spotify.search(
        { 
            type: 'track', 
            query: song,
        }, 
        function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            };

            
            var songInfo = data.tracks.items[0];
            console.log(spacing);
            console.log(`${songInfo.name} \n\n Artist: ${songInfo.artists[0].name} \n\n Album : ${songInfo.album.name} \n\n Preview: ${songInfo.preview_url}`);
            console.log(spacing);

        });
};

function conThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp")
        .then(
            function(response) {

                // if (error) {
                //     return console.log('Error occurred: ' + error);
                // }

                var bandInfo = response.data.slice(1);
                console.log(spacing)
                console.log(artist);
                // console.log(bandInfo)

                for(i=0; i<bandInfo.length; i++) {
                    var date
                    var dateTimeArry = bandInfo[i].datetime.split("T");
                    var date = moment(dateTimeArry[0]).format("dddd, MMMM Do YYYY");
                    var time = dateTimeArry[1].split("\"").join("");
                    // console.log(dateTimeArry, date, time);
                    console.log(bandSpacing);
                    console.log(`Venue: ${bandInfo[i].venue.name} \n Location: ${bandInfo[i].venue.city}, ${bandInfo[i].venue.country} \n Date: ${date} \n Time: ${time}`);
                }

                console.log(spacing);

            }
        );
}

function movThis(film) {
    axios.get("http://www.omdbapi.com/?t=" + film + "&y=&plot=short&apikey=trilogy").then(
        function(response) {

            var movInfo = response.data

            console.log(spacing);
            console.log(`${movInfo.Title} \n\n Year: ${movInfo.Year} \n\n IMDB Rating: ${movInfo.Ratings[0].Value} \n\n Rotten Tomatoes Rating: ${movInfo.Ratings[1].Value} \n\n Country: ${movInfo.Country} \n\n Language: ${movInfo.Language} \n\n Plot: ${movInfo.Plot} \n\n Actors: ${movInfo.Actors}`);
            console.log(spacing);

        });

};

inquirer.prompt([
    {
        name: "command",
        message: "Select from the following menu:",
        choices: ["Spotify This", "Concert This", "Movie This", "A Walk on the Wild Side"],
        type: "list",
    }
]).then(function(answer) {

    command = answer.command;

    function spotifyThis() {
        inquirer.prompt([
            {
                name: "whatSong",
                message: "What song would you like to know more about?"
            }
        ]).then(function(answer) {
            song = `"${answer.whatSong}"`;    

            spotThis(song);
            
        });
    };

    function concertThis() {
        inquirer.prompt([
            {
                name: "whatBand",
                message: "What artist would you like to see?"
            }
        ]).then(function(answer) {
            artist = answer.whatBand;
            conThis(artist);

        })
    }

    function movieThis() {
        inquirer.prompt([
            {
                name: "whatMovie",
                message: "What movie would you like to know more about?"
            }
        ]).then(function(answer) {
            film = `"${answer.whatMovie}"`;        
            movThis(film);

        });
    };

    function doWhatItSays() {
        fs.readFile(randText, "utf8", function(error, data) {
            if (error) return console.log(error);

            var dataArray = data.split(", ");
            var action = dataArray[0];
            var reAction = dataArray[1];
                        
            function spotifyThis(reAction) {
                song = reAction;
                spotThis(song)
            
            }

            function concertThis(reAction) {
                artist = reAction.split("\"").join("");
                conThis(artist);

            };

            function movieThis(reAction) {
                film = reAction;
                movThis(film);
         
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
            return concertThis();
        case "Movie This":
            return movieThis();
        case "A Walk on the Wild Side":
            return  doWhatItSays();
        default:
            return console.log("make a better choice")
    };
})





