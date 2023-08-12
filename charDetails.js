window.onload = function(){

// select the container in which the fetched data is displayed.
let charecterDetails = document.getElementById("char-details");

// taking the id from the current window url
let windowUrl = window.location.href;
let id = windowUrl.substring(windowUrl.lastIndexOf('#')+1);

// getting charecter details by using id.
let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=63e371f33e0a750b73f58c598fdf0223&hash=22b3f7dd7a13addb7057decf5d3002e5`;
fetch(url)
   .then((response) =>{
    // console.log(response.json());
    return response.json();
   })
   .then((data) =>{                       
    console.log(data.data.results);              // displaying the charecter details
     let charecter = data.data.results[0];
     let { name , description , thumbnail } = charecter;
     let div = document.createElement('div');
     div.classList.add('char-info');

     div.innerHTML=`
        <div class="poster">
           <img src="${thumbnail.path}.jpg" alt="no image found">
        </div>
        <div class="info">
            <h2>${name}</h2>
            <p>${description || "Description not found"}</p>
        </div>
     `;
     charecterDetails.innerHTML = "";
     charecterDetails.appendChild(div);

   })

   .catch((error) => {
    console.error(error);
  });

}