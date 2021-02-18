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
    myHeaders.append("Authorization", "Bearer <v^1.1#i^1#I^3#p^1#r^0#f^0#t^H4sIAAAAAAAAAOVYa2wUVRTu9mUQEAQChCCuiyJRZndm9jU7sitbttCtW7qwbYEqkHnc2Q7My7l3aTcCaSuB8BQTSfyllUZigUTUEA2JBQ0xMSERxeAjBI1oggZIINHGIOCd2aVsK2mRbrCJ+2M3c+65537n+8659+6Q7ZVjntpSs6VvvOOB0q52sr3U4aDGkmMqK55+qKx0RkUJWeDg6Gp/vL28s+zCfMipisEuA9DQNQicbaqiQdY2hl0ZU2N1DsqQ1TgVQBYJbCpal2BpN8kapo50QVdczngs7OIBkASK4gEVCjIcILFVuxWzQcfjIZEJUQzw+4JBJshxeBzCDIhrEHEaCrtokqYIkiYopoGkWR/F+ki3nwk0u5xNwISyrmEXN+mK2HBZe65ZgHVoqByEwEQ4iCsSjy5K1UfjseolDfM9BbEieR5SiEMZOPBpoS4CZxOnZMDQy0Dbm01lBAFA6PJEcisMDMpGb4G5B/g21TQjSHxADHoZ3ktTdHGoXKSbKoeGxmFZZJGQbFcWaEhG2eEYxWzwa4GA8k9LcIh4zGn9LM1wiizJwAy7qquiK6PJpCvS0KKrHKxWCIgyIl7AIJLLYkRQ9HEME/D5CJy6IIogkF8oFy1P86CVFuqaKFukQecSHVUBjBoM5sZbwA12qtfqzaiELESFfr5+DulmS9ScihnUolm6AhXjdNqPwyvQPxshU+YzCPRHGDxgUxR2cYYhi67Bg3Yt5sunDYZdLQgZrMfT2trqbvW6dTPtoUmS8qyoS6SEFqDiCmlTrV7P+cvDTyBkOxUB4JlQZlHWwFjacK1iAFraFfF5vVSQzPM+EFZksPUfhoKcPQM7olgdAgBPezkJkLyEgfL+YnRIJF+kHgsH4LksoXLmOoAMhRMAIeA6y6jAlEXW65doLyMBQgyEJMIXkiSC94sBgpIAIDEyXggx/6dGudtSTwHBBKgotV60Oq/maxqr/Gptxq9xNYmUsnhpbWj5WjOOlDjTIpmJ9QlRrIrGgJb2he+2G+6cvKAbIKkrspAtAgNWrxeRBa8pJjkTZVNAUbBhRIlCK9HRJbI1H+IAnCG7rcZ2C7rq0Tm8o1umNTbiEeUcNYy4qmYQxysgXpzd/D/aye+YnozvOqMqJ6xfTkhZzF1S3LaabrhecJsA6hkT38/c9daZ3aCvAxreAZGpKwowm6gRC32/9bV6fRg+/uVhcW+5F++mMppqW1BkTNia0ZbZfVFU5kbZaUwFKG8Af5Ej03ShrWlDdrSdQzU6REAcKrXyxfd4rfYM/JMfKbE/VKfjCNnpeK/U4SA95BPUbPKxyrLG8rJxM6CMgFvmJDeU0xr+72oC9zqQNTjZLK10tE47+vbHBa8VulaR0/tfLIwpo8YWvGUgZ94eqaAmTBtPU/jCyJC0j/KRzeTs26Pl1NTyKbP2d++m6/58ZMWKvrMlFw7NvNwbXE6O73dyOCpKyjsdJVOmH/7x+JHaH96dNzU9Ls5c2PTJmh19b75zfdta4bXJISf071t5aGL8yqYFP3nff/7wxK827Jla+9vDnmsnbmzZKh88G6fRvq4q7zPpuTurz4c7JyW6s73nH+z47KAQf+PZA4GTAS75xentuzr2fn34mtER3/rX/hORtvU7bx488BFxat6jm/4Ib/Rf2iedS/Sd7u49ufn7X+qaFhx/+cvYZuHGxZXfRWaGv028laxd2rzj9aPdq/d8vnHzpydemPPkmetty19s/XXy3glzexuv9kivfDC29+LFCmfHsZKb1OqeeefOGGBW/aFTyoc9Gzf8PGnD5JdW7Ra+aXz195jnKHzu8rF016Urc7b1bL+q9ubk+xuHiV/W8BEAAA==>");
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