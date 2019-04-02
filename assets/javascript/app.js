// Firebase
var config = {
    apiKey: "AIzaSyB0UzYU_vyNF7nEbN2fZINuhAryTTxL9NU",
    authDomain: "project-1-6a939.firebaseapp.com",
    databaseURL: "https://project-1-6a939.firebaseio.com",
    projectId: "project-1-6a939",
    storageBucket: "project-1-6a939.appspot.com",
    messagingSenderId: "686301834017"
};
firebase.initializeApp(config);

var database = firebase.database();



// -------------- RESTURUANT API -------------- //

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
            var menuHolder = $("<p>").html(`<a href='${restaurantMenu}' target='_blank'>Menu</a>`);

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
    });
}


$("#submitBtn").on("click", function () {
    getData;

    // ---------- User Input Vailidation ------------- //

    // Make a variable to capture input value
    var restaurantField = $("#userSearch").val().trim();

    // If the field is blank
    if (restaurantField === "") {

        // Put up a modal
        $("#user-input-modal").modal("show");

        // Exit so the results don't happen anyway (cause they will)
        return;
    }
});
// -------------------------------------------------------------* end restaurant api ajax call



// ------------------ COCKTAIL API ------------------ //

// Cocktail On Click
$("#cocktail-submit-btn").on("click", function () {

    // ---------- User Input Vailidation ------------- //
    // Make a variable to capture input value
    var cocktailField = $("#ingredient-input").val().trim();

    // If the field is blank
    if (cocktailField === "") {

        // Put up a modal
        $("#user-input-modal").modal("show");

        // Exit so the results don't happen anyway (cause they will)
        return;
    }

    var userIngredient;

    // Prevent Default
    event.preventDefault();

    // CLEAR! THAT! DOM!
    $("#cocktail-results").text("");

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

            // Create font awesome icon
            var fontIcon = $("<i>");

            // Make the icon an icon
            fontIcon.addClass("fas fa-cocktail fa-lg");

            // Prepend the icon
            newCocktail.prepend(fontIcon);

            // Create an a tag
            var cocktailResult = $("<a>");

            // Assign text to a tag
            cocktailResult.text(response.drinks[i].strDrink);

            // Assign the href
            cocktailResult.attr("href", cockRef);

            // Make the href open in a new window
            cocktailResult.attr("target", "_blank");

            // Add a class to the cocktailResult
            cocktailResult.addClass("cocktail-link");

            // Append a tag as child of list item
            newCocktail.append(cocktailResult);

            // Append new cocktail to HTML
            $("#cocktail-results").append(newCocktail);
        }
    });

    // On-Click to push to Database
    $(document).on("click", ".cocktail-link", function () {
        // console.log($(this).text());

        var cocktailsSearched = {

            cocktails: $(this).text(),
        }
        database.ref().push(cocktailsSearched);

    })



})

// Limits results on the board to most recent 10
database.ref().limitToLast(10).on('child_added', function (snapShot) {
    var cocktailData = snapShot.val().cocktails;

    $("tbody").append(
        "<tr>" +
        "<td>" + cocktailData + "</td>" +
        "</tr>"
    );
});


