// Pseudo Coding for My Cheap Book Finder

//Global Variables Needed
// Create global variable for DIV with ID "book-info-area" use this variable to create and append elements to this section. 


// Searchbox section
// Create a single searchbox that the user can enter book title, author, or category into. 
// fetch google books url and return first 5 book titles, authors, and store 5 IDs associated with each result in an array. 
// Display 5 link options underneath search box and make so when result 1 is chosen, index 0 from IDs array is used as query parameter in second api call to retrieve google book info. Result 2 is index 1 from IDs array etc...



//Google Book Api Responds with following Items; Book Title, Author, Book Cover Image, Description, retail price, average rating, link to buy book new. 

// Have a button to find book on ebay. Use event listener on button to make an api call using book title and author parameters from google books api response. 

// Ebay Section
// Create global variable for DIV with ID "ebay-listings-area" use this variable to create and append elements to this section. 
// Pseudo Coding for My Cheap Book Finder
//Global Variables Needed
// Create global variable for DIV with ID "book-info-area" use this variable to create and append elements to this section. 
// Searchbox section
// Create a single searchbox that the user can enter book title, author, or category into. 
// fetch google books url and return first 5 book titles, authors, and store 5 IDs associated with each result in an array. 
// Display 5 link options underneath search box and make so when result 1 is chosen, index 0 from IDs array is used as query parameter in second api call to retrieve google book info. Result 2 is index 1 from IDs array etc...
//Google Book Api Responds with following Items; Book Title, Author, Book Cover Image, Description, retail price, average rating, link to buy book new. 
// Have a button to find book on ebay. Use event listener on button to make an api call using book title and author parameters from google books api response. 
// Ebay Section
// Create global variable for DIV with ID "ebay-listings-area" use this variable to create and append elements to this section.
let searchBar = document.querySelector(".input");
let goButton = document.querySelector("#goButton");
let imageBox = document.querySelector(".fourthBox");

// elements that are updated on search
let author = document.getElementById("author");
let bookTitle = document.getElementById("bookTitle");
let publisher = document.getElementById("publisher");
let pageCount = document.getElementById("pageCount");
let buyLink = document.getElementById("buyLink");
let thumbnail = document.getElementById('image');

let ebayButton = document.querySelector(".findListings");
let bookList = document.querySelector('.book-list');
let bookDetails = document.getElementById('bookDetails');

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
            console.log(data);

            // create a list of 5 book titles to choose from, set list empty each click
            bookList.innerHTML = null;

            for (let i = 0; i < 5; i++) {
                var book = document.createElement('div');
                var divide = document.createElement('hr')
                book.textContent = data['items'][i]['volumeInfo']['title'];
                book.classList.add('list-item');
                book.addEventListener('click', getBookInfo);
                bookList.append(book);
                bookList.append(divide);
            }

            // after list is created, display the results of the first book
            searchResults(data)

            // call ebay functions showing listings for default

        })

}

// displays info on first book in search- the default- index of 0
function searchResults(data) {

    author.textContent = ('Author: ', data['items'][0]['volumeInfo']['authors']);
    bookTitle.textContent = ('Title: ', data['items'][0]['volumeInfo']['title']);
    publisher.textContent = ('Publisher: ', data['items'][0]['volumeInfo']['publisher']);
    pageCount.textContent = ('Page Count: ', data['items'][0]['volumeInfo']['pageCount']);
    var image = data['items'][0]['volumeInfo']['imageLinks']['smallThumbnail'];
    thumbnail.setAttribute('src', image);
    var updateBuyLink = data['items'][0]['saleInfo']['buyLink'];
    buyLink.setAttribute('href', updateBuyLink);
    buyLink.setAttribute('target', null);

    //

}

// list item, on click, update get api
function getBookInfo() {
    // text content of the selected book becomes searchbar term
    var selectedBook = this.textContent
    // get api with the selected book
    getApi(selectedBook)
}

