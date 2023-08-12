// select the container in which the fetched data is displayed.
let charecterContainer = document.getElementById('data-container');

// get local favorite characters from local storage
function getStorage() {
    let data = JSON.parse(localStorage.getItem("favorite")) || [];
    return data;
}

// function to fetch the data from API
async function fetchData() {
    const response = await fetch(
        "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=63e371f33e0a750b73f58c598fdf0223&hash=22b3f7dd7a13addb7057decf5d3002e5"
    );
    const data = await response.json();
    return data;
}


// code for displaying the data fetched from API
fetchData()
    .then((data) => {
        let favoriteData = getStorage();
        let dataArray = data.data.results;
        charecterContainer.innerHTML = "";

        // itterating over the resultant array
        for (let i = 0; i < dataArray.length; i++) {
            let favorite = "Favorite";

            // check character is already favorite or not
            for (let j = 0; j < favoriteData.length; j++) {
              if (dataArray[i].id == favoriteData[j].id) {
                favorite = "UnFavorite";
                break;
              }
            }

            //creating a charecter-div and appending it to the charecter-container
            const { id, thumbnail, name } = dataArray[i];
            let div = document.createElement('div');
            div.classList.add("charecter-card");
            div.setAttribute("id", id);
            let path = `../superheroHunter/charDetails.html#${id}`;
            div.innerHTML = `
            <a href=${path}><img class="poster" src=${thumbnail.path}.jpg alt=""></a>
            
              <div class="card-body">
                 <a href=${path}>${name}</a>
                 <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavorite(this)"/>
              </div>
            `;
            charecterContainer.appendChild(div);
        }
    })

    // for error purpose
    // .catch((error) => {
    //     console.error(error);
    // });


// search bar 

let searchBtn = document.getElementById("search-btn");
let searchBox = document.getElementById("search-box");
let searchResult = document.getElementById("searchResult");

// added an click event on search button
searchBtn.addEventListener("click", () => {
  let query = searchBox.value;
  searchBox.value = "";

  let url = `https://gateway.marvel.com:443/v1/public/characters?name=${query}&ts=1&apikey=63e371f33e0a750b73f58c598fdf0223&hash=22b3f7dd7a13addb7057decf5d3002e5`;

  // fetch data based on the query provided by user
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data.data.results);
      let result = data.data.results[0];
      const { id, name, thumbnail } = result;

  // get local favorite character list from local storage
  let favoriteData = getStorage();

  let favorite = "favorite";
  // check searched character is already favorite or not
  for (let j = 0; j < favoriteData.length; j++) {
    if (result.id == favoriteData[j].id) {
      favorite = "UnFavorite";
      break;
    }
  }

    // create a chracter and append it to the container div of html
    let div = document.createElement("div");
    div.classList.add("charecter-card");
    div.setAttribute("id", id);
    let path = `../superheroHunter/charDetails.html#${id}`;
    div.innerHTML = `
      <img class="poster" src=${thumbnail.path}.jpg alt="">
      <div class="card-body">
        <a href=${path}>${name}</a>
        <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavorite(this)"/>
      </div>
    `;
    searchResult.appendChild(div);
  })
  // if any error occured while fetching data from api then display it on console
  .catch((error) => {
    console.error(error);
  });
});
