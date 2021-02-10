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
myHeaders.append("Authorization", "Bearer <v^1.1#i^1#r^0#I^3#f^0#p^1#t^H4sIAAAAAAAAAOVYfWxTVRRf126Ac6BRYBCU+oAQIH1977V9bV9oScc6VrJP2g02Rbx9777tbe/Ld2/3YUxcFsHEbyOGRKdhotGMvwgaJEBMiBKDsCmiEBETQ+LXJEHCNKJ/+F5bRjfJhqzBJfaf5p577rm/8zvn3HvepXqL56zeUbXj91LbrMLdvVRvoc1Gl1BziovWzLUXLi4qoHIUbLt7l/c6+uw/rkVAkXVuE0S6piLo7FZkFXFpYYhIGSqnASQhTgUKRBzmuXikpppjSIrTDQ1rvCYTzlhFiBAoEPQHkjDIBiEMMLQpVa/ZTGghIsl6WEb0M16e9YvBAG/OI5SCMRVhoOIQwVAM7aIYF00laJbzsZzHT3p8VAvhbIIGkjTVVCEpIpyGy6XXGjlYJ4cKEIIGNo0Q4VikMl4XiVVEaxNr3Tm2wlke4hjgFBo/Wq8J0NkE5BScfBuU1ubiKZ6HCBHucGaH8Ua5yDUwtwA/TTUb5CHP+IDgoYI+EeSHykrNUACeHIclkQSXmFbloIol3DMVoyYbyXbI4+yo1jQRq3Bafw0pIEuiBI0QES2PNEfq64lwok1TAIrKLoRTgrmB7qrfVOHyC14QCLBer4sJ8LwgQDa7UcZaluYJO63XVEGySEPOWg2XQxM1nMiNN4cbU6lOrTMiIrYQ5eoFrnHoZVusoGaimMJtqhVXqJg4nenh1BEYW42xISVTGI5ZmDiRpihEAF2XBGLiZDoXs+nTjUJEG8Y653Z3dXWRXR5SM1rdDEXR7i011XG+DSqAMHWtWs/oS1MvcElpV3horkQSh3t0E0u3masmALWVCHs9HtpPZXkfDys8UfoPQY7P7vEVka8KAUwg4PcnWZH1+ANeSshHhYSzSeq2cMAk6HEpwOiAWJcBD128mWcpBRqSwHl8IuMJiNAlsEHR5Q2KoivpE1gXLUJIQZhM8sHA/6lQbjbV45A3IM5Lructz6PJqsZyn7Ix5VNBVXVc3tCwMbi53YhhORZoE43qzmpBKI9UQLXVG7rZarix87ymw3pNlviePDBg1XoeWfAYQj0wcE8cyrIpmJajyHJ0ZgXZWo9MA0CXSKuwSV5T3BowT3RLtC2NeFo+R3Q9pigpDJIyjOXnNP+PTvIbuieZvc6M8smMXyaQkpBpUsh0NEnUyZMGRFrKMPszss66sxNaB1TNExAbmixDo4medqBvd3ytWp+Cj395Wdya7/nrVGZSbvOyZBK2baZ5dlsiKoEZdhvTLM0E/Swd9E/Lr/XpmCZ6Zto9VKUhDIXJXHNsuMW22j3+Iz9ckP7Rfbb3qT7bvkKbjXJTK+hl1APF9kaH/c7FSMKQlIBIIqlVNb9dDUh2wB4dSEZhsU1vBD+vyHlW2L2VKht7WJhjp0tyXhmoJddniuh5C0sZ2mwYKZr1ma15C7Xs+qyDXuC497n6kde9swb6Omu8ZXvuSP6lvTHvTap0TMlmKypw9NkKul7++tyw8dqzxuDQJ9Hw7NNP/nCqpuTxwUHuyNXjXwpHh+ef23fprtX2ty/3F0SvvNRvK1z84ldl+3eJI2fbz135bEX3ogF275qDKy/8edB4r2lHtKCy8cT3w83NQ93iB3J7x6k/Li34fOfx/e5F7e8KgxuHIu8k+PPPPxaorax48Oyjw8+cX7ck3nbslU9/LSk7cPpu5vj9o54zp5c2zT+8dvYjW44d+Ghvf+lvW8mRE6O7LrTwX7z1lDEwsHLu0YtPfyed6pS+GTlzZOk9vzS8sIrfNnpkXsNDyrPyZfvHh+KrPrzv4ejRnY6T3/af2Hm1rPqn0pPbt4z6m2e/um/7KL54aPmeoScOj25WF67bOpIJ398ns/k48BEAAA==>");
myHeaders.append("Cookie", "ebay=%5Esbf%3D%23%5E");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.ebay.com/buy/browse/v1/item_summary/search?q=children of time", requestOptions,)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));