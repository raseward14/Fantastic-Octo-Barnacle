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
    myHeaders.append("Authorization", "Bearer <v^1.1#i^1#p^1#f^0#r^0#I^3#t^H4sIAAAAAAAAAOVYf2wTVRxv125mIhAcCIIm9dAYkGvv9dfac62069g6OzboVtgSAvfj3Xrb9e5y7x2jIMmYChiV6DRGYzQTxEgMBJWRiAFJCBFDwB/8sUhmNDFGJEgwEkmMondtGd0kG7IGl9h/mvu+7/u+z/fz+X7fe3dUb0Xl4q0NW69Mt95RNtBL9ZZZrWAaVVlR/sgMW9n8cgtV5GAd6H2w195nO1eDmIyk0ishUhUZQceGjCQjOmcMEbom0wqDRETLTAYiGnN0MtKUoN1OilY1BSucIhGOeCxEQFANvAGfTwB8gPW7OcMqX4vZqoSIap+7Gvh5ys9yAYoVWGMcIR3GZYQZGYcIN+UGJOUmQaCVArTbR3uAMwiCHYQjBTUkKrLh4qSIcA4unZurFWEdHyqDENSwEYQIxyPLks2ReKxueWuNqyhWuMBDEjNYR6OfahUeOlKMpMPxl0E5bzqpcxxEiHCF8yuMDkpHroG5Bfg5qv085Dk/H6AAB3ihWigJlcsULcPg8XGYFpEnhZwrDWUs4uxEjBpssF2Qw4Wn5UaIeMxh/q3QGUkURKiFiLpopD3S0kKEW9NKhkF1EomwzhsLqGTLyhhZzXuZQMDv9ZLuAMfxPPQXFspHK9A8ZqVaReZFkzTkWK7gKDRQw7HcgCJuDKdmuVmLCNhEVOznGeHQ22GKmldRx2nZ1BVmDJyO3OPECozMxlgTWR3DkQhjB3IUhQhGVUWeGDuYq8VC+WxAISKNsUq7XD09Pc4ej1PROl1uigKu1U2JJJeGGYYwfM1ez/uLE08gxVwqHDRmIpHGWdXAssGoVQOA3EmEvR4PqKYKvI+GFR5r/YehKGfX6I4oVYcAHvgoiuV5jgOsm/KUokPChSJ1mTggy2TJDKN1Q6xKDAdJzqgzPQM1kac9PsHtCQiQ5P1BgfQGBYFkfbyfBAKEFIQsywUD/6dGudlST0JOg7gktV6yOq9jG9qivkyj7pOZhkRSql/RGFzVpcWxFA+kBS2xPsHz0UgMyp3e0M12w42T5xQVtiiSyGVLwIDZ6yVkwaPxLYyGs0koSYZhUokiM9GpJbI5HxkBGFV0mo3t5JSMS2GMHd00rc0hnlTOEVWNZzI6ZlgJxkuzm/9HO/kN0xONu86UysnQLy+kyOcvKc6cmk60nnNqECm6ZtzPnM3mmd2qdEPZ2AGxpkgS1FJg0kLfbn3NXp+Aj395WNxa7qW7qUyl2uYk0SBs7VTL7LYoKjJT7DQGfuDxA+DzTK5La3Oatman2jnUoCAM+fFSs9ff4rXaNfolP2zJ/UCfdZDqs75fZrVSLuohsJB6oMLWZrfdNR+JGDpFRnAisVM23l016OyGWZURtbIKa8/cQ7sPF31WGFhDzRv5sFBpA9OKvjJQ910fKQcz5053A+PCaLy6ug0VO6iF10ft4B777FOzdn7tDV+sSZ1dc/bdg0v4/W8ef4OaPuJktZZb7H1WS2/3Y771liPDlYfR05aq43M+ufvOZ6qoWNPQ7wtsR3pePNH2nHpC2M4IHzR9cbn9NP3Swc+JyqPtLVHcOeC9/9VjZ7peGLTVb6xd+vPSxrefiM6+EEsN7vvQHpmxccmFCDf08P7QpmN7L+0Msr9Wtf/2fc2eYWnXvERqKHHvj+l5r89ZNavtwKee4cqL6656Ld3qalfHgX7rfJjafXX7Inxxi/+vK8N7L295Sy9rHNh1ckfw6qF3uod+OZ4oOw0+XvzKy/HvjqFz+wKPSn9uQ9vSj5/afP7J2vf2fLWjf8GW+m/teGZV15dnuZ/WfXaSfN43+ENs0aanfOfFM9Ftl4a5/rZnB7/54+jmj17Ly/c3Oz40UvARAAA=>");
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