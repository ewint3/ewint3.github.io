$(document).ready(function () {

    // Global variables
    
    var targetNumber;
    var num1;
    var num2;
    var num3;
    var num4;
    var userTotal = 0;
    var wins = 0;
    var losses = 0



    function reset() {
        num1 = Math.floor(Math.random() * 11 + 1);
        num2 = Math.floor(Math.random() * 11 + 1);
        num3 = Math.floor(Math.random() * 11 + 1);
        num4 = Math.floor(Math.random() * 11 + 1);
        targetNumber = Math.floor(Math.random() * 101 + 19);
        userTotal = 0;
        $("#total-score").text(userTotal);
        $("#target-score").text(targetNumber);
    }

    function initialize() {
        num1 = Math.floor(Math.random() * 11 + 1);
        num2 = Math.floor(Math.random() * 11 + 1);
        num3 = Math.floor(Math.random() * 11 + 1);
        num4 = Math.floor(Math.random() * 11 + 1);
        targetNumber = Math.floor(Math.random() * 101 + 19);
        $("#target-score").text(targetNumber);
        $("#wins").text(wins);
        $("#losses").text(losses);
        $("#total-score").text(userTotal);
    }
    function logic() {
        if (userTotal === targetNumber) {
            alert("You Win!");
            reset();
            wins++;
            $("#wins").text(wins);
        }
        else if (userTotal > targetNumber) {
            alert("You lose!");
            reset();
            losses++;
            $("#losses").text(losses);
        }
    }

    

    initialize();

    $("#blue").on("click", function () {
        userTotal = userTotal + num1;
        $("#total-score").text(userTotal);
        console.log(userTotal);
        logic();
    })

    $("#green").on("click", function () {
        userTotal = userTotal + num2;
        $("#total-score").text(userTotal);
        console.log(userTotal);
        logic();
    })

    $("#red").on("click", function () {
        userTotal = userTotal + num3;
        $("#total-score").text(userTotal);
        console.log(userTotal);
        logic();
    })

    $("#yellow").on("click", function () {
        userTotal = userTotal + num4;
        $("#total-score").text(userTotal);
        console.log(userTotal);
        logic();
    })



});