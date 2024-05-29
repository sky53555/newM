// const API_KEY = "e771164d62de82fa2de8fde83d339c37";

// async function viewMovie(movieId) {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
//     );

//     const data = await response.json();
//     console.log(data);
//     displayMovieDetails(data);
//   } catch (error) {
//     console.error("에러 발생:", error);
//   }
// }

// // 영화 정보 표시 함수
// function displayMovieDetails(movie) {
//   const movieDetails = {
//     movieName: "title",
//     rating: "vote_average",
//     release: "release_date",
//     duration: "runtime",
//     introduction: "overview",
//     age: "",
//     etc: "",
//     director: "director",
//     cast: "cast",
//     trailers: "video",
//   };

//   for (const key in movieDetails) {
//     if (movieDetails.hasOwnProperty(key)) {
//       const element = movieDetails[key];
//       const spanElement = document.getElementById(key);
//       if (movie[element]) {
//         spanElement.textContent = movie[element];
//       } else {
//         spanElement.textContent = "정보 없음";
//       }
//     }
//   }
//   let posterUrl = movies.poster_path;
//   let posterImg = document.createElement("img");
//   posterImg.src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
//   posterImg.alt = movies.title + " Poster";
//   posterImg.style.maxWidth = "70%";
//   posterImg.style.maxHeight = "600px";
//   document.getElementById("poster").appendChild(posterImg);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const movieId = urlParams.get("id");

//   if (movieId) {
//     viewMovie(movieId);
//   } else {
//     console.error("영화 ID가 없습니다.");
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieId = urlParams.get("id");

  if (movieId) {
    viewMovie(movieId);
  } else {
    console.error("영화 ID가 없습니다.");
  }
});

const API_KEY = "e771164d62de82fa2de8fde83d339c37";
async function viewMovie(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
    );

    const data = await response.json();
    console.log(data);
    displayMovieDetails(data);

    // 가져온 영화 정보를 사용하여 필요한 작업 수행
    // 예를 들어, 상세 정보를 화면에 표시하는 등의 작업
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

// 영화 정보 표시 함수
function displayMovieDetails(movie) {
  const movieDetails = {
    movieName: "title",
    rating: "vote_average",
    release: "release_date",
    introduction: "overview",
  };
  //li막으면 안나옴

  // 각 정보를 표시하는 반복문
  for (const key in movieDetails) {
    if (movieDetails.hasOwnProperty(key)) {
      const element = movieDetails[key];
      const spanElement = document.getElementById(key);
      if (movie[element]) {
        spanElement.textContent = movie[element];
      } else {
        spanElement.textContent = "정보 없음";
      }
    }
  }

  const poster = document.getElementById("poster");
  poster.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500/${movie.poster_path}")`;
}
async function viewMovie(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
    );

    const data = await response.json();
    console.log(data);
    displayMovieDetails(data);

    // 가져온 영화 정보를 사용하여 필요한 작업 수행
    // 예를 들어, 상세 정보를 화면에 표시하는 등의 작업
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

// 최신 영화 클릭 이벤트 핸들러 추가
const movieContent = document.querySelector("#movieContent");
movieContent.addEventListener("click", (event) => {
  const target = event.target.closest("li");
  if (!target) return; // 클릭된 요소가 li가 아니면 무시

  const movieId = target.dataset.movieId;
  if (movieId) {
    viewMovie(movieId);
  }
});
