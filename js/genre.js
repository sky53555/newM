let api_key = "e771164d62de82fa2de8fde83d339c37";

let box = document.querySelectorAll("#subSection1 li");

let genreName = document.querySelector("#genre"),
  romance = document.querySelector("#romance"),
  thriller = document.querySelector("#thriller"),
  fantasy = document.querySelector("#fantasy"),
  drama = document.querySelector("#drama");

// 영화 정보 가져오기
async function getMoviesByGenre(genreId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
  );
  const data = await response.json();
  return data.results;
}

// 특정 장르의 영화를 가져와서 표시하는 함수
async function handleGenreClick(genreId) {
  const movies = await getMoviesByGenre(genreId);
  console.log(movies);

  const movieContent = document.querySelector("#movieContent");
  const mainScreen = document.querySelector(".main");

  let result1 = "";
  let result2 = "";

  movies.slice(0, 8).forEach((movie) => {
    const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    result1 += `
            <li id = "movie-${movie.id}">
                <div class="imgWrap">
                    <span class="topIcon"><i class="fa-regular fa-heart"></i></span>
                    <img src="${imgUrl}" alt="Movie Poster" id="moviePoster" />
                </div>
                <div class="textWrap">
                    <div class="textTop">
                        <h2 id="movieName">${movie.title}</h2>
                        <div class="textDown">
                            <p><i class="fa-solid fa-star"></i><span id="rating">${movie.vote_average.toFixed(1)}</span></p>
                        </div>
                    </div>
                </div>
            </li>
        `;

    result2 = `
        <div class="mainImg">
        <img src="${imgUrl}" alt="" id="mainPoster" />
        <h3 class="mainText">${movie.title}</h3>
      </div>
        `;
  });

<<<<<<< HEAD:js/genre.js
  movieContent.innerHTML = result1;
  mainScreen.innerHTML = result2;
  console.log("장르구역")
=======
  movieContent.innerHTML = result1;
  mainScreen.innerHTML = result2;
>>>>>>> 52674069a504cdd8ead3702b0cedcdd191dacc57:js/custom_genre.js
}

// 로맨스 클릭 이벤트
romance.addEventListener("click", () => {
  handleGenreClick(10749);
  genreName.textContent = "로맨스";
  console.log("a");
});

// 스릴러 클릭 이벤트
thriller.addEventListener("click", () => {
  handleGenreClick([53, 27]);
  genreName.textContent = "공포·스릴러";
  console.log("b");
});

// 판타지 클릭 이벤트
fantasy.addEventListener("click", () => {
  handleGenreClick(14);
  genreName.textContent = "판타지";
  console.log("c");
});

// 드라마 클릭 이벤트
drama.addEventListener("click", () => {
  handleGenreClick(18);
  genreName.textContent = "드라마";
  console.log("d");
});

async function fetchMoviesByGenreId(genreId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=ko-KR&with_genres=${genreId}`
    );
    const data = await response.json();
    return data.results; // 결과를 반환
  } catch (error) {
    console.error("영화 목록을 가져오는 중 에러 발생:", error);
    return []; // 에러가 발생하면 빈 배열을 반환
  }
}

const dramaGenreId = 10749;
fetchMoviesByGenreId(dramaGenreId)
  .then((movies) => {
    console.log("드라마 장르의 영화 목록:", movies);
    const moviesList = document.querySelector(".movies");
    moviesList.innerHTML = ""; // 영화 목록 초기화

    // 처음 8개의 영화만 표시
    const moviesToShow = movies.slice(0, 8);
    moviesToShow.forEach((movie) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <div class="imgWrap">
            <span class="topIcon"><i class="fa-regular fa-heart"></i></span>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} 포스터" id="moviePoster" />
          </div>
          <div class="textWrap">
            <div class="textTop">
              <h2 id="movieName">${movie.title}</h2>
              <div class="textDown">
                <p>
                  <i class="fa-solid fa-star"></i><span id="rating">${movie.vote_average}</span>
                </p>
              </div>
            </div>
          </div>
        `;
      moviesList.appendChild(li); // 영화 목록에 추가
    });
  })
  .catch((error) => {
    console.error("영화 목록을 가져오는 중 에러 발생:", error);
  });
g