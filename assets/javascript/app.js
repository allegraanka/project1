// -------------- PSUEDO CODE -------------- //

// 1) Starting page - intro, instructions, login, start button
// 2) User logs in, hits start
// 3) Form pops up
// 4) User fills out form
// 5) Keywords from user input inform a query URL
// 6) API cross-searches to find list of places
// 7) Display list of places with their various criteria 
// 8) When a user clicks a resturaunt take them to the place's website


// From Allegra's trials

var baseURL = "https://developers.zomato.com/api/v2.1/search?entity_id=287&entity_type=city";
var userSearch;

function getData(e) {
    e.preventDefault();
    userSearch = $(".user-search").val().trim();
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

$("#submit-btn").on("click", getData);