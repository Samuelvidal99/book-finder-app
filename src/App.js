import './App.css';
import Swal from 'sweetalert2'
import React, {useState}from 'react';
import image from './rectangle.png'

function App(props) {
  const [isLoading, setIsLoading] = useState(false);

  //function that creates a new div tag to show the requested book
  async function buildShowCase(book) {
    document.getElementById('app').remove()
    var newDiv = document.createElement('div')
    newDiv.className = 'newDiv'
    newDiv.id = 'newDiv'
    var div01 = document.getElementById('div01')
    div01.appendChild(newDiv)

    var newH1 = document.createElement('h1')
    newH1.innerHTML += `${book["volumeInfo"]["title"]}`
    newDiv.appendChild(newH1)

    var newImage = document.createElement('img')
    newImage.src = book["volumeInfo"]["imageLinks"]["smallThumbnail"]
    newImage.style.marginRight = '800px'
    newImage.style.marginTop = '60px'
    newImage.style.height = '300px'
    newDiv.appendChild(newImage)
    
    var price = ``
    if(book["saleInfo"]["saleability"] === "FOR_SALE") {
      price = `${book["saleInfo"]["listPrice"]["amount"]} ${book["saleInfo"]["listPrice"]["currencyCode"]}`
    }else {
      price = `Cannot be bought`
    }
    var author = ``
    if(book["volumeInfo"]["authors"][0] === "undefined") {
      author = `Info not Found`
    }else {
      author = `${book["volumeInfo"]["authors"][0]}`
    }
    var publisher = ``
    if(book["volumeInfo"]["publisher"] === undefined) {
      publisher = `Info not Found`
    }else {
      publisher = `${book["volumeInfo"]["publisher"]}`
    }
    var published = ``
    if(book["volumeInfo"]["publishedDate"] === undefined) {
      published = `Info not Found`
    }else {
      published = `${book["volumeInfo"]["publishedDate"]}`
    }

    var newDiv02 = document.createElement('div')
    newDiv02.className = 'newDiv02'
    newDiv.appendChild(newDiv02)
    
    var newPre = document.createElement('pre')
    newPre.innerHTML += `Author: ${author}.<br>Publisher: ${publisher}.<br>Published: ${published}.<br>Price: ${price}.<br><a href="${book["volumeInfo"]["canonicalVolumeLink"]}">Click to Here to know more.<a>`
    newPre.style.marginTop = '-300px'
    newPre.style.marginRight = '-120px'
    newPre.style.fontSize = '20px'
    newPre.id = 'newPre'
    newDiv02.appendChild(newPre)

    var newButton = document.createElement('button')
    newButton.type = 'button'
    newButton.innerHTML = ''
    newButton.onclick = function handleBack() {
      window.location.reload()
    }
    newButton.style.width = '50px'
    newButton.style.height = '40px'
    newButton.style.background = 'none'
    newButton.style.border = 'none'
    newButton.style.backgroundImage = `url('${image}')`
    newDiv.appendChild(newButton)
  }

  //function that make the request to the google book API if every condition is satisfied
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    if(typeof(props) === 'object') {
      Swal.fire({
        title: '<span style="color:black">Error!<span>',
        icon: 'error',
        background: '#c4c4c4',
        confirmButtonText: 'Ok',
        html: '<span style="color:black">You can\'t search a empty text.<span>',
      })
    }else {
      try {
        //request to the Google Books API
        var url = `https://www.googleapis.com/books/v1/volumes?key=${window.env.API_KEY}&q=${props}&maxResults=1`
        const response = await fetch(url,{
          method:'GET',
        })
        const aux = await response.json()
        await buildShowCase(aux["items"][0])
      }catch(err) {
        alert(err)
      }
    }
    setIsLoading(false)
  }

  async function handleChange(event) {
    try {
      props = event.target.value
    }catch(err) {
      alert(err)
    }
  }
  return (
    <div className="div01" id='div01'>
      <div  className="App" id='app'>
        <h1>Book Finder</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" className="inputBox" id='inputText' onChange={(event) => handleChange(event)}></input><br></br>
          <input type="submit" className="submitForm" value="Search"></input>
        </form>
      </div>
    </div>
  );
}

export default App;
