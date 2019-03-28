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

function getData(e) {
    e.preventDefault();
    userSearch = $("#userSearch").val().trim();
    $.ajax({
        url: `${baseURL}&q=${userSearch}`,
        method: "GET",
        headers: {
            "accept": "application/json",
            "user-key": "a78c76989a0d84745c0c782d502cd107"
        }
    }).then(function (response) {

        var restaurants = response.restaurants;

        restaurants.forEach(function (restaurant) {
            console.log(restaurant);
            var restaurantContainer = $("<div>");
            restaurantContainer.addClass("restaurant");

            var restaurantName = restaurant.restaurant.name;
            var restaurantCuisine = restaurant.restaurant.cuisines;
            var restaurantAddress = restaurant.restaurant.location.address;
            var restaurantNeighborhood = restaurant.restaurant.location.locality;
            var restaurantMenu = restaurant.restaurant.menu_url;

            var nameHolder = $("<p>").text(`Name: ${restaurantName}`);
            var cuisineHolder = $("<p>").text(`Cuisine: ${restaurantCuisine}`);
            var addressHolder = $("<p>").text(`Address: ${restaurantAddress}`);
            var neighborhoodHolder = $("<p>").text(`Neighborhood: ${restaurantNeighborhood}`);
            var menuHolder = $("<p>").text(`Menu: ${restaurantMenu}`);

            restaurantContainer.append(nameHolder);
            restaurantContainer.append(cuisineHolder);
            restaurantContainer.append(addressHolder);
            restaurantContainer.append(neighborhoodHolder);
            restaurantContainer.append(menuHolder);

            $("#result").prepend(restaurantContainer);
        });

        var restaurantName = restaurant.name;
        console.log(`Restaurant: ${restaurantName}`);

        var restaurantCuisine = response.restaurants[0].restaurant.cuisines;
        console.log(`Cuisine: ${restaurantCuisine}`);

        var restaurantAddress = response.restaurants[0].restaurant.location.address;
        console.log(`Address: ${restaurantAddress}`);

        var restaurantNeighborhood = response.restaurants[0].restaurant.location.locality;
        console.log(`Neighborhood: ${restaurantNeighborhood}`);

        var restaurantMenu = response.restaurants[0].restaurant.menu_url;
        console.log(`Menu: ${restaurantMenu}`);
        }

        database.ref().push(cocktails)



    });
});
=======
}

$("#submitBtn").on("click", getData);
// -------------------------------------------------------------* end restaurant api ajax call

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

        // ---------- Add new DOM element on the fly for the results ------------- //

        // Create a for loop to display 10 results
        for (i = 0; i < 100; i++) {

            // Href using the drinks ID to go to it's specific page
            var cockRef = "https://www.thecocktaildb.com/drink/" + response.drinks[i].idDrink;

            // Make list item
            var newCocktail = $("<li>");

            // Create an a tag
            var cocktailResult = $("<a>");

            // Assign text to a tag
            cocktailResult.text(response.drinks[i].strDrink);

            // Assign the href
            cocktailResult.attr("href", cockRef);

            // Append a tag as child of list item
            newCocktail.append(cocktailResult);

            // Append new cocktail to HTML
            $("#cocktail-results").append(newCocktail);
        }
    });
});