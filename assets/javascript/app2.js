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
    $("#btn-primary").on("click", function () {

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
        apiKey: "AIzaSyC-m0mAh0tU9OlxcmLNaj9NeU-GIo6zYr4",
        authDomain: "classproject1-6b207.firebaseapp.com",
        databaseURL: "https://classproject1-6b207.firebaseio.com",
        projectId: "classproject1-6b207",
        storageBucket: "classproject1-6b207.appspot.com",
        messagingSenderId: "733605793926"
    };
    firebase.initializeApp(config);

    //create variable to hold database

    var database = firebase.database();

    $(".btn-primary").on("click", function (event) {
        event.preventDefault();

        userIngredient = $(".user-search").val().trim();

        var cocktails = {

            userIngredient: userIngredient,

        }

        database.ref().push(cocktails)



    });
});