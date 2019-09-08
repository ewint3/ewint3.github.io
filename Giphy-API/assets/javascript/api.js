$( document ).ready(function() {

    // my array
    var topic = ["sloth", "turtle", "dog", "shark", "porcupine", "chipmunk", "elephant","bear"];
    
    //function that displays the gif buttons
    
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("animals");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    //function to add new button
    
    function addNewButton() {
        $("#addGif").on("click", function() {
            var animals = $("#topicInput").val().trim();
            if (animals == ""){
                return false;
                
            }
            topic.push(animals);
    
            displayGifButtons();
            return false;
            });
    }
    
    //function to remove last button
    function removeLastButton() {
        $("removeGif").on("click", function() {
            topic.pop(animals);
            displayGifButtons();
            console.log()
            return false;
        });
    
    }
    
    // function that displays the gifs
    
    function displayGifs() {
        var animals
         = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animals + "&api_key=pO6Zp341poKDj3yt9JyeFJneeSTBcsW4&q=animals&limit=25&offset=0&rating=PG&lang=en"
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
            //show results of gifs
            var results = response.data;
            if (results == ""){
                alert("There is not a giffy for this!");	
            }
            for (var i = 0; i<results.length; i++){
                //put gifs in a div
                var gifDiv = $("<div1>");
                //rating of gif
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
                //pull gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                //paused images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                //animated images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                //how images come in
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //add new div to existing divs
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    
    displayGifButtons();
    addNewButton();
    removeLastButton();
    
    
    
    //event listeners
    $(document).on("click", ".animals", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });