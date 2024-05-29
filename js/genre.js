let api_key = "e771164d62de82fa2de8fde83d339c37";

let genreName = document.querySelector("#genre"),
  romance = document.querySelector("#romance"),
  thriller = document.querySelector("#thriller"),
  fantasy = document.querySelector("#fantasy"),
  drama = document.querySelector("#drama");

let morebutton = document.querySelector(".more");

let currentPage = 1;
let moviesFetched = 0;
const moviesPerPage = 8;

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
  movieContent.innerHTML = result1;
  mainScreen.innerHTML = result2;
  console.log("장르구역")
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
    const mainsScreen = document.querySelector(".main")
    moviesList.innerHTML = ""; // 영화 목록 초기화
    mainsScreen.innerHTML = "";

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
    // .catch ((error) => {
    //   console.error("영화 목록을 가져오는 중 에러 발생:", error);
    // });


  });


// "더보기" 버튼 클릭 이벤트
morebutton.addEventListener("click", async () => {
  currentPage++;
  const genreId = getCurrentGenreId();
  const movies = await getMoviesByGenre(genreId);
  renderMoreMovies(movies.slice(moviesFetched, moviesFetched + moviesPerPage));
  moviesFetched += moviesPerPage;
});

// 현재 선택된 장르의 ID를 가져오는 함수
function getCurrentGenreId() {
  if (romance.classList.contains("active")) {
    return 10749; // 로맨스
  } else if (thriller.classList.contains("active")) {
    return [53, 27]; // 공포·스릴러
  } else if (fantasy.classList.contains("active")) {
    return 14; // 판타지
  } else if (drama.classList.contains("active")) {
    return 18; // 드라마
  }
}

// 추가 영화를 렌더링하는 함수
function renderMoreMovies(movies) {
  const movieContent = document.querySelector("#movieContent");
  let result = "";
  movies.forEach((movie) => {
    const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    result += `
      <li id="movie-${movie.id}">
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
  });
  movieContent.innerHTML += result;
}

// 장르 버튼 클릭 이벤트에서 현재 활성화된 장르를 표시하는 함수를 수정합니다.
function setActiveGenreButton(button) {
  const genreButtons = [romance, thriller, fantasy, drama];
  genreButtons.forEach((btn) => {
    if (btn === button) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// 장르 버튼 클릭 이벤트 함수를 수정하여 "더보기" 버튼도 갱신합니다.
romance.addEventListener("click", async () => {
  setActiveGenreButton(romance);
  genreName.textContent = "로맨스";
  currentPage = 1;
  const movies = await getMoviesByGenre(10749);
  renderMovies(movies.slice(0, moviesPerPage));
  moviesFetched = moviesPerPage;
  morebutton.style.display = "block"; // "더보기" 버튼 표시
});

thriller.addEventListener("click", async () => {
  setActiveGenreButton(thriller);
  genreName.textContent = "공포·스릴러";
  currentPage = 1;
  const movies = await getMoviesByGenre([53, 27]);
  renderMovies(movies.slice(0, moviesPerPage));
  moviesFetched = moviesPerPage;
  morebutton.style.display = "block"; // "더보기" 버튼 표시
});

fantasy.addEventListener("click", async () => {
  setActiveGenreButton(fantasy);
  genreName.textContent = "판타지";
  currentPage = 1;
  const movies = await getMoviesByGenre(14);
  renderMovies(movies.slice(0, moviesPerPage));
  moviesFetched = moviesPerPage;
  morebutton.style.display = "block"; // "더보기" 버튼 표시
});

drama.addEventListener("click", async () => {
  setActiveGenreButton(drama);
  genreName.textContent = "드라마";
  currentPage = 1;
  const movies = await getMoviesByGenre(18);
  renderMovies(movies.slice(0, moviesPerPage));
  moviesFetched = moviesPerPage;
  morebutton.style.display = "block"; // "더보기" 버튼 표시
});
