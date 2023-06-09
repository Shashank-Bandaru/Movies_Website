const API_KEY = 'api_key=6ad84e5a8343bef07056ef99d3ff45b6';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;



const genres = {28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",
36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37 : "Western",138:"No genre" };
//These genre id : "name" pairs are taken from the TMDB website and I added an extra pair i.e. 138 : "No genre" inorder to take care of the cases where the
// fetched genre_id array is empty.

var container = document.getElementById('container');
var search = document.getElementById("search");
const btn = document.getElementById('submission');

getMovies(API_URL);

async function getMovies(url){
    var resp = await fetch(url);
    var res=await resp.json();
     console.log(res);
    showMovies(res.results);
}


function showMovies(data){
        container.innerHTML=``;
        if(data.length==0){
         container.innerHTML = `<div ><h1>OOPS - ERROR : 404  </h2>
         <p style="font size : 1.9em;">The searched movie cannot be found please enter a valid movie name.</p></div>`
        }else{
     data.forEach(movie => {
        const {title , poster_path,genre_ids,overview} = movie;
        let id1;
        if(genre_ids.length!=0)
         {id1 = genre_ids[0];}
         else{
           id1=138;
         }
        if(poster_path!=null){
        container.innerHTML+=
               `<div class="movie-item"> 
                    <a href="#">
                        <img src="${IMG_URL+poster_path}" alt="image">
                        <div class = "rating">
                        <i class="material-icons" style="color : white ;background : transparent; font-size: 2.2vmin;">star</i>
                        <i class="material-icons" style="color : white ;background : transparent; font-size: 2.2vmin;">star</i>
                        <i class="material-icons" style="color : white ;background : transparent; font-size: 2.2vmin;">star</i>
                        <i class="material-icons" style="color : white ;background : transparent; font-size: 2.2vmin;">star</i>
                        <i class="material-icons" style="color : white ;background : transparent; font-size: 2.2vmin;">star</i>
                        </div>
                        <div class = "genre">${genres[id1]}</div> 
                        <strong>${title}</strong>
                        <div class="overview"><b>Overview</b> <br/>${overview}</div>
                    </a>
               </div> 
            `  
        }
    });
   }
}

//You can either press the enter key or click on the search icon to perform search action

search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
   let searchTerm = search.value;
     if(searchTerm.length!=0){
        getMovies(searchURL+"&query="+searchTerm);
     }
     else{
        getMovies(API_URL);
     }
    }
  });

btn.addEventListener("click",(event)=>
{
   event.preventDefault();
   let searchTerm = search.value;
     if(searchTerm.length!=0){
        getMovies(searchURL+"&query="+searchTerm);
     }
     else{
        getMovies(API_URL);
     }
});
