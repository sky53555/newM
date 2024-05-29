let recent = document.querySelector("#recent")



//내용
async function RecentGenre() {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=ko-KR&page=1`
    );

    const data = await response.json();
    console.log(data);

    const boxArray = Array.from(box);
    console.log(boxArray);

    const movieContent = document.querySelector("#movieContent");

    let result = "";

    data.results.forEach((movie, index) => {
        const listItem = boxArray[index];
        const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        const vote = movie.vote_average.toFixed(1)
        const title = movie.title



        result += `
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
    });
    movieContent.innerHTML = result;
}

recent.addEventListener("click", () => {
    RecentGenre();
    genreName.textContent = "최신 영화";
});



