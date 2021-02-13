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

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer <v^1.1#i^1#p^1#r^0#I^3#f^0#t^H4sIAAAAAAAAAOVYa2wUVRTubh9asWKMAiFIylAkAWZ3Zmd2ujuyi9uXXSjdwpYijVLuztxpB+bl3DtdVoI2TagpNakBjfwiVRFDohLkIcRoosYfGogYYiPGmAiaEECFGAJKMM7MLmVbSUG6wSbun82ce+653/m+c+69M1RPWfmCvsa+yxWee7xDPVSP1+Ohp1DlZaULHyj2ziwtovIcPEM9VT0lvcVnFiOgKga/EiJD1xCs3KgqGuJdY4SwTI3XAZIRrwEVIh4LfDK2vIkP+CjeMHWsC7pCVMbrIkSQZWkBigwTAmFABTnbql2P2apHiFBYCkIuQNEix9q+9jBCFoxrCAMNR4gAFaBJKkDSTCvN8WyYp1hfiAu1E5Vt0ESyrtkuPoqIumh5d66ZB3V8pAAhaGI7CBGNxxqSiVi8rr65dbE/L1Y0R0MSA2yh0U+1uggr24BiwfGXQa43n7QEASJE+KPZFUYH5WPXwdwBfJdpjgYCxzHVYSnEpSBgCkJlg26qAI+Pw7HIIim5rjzUsIwzt2LUZiO1Hgo499Rsh4jXVTp/KyygyJIMzQhRXxNbE2tpIaKtXboKUL1CImyJ9gIG2bKyjqwWWRAKcSxLBkKCIIqQyy2UjZajecxKtbomyg5pqLJZxzXQRg3HcsPkcWM7JbSEGZOwgyjfLzTCIdPuiJpV0cJdmqMrVG2cle7jrRUYmY2xKacsDEcijB1wKYoQwDBkkRg76NZirnw2ogjRhbHB+/3pdNqXZny62ekPUBTtf2p5U1LogiogHF+n111/+dYTSNlNRYD2TCTzOGPYWDbatWoD0DqJKMswdDWV4300rOhY6z8MeTn7R3dEoTokzMBqKUUzqRCwWzEYLkSHRHNF6ndwwBTIkCowN0BsKECApGDXmaVCUxZ5JigFmJAESZELSyQbliQyFRQ5kpYgpCBMpYRw6P/UKLdb6kkomBAXptYLVef1qcZVNUF1qRXUQGNTUnlyxdLw6vVmHCvxUJdkNnU3iWJNrA5qnWzkdrvh5skLugFbdEUWMoVgwOn1wrHAmGILMHEmCRXFNkwoUeQkOrlEduYjOwAwZJ/T2D5BV/06sHd0x9ThIp5QzjHDiKuqhUFKgfEC7eb/zU5+0/Rk+64zqXKy9csKKYvZS4rPVdOHugWfCZFumfb9zJdwzuxWfQPU7B0Qm7qiQLONnrDQd13f7Lk+Hh//8rC4s9wLeFOZRLUtKLJNWMdky+yuKCqDSXYa0xzNBBg2zLITyqvW1bQ1M9nOoUYdYSiOm1pJw51dq/2j3/GjRe6P7vUcpHo9+7weD+Wn5tFzqTllxatKiu+fiWQMfTKQfEju1Ox3VxP6NsCMAWTTW+YxVoGz8/K+Kgw9Q80Y+a5QXkxPyfvIQM26MVJKT51eEaDtCyNDc2yYYtupuTdGS+hpJQ9vHUiI5rtvhry/rh3kDv/Q/tof869QFSNOHk9pUUmvp2iHeu7PI/Rgf98X/C7yQFuq++I5+urAq4eWLHxFvDqc2WtFindumyNt3rHss+8+X7Tm9cdOf/rWlvnbDvcM1y748HBzegpz7MSBYWKv/l7/+Uf27N+6djcF04l7F3017ctudXuJNTy4YuGLP06bcfannpMtszd3nOKJTWWz3nhp9/MDiWNPHL84PPWFa/D7E/2ndr38e+L4QO9vD77/tXfP0aGjsztKjzGn18nrBs8sunDoSF8duER6P3nWfDxYuu+4mlhzpapu7YXVT/+VmlGf/mX/R9vF6c9901zecHLL28uaw1qVWnHmA+6+j0/7265s21q+M5Becmn40cHSAwfPl72z7Of+8EPXtqQvf1u7KSvf30uZx7HvEQAA>");
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

            // Ebay Text set to null
            ebayText1.innerHTML = "";
            ebayText2.innerHTML = "";
            ebayText3.innerHTML = "";

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



