// Create global variable for DIV with ID "ebay-listings-area" use this variable to create and append elements to this section.
let searchBar = document.querySelector(".input");
let goButton = document.querySelector("#goButton");
let imageBox = document.querySelector(".fourthBox");

// elements that are updated on search
let author = document.getElementById("author");
let bookTitle = document.getElementById("bookTitle");
let publisher = document.getElementById("publisher");
let pageCount = document.getElementById("pageCount");
// let buyLink = document.getElementById("buyLink");
let thumbnail = document.getElementById('image');

// Ebay Card Image variables
let ebayCard1 = document.getElementById("card-1-image");
let ebayText1 = document.getElementById("card-1-text");
let ebayCard2 = document.getElementById("card-2-image");
let ebayText2 = document.getElementById("card-2-text");
let ebayCard3 = document.getElementById("card-3-image");
let ebayText3 = document.getElementById("card-3-text");

let ebayButton = document.getElementById("ebay-button");
let bookList = document.querySelector('.book-list');
let bookDetails = document.getElementById('bookDetails');

// Author and title variables for ebay
let ebayAuthor = "";
let ebayTitle = "";
let ebayTitle1 = "";
let ebayTitle2 = "";
let ebayTitle3 = "";

// Event Listener for Search Button
goButton.addEventListener('click', getApi);

// run for loop on searchbar click
function getApi(selectedBook) {

    // run a check, if selectedBook has not been clicked, as in, they have not clicked one yet, then run the api with searchbar.value, the first book returned from the api
    if (typeof selectedBook !== 'string') {
        selectedBook = searchBar.value
    }

    fetch('https://www.googleapis.com/books/v1/volumes?q=' + selectedBook + '')
        .then(response => response.json())
        .then(data => {

            // create a list of 5 book titles to choose from, set list empty each click
            bookList.innerHTML = null;

            for (let i = 0; i < 5; i++) {
                var book = document.createElement('div');
                var divide = document.createElement('hr')
                book.textContent = data['items'][i]['volumeInfo']['title'];
                book.classList.add('list-item');
                book.setAttribute("style", "opacity: 0;");
                book.addEventListener('click', getBookInfo);
                bookList.append(book);
                bookList.append(divide);
                fadeInResults();

            }
            // after list is created, display the results of the first book
            searchResults(data)

        })

}

// displays info on first book in search- the default- index of 0
function searchResults(data) {

    author.textContent = ('Author: ' + data['items'][0]['volumeInfo']['authors']);
    bookTitle.textContent = ('Title: ' + data['items'][0]['volumeInfo']['title']);
    publisher.textContent = ('Publisher: ' + data['items'][0]['volumeInfo']['publisher']);
    pageCount.textContent = ('Page Count: ' + data['items'][0]['volumeInfo']['pageCount']);
    var image = data['items'][0]['volumeInfo']['imageLinks']['smallThumbnail'];
    thumbnail.setAttribute('src', image);

    if (data['items'][0]['saleInfo']['isEbook'] === true) {
        var updateBuyLink = data['items'][0]['saleInfo']['buyLink'];
        $("#buyLinkP").html('<a id="buyLink"></a>')
        buyLink.setAttribute('href', updateBuyLink);
        buyLink.setAttribute('target', null);
        $("#buyLink").text("Ebook Link").removeClass("no-link")

    } else {
        $("#buyLinkP").addClass("no-link");
        $("#buyLinkP").text("Ebook Not Available!");

    }

    // Setting author and title Variables based on Google Books Api data
    ebayAuthor = " " + data['items'][0]['volumeInfo']['authors']
    ebayTitle = data['items'][0]['volumeInfo']['title']

    // Display Book Image After Search
    var removeBookImage = document.getElementById("book-image")
    removeBookImage.classList.remove("is-hidden")

    // Display Book Details After Search
    var removeBookInfo = document.getElementById("book-info")
    removeBookInfo.classList.remove("is-hidden")

    // Display Ebay Listing Button After Search
    var removeEbayButton = document.getElementById("ebay-button")
    removeEbayButton.classList.remove("is-hidden")

    fadeIn();

}

// Fade in Book Info
function fadeIn() {
    $("#image").animate({ opacity: "1" });
    $("#book-info").animate({ opacity: "1" });
    $("#ebay-button").animate({ opacity: "1" });
}