// fetch for ebay
var bookTitleTest = "The Shining";

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer <v^1.1#i^1#I^3#f^0#p^1#r^0#t^H4sIAAAAAAAAAOVYa2wUVRTubrc1tRYSHj7QxO1UEgPM7p2Z3e3syK5uH9DF0te2FatA7s7caafMq3PvUpZobCshGiT+AUM0kQYkkkB4/MAYDAmJJMIfJRFIqoSEKEYRNUhQFHzMTEvZVtIi3WATN5ts5txzz/3O951z790BfcUlCzbWbfy1zHOfd7AP9Hk9HqYUlBQXLZxR6J1XVAByHDyDfU/0+QYKv12MoaaaQgvCpqFj5F+nqToWXGOMyli6YECsYEGHGsICEYVUYnm9wAaAYFoGMURDpfzJmhgVkUUeyCEQ4SXI8VLItuo3Y7YaMYpDYiQE2UogcxFR5NL2OMYZlNQxgTqJUSxgGRqwNANaWUYIAYFhA0wUdFD+dmRhxdBtlwCg4i5cwZ1r5WCdGCrEGFnEDkLFk4klqcZEsqa2oXVxMCdWfISHFIEkg8c+VRsS8rdDNYMmXga73kIqI4oIYyoYH15hbFAhcRPMXcB3qWbENB/hOcSJkUglE2bzQuUSw9IgmRiHY1EkWnZdBaQThWQnY9RmI92NRDLy1GCHSNb4nZ/mDFQVWUFWjKqtSjyfaGqi4q1dhgZxrUpjkpHsBUy6qaWGrpRCkOcjoRDN8qIoSSgystBwtBGax61UbeiS4pCG/Q0GqUI2ajSeGy6HG9upUW+0EjJxEOX6cTc55Cs7HFGHVcyQLt3RFWk2Tr/7OLkCo7MJsZR0hqDRCOMHXIpiFDRNRaLGD7q1OFI+63CM6iLEFILB3t7eQC8XMKzOIAsAE1yxvD4ldiENUrav0+vD/srkE2jFTUVE9kysCCRr2ljW2bVqA9A7qXiI45hKMML7WFjx8dZ/GHJyDo7tiHx1SEhClZCBfBixPM9J4Xx0SHykSIMODpSGWVqD1hpETBWKiBbtOstoyFIkgQvLLMfLiJYiUZkORWWZToelCM3ICAGE0mkxyv+fGuVOSz2FRAuRvNR63uq8Nl3XVhXWlmXCOqyrT6lLm5dFn+u2kkRN8l2yVb+2XpKqEjVI7wzF7rQbbp+8aJioyVAVMZsHBpxezyMLnCU1QYtkU0hVbcOUEsVOotNLZGc+tgNAUwk4jR0QDS1oQHtHd0yrXcRTyjlhmklNyxCYVlEyP7v5f7ST3zY9xb7rTKucbP2GhVSk4UtKwFUzgNeKAQthI2PZ97NAo3NmtxprkG7vgMQyVBVZ7cyUhb7X+jq9Pgkf//KwuLvc83dTmU61LaqKTdjq6ZbZPVFUgdPsNGYiDBuNcizDTimvalfT1ux0O4fqDEyQNFFqvqV3ea0Ojv2THy9wP8yA5xAY8Bz0ejwgCOYzFaC8uLDNV/jAPKwQFFCgHMBKp27/d7VQYA3KmlCxvMUesw1enJ/zWmFwJXh49MVCSSFTmvOWATx2a6SImflQGcsA9xsCDNsBKm6N+pgHfXO8JWVytXf3/p9Pz/jhlcarN873x0+BslEnj6eowDfgKWjvGeKXPbWju3Rgob9lQ3XD3t+Gzm4Dh+j5Wv+z4ZXZ8uuz3uI2nZuFD+74uOK9Rc3fvDv33JtzwtGs/0zH1z1yxeUL5PXd/f2HLp09V3Hg6e0vFx7YVfnCH0PVG46tqll/uu9t70fa5vObZ8/9iR64/3Rt9Jdrm8ofKb1yZYFP3Xtjz87HRb410lL/SXHP+v3bv7r66I+Xj/WcuPD9tje2Vp/87Eh9lizatfK1qqvHl5iXXv3CnLfPt6Jwa9uJ44c7jx55cs6iM7HQjgNn8OHyL/96qWD2i83UzEEFVGho13dH9+2mP714cnHH7x9aezYXvH8t8efOU7OeWaByQ6u2vLNq5/7uz7dc6lBiHwjXh+X7G7GwM0vwEQAA>");
myHeaders.append("Cookie", "ebay=%5Esbf%3D%23%5E");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${bookTitleTest}, requestOptions`)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));