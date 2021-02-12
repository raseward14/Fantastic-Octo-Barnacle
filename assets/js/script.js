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
    myHeaders.append("Authorization", "Bearer <v^1.1#i^1#I^3#p^1#f^0#r^0#t^H4sIAAAAAAAAAOVYa2wUVRTudrcVhAoEI2YrWAaUIJnZmdnH7E67a7YP2iV9wW4BIdjM4+7uwOzMMPcO7RLRUgOBhIQgPySGGORhjCZGUBMFJBJBMSYKiQISHoFYQ+IPISEx/IB4Z3cp20papBts4v7ZzL3nnvud7zvn3jND91VOfGlzy+a/qhxPlO/po/vKHQ5mEj2xsmLBU85yd0UZXWTg2NM3t8/V77xeB4WMavBLADR0DYKa3oyqQT43GCYsU+N1ASqQ14QMgDyS+Hi0rZVnKZo3TB3pkq4SNbHGMMEEuVAoyYW8YpBhAwEfHtXu+UzoYSLECKLf72OlYIBjg5IXz0NogZgGkaChMMHSLEPSLMmwCdbL+xnez1E+JriCqFkKTKjoGjahaCKSg8vn1ppFWEeGKkAITISdEJFYdGG8IxprbGpP1HmKfEUKPMSRgCw49KlBl0HNUkG1wMjbwJw1H7ckCUBIeCL5HYY65aP3wDwC/BzVQPKFJIGjBYbj/CBAl4TKhbqZEdDIOOwRRSaTOVMeaEhB2dEYxWyIq4GECk/t2EWsscb+W2wJqpJUgBkmmuqjr0Q7O4lIIq1nBNikkhBZMt7AIDuXNJKc7BOCwYDPR+LMkWQZBAob5b0VaB62U4OuyYpNGqxp11E9wKjBcG58Rdxgow6tw4wmkY1o0M6boJl7HNKhFbaoeRUtlNZsXUEG46zJPY6uwOBqhExFtBAY9DB8IkdRmBAMQ5GJ4ZO5XCykTy8ME2mEDN7j6enpoXq8lG6mPCxNM57lba1xKQ0yAoFt7VrP2yujLyCVXCgSwCuhwqOsgbH04lzFALQUEfF5vQxHF3gfCisyfPQfA0Uxe4ZWRKkqxOtngiLLBbwYpyRyTCkqJFJIUo+NA4hClswI5hqADFWQACnhPLMywFRk3utPst5gEpByIJQkfaFkkhT9coBkkgDQAIiiFAr+nwrlYVM9DiQToJLkesnyvEls6ar3ZxZZfk1oaY2rzYsXhZatNmNIjQXTSbN1Xass10cbgZbyhR+2Gh4cvKQboFNXFSlbAgbsWi8hC15T7hRMlI0DVcUDYwoU2oGOL5Ht9RA7EAyFsgubkvSMRxfwiW4PdecQjynmqGHEMhkLCaIKYqU5zf+jk/yB4Sm41xlXMWH98kIqcr5JoXJqUnCdRJkA6paJ+zOqw76zE/oaoOETEJm6qgJzKTNmoR+3vnatj8LHv7wsHi320nUq4ym3JVXBhHWPt8gei6KKMM5uYybAYEG9IYYbU1wNOU0T2fF2D7XoEAF5pNBczY/YVnuGvuRHynI/pt/xOd3vOFjucNAe+gVmDj270tnlck52QwUBShGSFFRSGn53NQG1BmQNQTHLKx09Mw4f+Kros8KeVfSzgx8WJjqZSUVfGejn7s9UMFNmVLEMbhhZFnfofm4FPef+rIt5xvV02/ffzd4+NVK2/8SqIzPbHK86tgzspqsGjRyOijJXv6NsevfuWXv/8BPXnz+0fq9sTKjeuvKNOqbj55uphctdvbvarlEXf0vO/2n+cZd88DQSe6+nvth6i6z69ExP10BZ1yyLCrmvrH07vPZs/JcNRzbc7Do8oJyfFkp3WzH3ezyadTnlvDvh6EfTtCsr54npO8Sy9y/dWnDsdffVBvjk1tnRquq77XUf7vZc29kwxX3u1MxvhQsf1P7Qceeu9OWJk9X7bnzt3HRq4Malq6ebj06te3eXsuzyDjP95hk/U9VymwwNEHu/md916MDZzy6c22n9yk2qe6fpz9XHXpx76rV9W9ycOq/arN2+MWttMpv3X1r/++2XAaqdvPHkJz9u+/ji+eNvTT/Svq02L9/f+rf0TPARAAA=>");
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
            let ebayTitle1 = document.createElement("p");
            ebayTitle1.textContent = data.itemSummaries[0].title;
            ebayText1.appendChild(ebayTitle1);

            console.log(data.itemSummaries[1].title);
            let ebayTitle2 = document.createElement("p");
            ebayTitle2.textContent = data.itemSummaries[1].title;
            ebayText2.appendChild(ebayTitle2);

            console.log(data.itemSummaries[2].title);
            let ebayTitle3 = document.createElement("p");
            ebayTitle3.textContent = data.itemSummaries[2].title;
            ebayText3.appendChild(ebayTitle3);

            // Logs Condition
            console.log(data.itemSummaries[0].condition);
            let ebayCondition1 =document.createElement("p");
            ebayCondition1.textContent = "In " + data.itemSummaries[0].condition + " condition";
            ebayText1.appendChild(ebayCondition1);

            console.log(data.itemSummaries[1].condition);
            let ebayCondition2 =document.createElement("p");
            ebayCondition2.textContent = "In " + data.itemSummaries[1].condition + " condition";
            ebayText2.appendChild(ebayCondition2);

            console.log(data.itemSummaries[2].condition);
            let ebayCondition3 =document.createElement("p");
            ebayCondition3.textContent = "In " + data.itemSummaries[2].condition + " condition";
            ebayText3.appendChild(ebayCondition3);

            // Log Listing Price
            console.log(data.itemSummaries[0].price.value);
            let ebayPrice1 = document.createElement("p");
            ebayPrice1.textContent = "Price: $" + data.itemSummaries[0].price.value;
            ebayText1.appendChild(ebayPrice1);

            console.log(data.itemSummaries[1].price.value);
            let ebayPrice2 = document.createElement("p");
            ebayPrice2.textContent = "Price: $" + data.itemSummaries[1].price.value;
            ebayText2.appendChild(ebayPrice2);

            console.log(data.itemSummaries[2].price.value);
            let ebayPrice3 = document.createElement("p");
            ebayPrice3.textContent = "Price: $" + data.itemSummaries[2].price.value;
            ebayText3.appendChild(ebayPrice3);

            // Web Link
            console.log(data.itemSummaries[0].itemWebUrl);
            let ebayLink1 = document.createElement("a");
            ebayLink1.setAttribute("href", data.itemSummaries[0].itemWebUrl);
            ebayLink1.setAttribute("target", "blank");
            ebayLink1.textContent = "View Listing";
            ebayText1.appendChild(ebayLink1);

            console.log(data.itemSummaries[1].itemWebUrl);
            let ebayLink2 = document.createElement("a");
            ebayLink2.setAttribute("href", data.itemSummaries[1].itemWebUrl);
            ebayLink2.setAttribute("target", "blank");
            ebayLink2.textContent = "View Listing"; 
            ebayText2.appendChild(ebayLink2);

            console.log(data.itemSummaries[2].itemWebUrl);
            let ebayLink3 = document.createElement("a");
            ebayLink3.setAttribute("href", data.itemSummaries[2].itemWebUrl);
            ebayLink3.setAttribute("target", "blank");
            ebayLink3.textContent = "View Listing" ;
            ebayText3.appendChild(ebayLink3);

            // Add Ebay Image to card 1
            ebayCard1.setAttribute('src', data.itemSummaries[0].image.imageUrl);
            ebayCard2.setAttribute('src', data.itemSummaries[1].image.imageUrl);
            ebayCard3.setAttribute('src', data.itemSummaries[2].image.imageUrl);
            
            // Log Listing Price
            console.log(data.itemSummaries[0].seller.feedbackPercentage);
            //Listing Image
            console.log(data.itemSummaries[0].image.imageUrl);
            

            // Logging Author Name
            console.log(ebayAuthor);
            // Log Title
            console.log(ebayTitle);

        })
        .catch(error => console.log('error', error));

}