// list item, on click, update get api
function getBookInfo() {
    // text content of the selected book becomes searchbar term
    var selectedBook = this.textContent
    // get api with the selected book
    getApi(selectedBook)
}

// EBAY SECTION

ebayButton.addEventListener('click', getEbay);

function getEbay() {
    var removeEbay = document.getElementById("ebay-section")

    removeEbay.classList.remove("is-hidden")
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <v^1.1#i^1#f^0#p^1#r^0#I^3#t^H4sIAAAAAAAAAOVYa2wUVRTuttsaHtUfotTiY5liEGF2Z2ZnX2N3dfuySwrdsgtCAfHOzJ12yuzMZO6dthuUrFX5hwYqCTESgYgESEQxImgwYqSxookaUSQRFTWKQjABQQNGZ7ZL2VZSkG6wiftnM+eee+73feece+8MlSkbd++qxlXnyh03FG/MUJlih4OeQI0rK515Y0lxZWkRlefg2JiZlnH2lPxUjUBK0bl5EOmaiqCrO6WoiMsaw4RpqJwGkIw4FaQg4rDAJaJzmjjGTXG6oWFN0BTCFasLE7wosX4h6A/6QoLfJwYtq3oxZlILE/6QwDIszfAh6KWDbMAaR8iEMRVhoOIwwVAMTVIMSXuTjJfzURzrc9MM1Uq4FkADyZpqubgpIpKFy2XnGnlYR4YKEIIGtoIQkVi0IdEcjdXVz01We/JiRXI6JDDAJhr6VKuJ0LUAKCYceRmU9eYSpiBAhAhPZGCFoUG56EUw1wA/K3VAZNlQAAYAxfMSwwQLImWDZqQAHhmHbZFFUsq6clDFMk5fSVFLDb4DCjj3NNcKEatz2X8tJlBkSYZGmKiviS6KxuNEJNmupQCqV0iETdFaQCfj8+pIizAIBv0sSzJBQRBF6M8tNBAtJ/OwlWo1VZRt0ZBrroZroIUaDteGzdPGcmpWm42ohG1Eg35skqIvakgHWu2kDmTRxO2qnVeYsnC6so9XzsDgbIwNmTcxHIwwfCArUZgAui6LxPDBbC3myqcbhYl2jHXO4+nq6nJ3ed2a0eZhKIr2LJzTlBDaYQoQlq/d6wP+8pUnkHKWigCtmUjmcFq3sHRbtWoBUNuICOv10gEqp/tQWJHh1n8Y8jh7hnZEoTpEYAMUDfySAAEPKbYQDRLJ1ajHhgF5kCZTwFgOsa4AAZKCVWZmChqyyHl9EuMNSpAU/SGJZEOSRPI+0U/SEoQUhDwvhIL/pz652kpPQMGAuCClXrAyr+cb59f4UrNNnwoamxLKgy2zQw91GDGsxILtktHU2SSKNdE6qLax4atthsuTFzQdxjVFFtKFUMDu9cKp4DXEODBwOgEVxTKMiiiyiY6tJNvzkRUA6LLbbmy3oKU8GrA2dNu0LIt4VJyjuh5LpUwMeAXGCrOZ/0cb+WXpydZVZ0xxsvI3kEhZHLijuLPZdKNOwW1ApJmGdT1zN9tHdlJbDlVrB8SGpijQWECPOtHXPb92r4+sx788LK6Ne+EuKmOptgVFtgRbNtaYXZeMymCMnca0n/YyfophfaPiVZvNaTI91s6hRg1hKI5Izdlwbbdqz9B3/EhR9kf3OF6nehyvFjsclIe6m66ippaVzHeWTKxEMoZuGUhuJLep1qurAd3LYVoHslFc5uia/OaWfXlfFTYupSoGvyuMK6En5H1koG6/NFJK3zS5nKGtC6OX8foo1tdKVV0addK3OiftiZPrj/Tp4a3l7z238Mc3Fse+2/EBVT7o5HCUFjl7HEUrvbG3f9/Qg/dNX1vz/smfb3l3S13DKzubuqb0Vp/BLVVTv3/x08qKnk0HM/G+36rmO0yXfuHMmt19fwTXKY7ew+jEJ1/cedeSbd/M7GxPvlUTWLl5Re+hJb0YPLMnsr+y3ztj04F6umLPn6c/vjmz6NkDDz8/e1b3ds/J8/zmtSf0d/76Nv5SbM3pvcerZ6VbV/BPP7p28f6ip5au/sj5SD/df+DoPbNaTuGp4vEXZuwuP/t57cTyJ10bdq2s+OzYoV1b9yW2dew+98Rr6x5bMf5sq/nLD9umvyzo4qQvJ50/rHbedkffrxemre7uO3rsyHjnfR2BTem9vVOK73c9cJAH20+t//rQ40v6d+7Y+9WHA+n7G2LdHLnvEQAA>");
    myHeaders.append("Cookie", "ebay=%5Esbf%3D%23%5E");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${ebayTitle}${ebayAuthor}&category_ids=267&limit=5`, requestOptions)
        .then(response => response.json())
        .then(data => {

            // Ebay Text set to null
            ebayText1.innerHTML = "";
            ebayText2.innerHTML = "";
            ebayText3.innerHTML = "";

            // Title
            if (data.itemSummaries !== undefined) {
                let ebayTitle1 = document.createElement("p");
            ebayTitle1.textContent = data.itemSummaries[0].title;
            ebayText1.appendChild(ebayTitle1);

            let ebayTitle2 = document.createElement("p");
            ebayTitle2.textContent = data.itemSummaries[1].title;
            ebayText2.appendChild(ebayTitle2);

            let ebayTitle3 = document.createElement("p");
            ebayTitle3.textContent = data.itemSummaries[2].title;
            ebayText3.appendChild(ebayTitle3);

            // Logs Condition
            let ebayCondition1 = document.createElement("p");
            ebayCondition1.textContent = "In " + data.itemSummaries[0].condition + " condition";
            ebayText1.appendChild(ebayCondition1);

            let ebayCondition2 = document.createElement("p");
            ebayCondition2.textContent = "In " + data.itemSummaries[1].condition + " condition";
            ebayText2.appendChild(ebayCondition2);

            let ebayCondition3 = document.createElement("p");
            ebayCondition3.textContent = "In " + data.itemSummaries[2].condition + " condition";
            ebayText3.appendChild(ebayCondition3);

            // Log Listing Price
            let ebayPrice1 = document.createElement("p");
            ebayPrice1.textContent = "Price: $" + data.itemSummaries[0].price.value;
            ebayText1.appendChild(ebayPrice1);

            let ebayPrice2 = document.createElement("p");
            ebayPrice2.textContent = "Price: $" + data.itemSummaries[1].price.value;
            ebayText2.appendChild(ebayPrice2);

            let ebayPrice3 = document.createElement("p");
            ebayPrice3.textContent = "Price: $" + data.itemSummaries[2].price.value;
            ebayText3.appendChild(ebayPrice3);

            // Web Link
            let ebayLink1 = document.createElement("a");
            ebayLink1.setAttribute("href", data.itemSummaries[0].itemWebUrl);
            ebayLink1.setAttribute("target", "blank");
            ebayLink1.textContent = "View Listing";
            ebayText1.appendChild(ebayLink1);

            let ebayLink2 = document.createElement("a");
            ebayLink2.setAttribute("href", data.itemSummaries[1].itemWebUrl);
            ebayLink2.setAttribute("target", "blank");
            ebayLink2.textContent = "View Listing";
            ebayText2.appendChild(ebayLink2);

            let ebayLink3 = document.createElement("a");
            ebayLink3.setAttribute("href", data.itemSummaries[2].itemWebUrl);
            ebayLink3.setAttribute("target", "blank");
            ebayLink3.textContent = "View Listing";
            ebayText3.appendChild(ebayLink3);

            // Add Ebay Image to card 1
            ebayCard1.setAttribute('src', data.itemSummaries[0].image.imageUrl);
            ebayCard2.setAttribute('src', data.itemSummaries[1].image.imageUrl);
            ebayCard3.setAttribute('src', data.itemSummaries[2].image.imageUrl);

            fadeInEbay();
                
            } else {
                ebayAuthor = "";
                getEbay();
            }
            


        })
        .catch(error => console.log('error', error));

}

// Fade in Ebay Listings
function fadeInEbay() {
    $("#ebay-section").animate({ opacity: "1" });

}

// Fade in Book Search Results
function fadeInResults() {
    $(".list-item").animate({ opacity: "1" });

}