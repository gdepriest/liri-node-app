# Liri Node App

Liri Node App is a limited version of Siri (or preferred, Alexa), which returns song, concert and movie information based on user input.  I wired my Liri-Bot with Inquirer, to enhance user experience.

<img src="./images/app-screencapture.PNG" alt="screen capture of game">

## Functionality 💪
#### Here's how the app works: 

* An array of positive words was created. A for loop appends a button for each item in the array.  These buttons appear on the page upon load.

* When a button is clicked, the page grabs 10 static, non-animated gif images from the GIPHY API and places them on the page.

```
function displayGifs() {

    var theme = $(this).attr("data-name")
    $("#gifsHere").empty();
    // $("#gifsHere").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme + "&api_key=ItVZg7dqEEKwfl74bw0k4pld0Nswtx4h&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          var themeDiv = $("<div>").addClass("themeDiv");

          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating separate variables for still and animated image
            var themeImageStill = results[i].images.fixed_height_still.url;
            var themeImageAnimated = results[i].images.fixed_height.url;
                // Creating and storing an image tag - applying attributes for animating/pausing
            var image = $("<img>");
            image.attr('src', themeImageStill);
            image.attr('data-still', themeImageStill);
            image.attr('data-animate', themeImageAnimated)
            image.attr('data-state', 'still');
            image.addClass("searchGif");

          // Appending the paragraph and image tag to the themeDiv          
          themeDiv.append(image);
          themeDiv.append(p);

          // Prependng the themeDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifsHere").append(themeDiv);
        };
        
        
    });
};

```

* When the user clicks one of the still GIPHY images, the gif animates. If the user clicks the gif again, it stops playing.

```
$(document).on('click', '.searchGif', function() {
    
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

```

* The rating is displayed under each gif.

* A form on the page takes user input and adds it to the array of positive words.  The user-added buttons retrieves gifs from GIPHY as described above.

## Getting Started 🏁

These instructions will get you a copy of the project up and running on your local machine for grading and testing purposes. 

1. clone repository. 
2. open repository in your IDE of choice.
3. view `app.js` for logic.
4. view `index.html` for the document.
5. view `style.css` for the style.
6. open `index.html` in browser of choice to demo the application locally.


## Built With 🔧

* [Bootstrap](https://getbootstrap.com/) - css framework used.
* [JQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js) - JavaScript library used.
* [Giphy](https://developers.giphy.com/)


## Authors ⌨️

* **Genevieve DePriest** - [gdepriest](https://github.com/gdepriest)

## Acknowledgments 🌟

* Amber Burroughs, Tutoring badass
* Lindsey, TA goddess
* Grace, TA goddess
* Sarah Cullen, Maestro
