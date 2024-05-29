let api_key = "e771164d62de82fa2de8fde83d339c37";

let recent = document.querySelector("#recent");
let genreName = document.querySelector("#genre");
let box = [];

let currentPage = 1;
let moviesFetched = 0;
const moviesPerPage = 8;

async function getMovies(page) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=ko-KR&page=${page}`
    );
    const data = await response.json();
    return data.results;
}

function renderMovies(movies, container) {
    const movieContent = document.querySelector("#movieContent");
    const mainScreen = document.querySelector(".main");

    let result1 = "";
    let result2 = "";

    movies.forEach((movie, index) => {
        const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        const vote = movie.vote_average.toFixed(1);
        const title = movie.title;

        result1 += `
            <li>
                <div class="imgWrap">
                    <span class="topIcon"><i class="fa-regular fa-heart"></i></span>
                    <img src="${imgUrl}" alt="Movie Poster" id="moviePoster" />
                </div>
                <div class="textWrap">
                    <div class="textTop">
                        <h2 id="movieName">${title}</h2>
                        <div class="textDown">
                            <p><i class="fa-solid fa-star"></i><span id="rating">${vote}</span></p>
                        </div>
                    </div>
                </div>
            </li>
        `;

        result2 = `
                <div class="mainImg">
                    <img src="${imgUrl}" alt="" id="mainPoster" />
                    <h3 class="mainText">${title}</h3>
                </div>
            `;

    });
    movieContent.innerHTML = result1;
    mainScreen.innerHTML = result2;

    // container.insertAdjacentHTML('beforeend', result1);
    genreName.textContent = "최신 영화";
    console.log("최신구역")
}

(async function () {
    const movies = await getMovies(currentPage);
    renderMovies(movies.slice(0, moviesPerPage), document.getElementById('movieContent'));
    moviesFetched += moviesPerPage;
})();

recent.addEventListener("click", async () => {
    const movies = await getMovies(currentPage);
    renderMovies(movies.slice(0, moviesPerPage), document.getElementById('movieContent'));
    genreName.textContent = "최신 영화";
});