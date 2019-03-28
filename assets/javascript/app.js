// -------------- PSUEDO CODE -------------- //

// 1) Starting page - intro, instructions, login, start button
// 2) User logs in, hits start
// 3) Form pops up
// 4) User fills out form
// 5) Keywords from user input inform a query URL
// 6) API cross-searches to find list of places
// 7) Display list of places with their various criteria 
// 8) When a user clicks a resturaunt take them to the place's website

$(document).ready(function () {


    // From Allegra's trials

    var baseURL = "https://developers.zomato.com/api/v2.1/search?entity_id=287&entity_type=city";
    var userSearch;

    function getResturaunt(e) {
        e.preventDefault();
        userSearch = $("#resturaunt-input").val().trim();
        $.ajax({
            url: `${baseURL}&q=${userSearch}`,
            method: "GET",
            headers: {
                "accept": "application/json",
                "user-key": "a78c76989a0d84745c0c782d502cd107"
            }
        }).then(function (response) {
            console.log(response)
        });
    }

    // Rest On Click
    $("#resturaunt-submit-btn").on("click", function () {
        getResturaunt();
        console.log("rest-click")
    });

    // Rec On Click
    $("#recipe-submit-btn").on("click", function () {

        var userIngredient;

        // Prevent Default
        event.preventDefault();

        // HTML Elements
        userIngredient = $("#ingredient-input").val().trim();

        // AJAX URL
        var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userIngredient;

        // AJAX Call
        $.ajax({
            url: cocktailURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
        });
        console.log("rec-click")
    });

    // ----------------- FIREBASE ------------------ //

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB0UzYU_vyNF7nEbN2fZINuhAryTTxL9NU",
        authDomain: "project-1-6a939.firebaseapp.com",
        databaseURL: "https://project-1-6a939.firebaseio.com",
        projectId: "project-1-6a939",
        storageBucket: "project-1-6a939.appspot.com",
        messagingSenderId: "686301834017"
    };
    firebase.initializeApp(config);
    //create variable to hold database

    var database = firebase.database();

    $(".btn btn-light float-right").on("click", function (event) {
        event.preventDefault();

        userIngredient = $(".user-search").val().trim();

        var cocktails = {

            userIngredient: userIngredient,

        }

        database.ref().push(cocktails)



    });
});