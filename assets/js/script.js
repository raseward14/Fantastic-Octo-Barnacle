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

// Ebay Card Image variables
let ebayCard1 = document.getElementById("card-1-image");
let ebayText1 = document.getElementById("card-1-text");

let ebayButton = document.getElementById("ebay-button");
let bookList = document.querySelector('.book-list');
let bookDetails = document.getElementById('bookDetails');

// Author and title variables for ebay
let ebayAuthor = "";
let ebayTitle = "";


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


    author.textContent = ('Author: ' + data['items'][0]['volumeInfo']['authors']);
    bookTitle.textContent = ('Title: ' + data['items'][0]['volumeInfo']['title']);
    publisher.textContent = ('Publisher: ' + data['items'][0]['volumeInfo']['publisher']);
    pageCount.textContent = ('Page Count: ' + data['items'][0]['volumeInfo']['pageCount']);
    var image = data['items'][0]['volumeInfo']['imageLinks']['smallThumbnail'];
    thumbnail.setAttribute('src', image);
    var updateBuyLink = data['items'][0]['saleInfo']['buyLink'];
    buyLink.setAttribute('href', updateBuyLink);
    buyLink.setAttribute('target', null);

    ebayAuthor = " " + data['items'][0]['volumeInfo']['authors'][0]
    ebayTitle = data['items'][0]['volumeInfo']['title']


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

    var bookTitleEbay = "The Shining";

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <v^1.1#i^1#r^0#p^1#f^0#I^3#t^H4sIAAAAAAAAAOVYa2wUVRTubrclay2SiPJOlgFCAGd2Hvsc2ZXtA7ukL9ilQH3g3Zm77cC8MnOHdoGYTUUSEzQRiAhFRQwRtfwgBK21BglR/GEQFRIJIBoJMfFJIEENRGdml7KtpCDdYBP3z2bOPffc73zfOffeGTJb7p67sW7jlUrHGOeuLJl1OhxUBekuL5s3ttQ5uayELHBw7MrOzLq6Sn+YrwNJVNklUFcVWYeeTkmUddY2RjBDk1kF6ILOykCCOos4NhFrqGdpgmRVTUEKp4iYJ14TwXw0z6eCZCAIU4wfcsC0ytdjJpUIFqCZMAcZyh/iQdBPh8xxXTdgXNYRkFEEo0mawkkap6gkybB0iPX5iaCPasU8LVDTBUU2XQgSi9pwWXuuVoB1eKhA16GGzCBYNB5bmGiKxWtqG5PzvQWxonkeEgggQx/8VK3w0NMCRAMOv4xue7MJg+OgrmPeaG6FwUHZ2HUwdwDfpprjQkEYBGEQ8pEwBYvC5EJFkwAaHoZlEXg8bbuyUEYCytyKUJOM1CrIofxToxkiXuOx/hYbQBTSAtQiWG1VbEWsuRmLJtsVCei1Iq4jgzcXUPHmJTV4kPeBUCjg8+F0iON4HgbyC+Wi5VkeslK1IvOCxZnuaVRQFTRRw6HcUAXcmE5NcpMWSyMLUaGf/zqHTLDV0jQnooHaZUtWKJk4PfbjrRUYmI2QJqQMBAciDB2wKYpgQFUFHhs6aJdivno69QjWjpDKer0dHR1EB0MoWpuXJknKu7yhPsG1Q8nsRdPX6nXbX7j1BFywU+HM2jL9WZRRTSydZqmaAOQ2LOpjGCpI5nkfDCs61PoPQ0HO3sENUawG8TGABzxHM3ya5IJhfzE6JJovUq+FA6ZABpeAthoiVQQcxDmzzgwJagLPMv40zYTSEOcD4TTuC6fTeMrPB3AqDSEJYSrFhUP/p0a53VJPQE6DqDi1Xqw6r03VLa3yS4sMvwzq6hPio4sXhZet0uJIjIfa01r9mnqer4rVQLnNF7ndbrh58pyiwmZFFLhMMRiwer14LDAa3ww0lElAUTQNI0pUtxIdXSJb83UzAFAFwmpsglMkrwLMHd0yrbQRjyjnmKrGJclAICXCeJF28/9mJ79peoJ51RlVOZn65YQU+NwlhbDVJPQ1HKFBXTE083pGNFlndlJZDWVzB0SaIopQa6FGLPRd1zd3rg/Hx788LO4s9yLeVEZRbXOiYBK2crRldlcUFcAoO42pAMWQlI+i/SPKq9rWNJkZbedQnaIjyA+bmmvhnV2rvYPf8aMl9o/qchwkuxz7nQ4H6SVnUTPI6eWlS12l907WBQQJAaQJXWiTzVdXDRKrYUYFguYsd3RM6NvzYcFXhV1PkBMHviu4S6mKgo8M5NQbI2XUfRMqacq8MFIkQ4d8/lZyxo1RF/Wga7z3xfvvObFgy5vvba5w7P3li+CT6C8nWTng5HCUlbi6HCVg88xvsc0vZSZt/aYVbiC+vzjvtdQOZ3dmd/0r2/xXW+e903ChLb52x3Nff3WOmLuhP739fG9n9uwnb/tOdZ+NznrjzNNnPj15bsqROSelpa/uubjzVMvaK7NmCzhW0bOi1yX/+v62j/q48QuOnvp88qGdbWVX1mf/vLru8uv4Tz8e6qoO7Xuk3b3s0ul3+8u5k5d3/7b18rOne48bp7eGX36qMzrlD+ela9/N6VnT0Bg4fnhv/4GevrlXdz60f/b6h5Pb2S+nzp60vOaDjysfO3ZCfGvaXsf+z8ZWTTta8vyma9vOY2MPBN1HoFr5wO/TJ17Y8sIx99kxl7of7xn3c/fUJc/0j4Pj1lX29rkPHt63KSff38sx1oDvEQAA>");
    myHeaders.append("Cookie", "ebay=%5Esbf%3D%23%5E");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${ebayTitle}${ebayAuthor}&category_ids=267&limit=5`, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Logs All Data
            console.log(data)

            // Title
            console.log(data.itemSummaries[0].title);
            let ebayTitle = document.createElement("p")
            ebayTitle.textContent = data.itemSummaries[0].title
            ebayText1.appendChild(ebayTitle)

            // Logs Condition
            console.log(data.itemSummaries[0].condition);
            let ebayCondition =document.createElement("p")
            ebayCondition.textContent = "In " + data.itemSummaries[0].condition + " condition"
            ebayText1.appendChild(ebayCondition)

            // Log Listing Price
            console.log(data.itemSummaries[0].price.value);
            let ebayPrice = document.createElement("p")
            ebayPrice.textContent = "Price: $" + data.itemSummaries[0].price.value
            ebayText1.appendChild(ebayPrice)

            // Web Link
            console.log(data.itemSummaries[0].itemWebUrl);
            let ebayLink = document.createElement("a")
            ebayLink.setAttribute("href", data.itemSummaries[0].itemWebUrl)
            ebayLink.setAttribute("target", "blank")
            ebayLink.textContent = "View Listing" 
            ebayText1.appendChild(ebayLink)



            // Add Title to screen
            // ebayText1.textContent =


            
            // Log Listing Price
            console.log(data.itemSummaries[0].seller.feedbackPercentage);
            //Listing Image
            console.log(data.itemSummaries[0].image.imageUrl);
            // Add Ebay Image to card 1
            ebayCard1.setAttribute('src', data.itemSummaries[0].image.imageUrl);

            // Logging Author Name
            console.log(ebayAuthor);
            // Log Title
            console.log(ebayTitle);

        })
        .catch(error => console.log('error', error));


}



