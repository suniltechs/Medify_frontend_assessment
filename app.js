// API Configuration
const API_KEY = "97edca92"; // Replace with your OMDb API key
const BASE_URL = "https://www.omdbapi.com/";

// DOM Elements
const searchBtn = document.getElementById("searchBtn");
const queryInput = document.getElementById("query");
const moviesContainer = document.getElementById("movies");
const trendingContainer = document.getElementById("trending-movies");
const resultsInfo = document.getElementById("results-info");
const movieModal = document.getElementById("movieModal");
const modalContent = document.getElementById("modal-content");
const closeModal = document.querySelector(".close-modal");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const sortBy = document.getElementById("sortBy");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const filterChips = document.querySelectorAll(".filter-chip");

// Trending movies (predefined for the trending section)
const trendingMovies = [
  "Oppenheimer",
  "Interstellar",
  "Dune: Part two",
  "Avatar: The way of water",
  "Avengers: Endgame",
  "The Batman",
  "Top Gun Maverick",
  "Deadpool & Wolverine",
  "Mad Max: Fury Road"
];

// Global variables for search state
let currentPage = 1;
let currentQuery = "";
let currentType = "all";
let totalResults = 0;

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Load trending movies when page loads
  loadTrendingMovies();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu if open
        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  });
});

// Search button click event
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const query = queryInput.value.trim();
  if (query) {
    currentPage = 1;
    searchMovies(query);
  }
});

// Search on Enter key press
queryInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = queryInput.value.trim();
    if (query) {
      currentPage = 1;
      searchMovies(query);
    }
  }
});

// Close modal when clicking the X button
closeModal.addEventListener("click", () => {
  movieModal.style.display = "none";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (e) => {
  if (e.target === movieModal) {
    movieModal.style.display = "none";
  }
});

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Sort by change event
sortBy.addEventListener("change", () => {
  if (currentQuery) {
    currentPage = 1;
    searchMovies(currentQuery);
  }
});

// Load more button click event
loadMoreBtn.addEventListener("click", loadMoreMovies);

// Filter chip click events
filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    currentType = chip.dataset.filter;
    if (currentQuery) {
      currentPage = 1;
      searchMovies(currentQuery);
    }
  });
});

/**
 * Fetches movie data from OMDb API based on search query
 * @param {string} query - The movie title to search for
 * @param {number} page - The page number to fetch
 */
async function searchMovies(query, page = 1) {
  try {
    currentQuery = query;
    currentPage = page;

    // Show loading state
    if (page === 1) {
      moviesContainer.innerHTML =
        '<div class="loading">Searching movies...</div>';
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.querySelector(".loading-spinner").style.display =
        "inline-block";
      loadMoreBtn.disabled = true;
    }

    // Build API URL
    let url = `${BASE_URL}?s=${encodeURIComponent(
      query
    )}&page=${page}&apikey=${API_KEY}`;

    // Add type filter if not 'all'
    if (currentType !== "all") {
      url += `&type=${currentType}`;
    }

    // Fetch data from API
    const response = await fetch(url);
    const data = await response.json();

    // Check for errors
    if (data.Response === "False") {
      if (page === 1) {
        resultsInfo.textContent = `No results found for "${query}"`;
        moviesContainer.innerHTML = "";
      }
      return;
    }

    // Store total results
    totalResults = parseInt(data.totalResults);

    // Display search info
    if (page === 1) {
      resultsInfo.textContent = `Found ${totalResults} results for "${query}"`;
      moviesContainer.innerHTML = "";
    }

    // Process movies
    let movies = data.Search;

    // Apply client-side sorting if needed
    if (sortBy.value === "rating") {
      // Fetch details for each movie to get ratings
      const detailedMovies = await Promise.all(
        movies.map(async (movie) => {
          const detailResponse = await fetch(
            `${BASE_URL}?i=${movie.imdbID}&apikey=${API_KEY}`
          );
          return await detailResponse.json();
        })
      );
      movies = detailedMovies.sort((a, b) => {
        const ratingA = a.imdbRating === "N/A" ? 0 : parseFloat(a.imdbRating);
        const ratingB = b.imdbRating === "N/A" ? 0 : parseFloat(b.imdbRating);
        return ratingB - ratingA;
      });
    } else if (sortBy.value === "title") {
      movies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortBy.value === "year_oldest") {
      movies.sort((a, b) => a.Year.localeCompare(b.Year));
    } else if (sortBy.value === "year") {
      movies.sort((a, b) => b.Year.localeCompare(a.Year));
    }

    // Display movies
    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);
    });

    // Show load more button if there are more results
    if (movies.length > 0 && movies.length * page < totalResults) {
      loadMoreBtn.style.display = "inline-flex";
    } else {
      loadMoreBtn.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    resultsInfo.textContent =
      "An error occurred while fetching movie data. Please try again.";
    if (page === 1) {
      moviesContainer.innerHTML = "";
    }
  } finally {
    if (page > 1) {
      loadMoreBtn.querySelector(".loading-spinner").style.display = "none";
      loadMoreBtn.disabled = false;
    }
  }
}

/**
 * Loads more movies for the current search
 */
async function loadMoreMovies() {
  currentPage++;
  await searchMovies(currentQuery, currentPage);

  // Smooth scroll to load more position
  setTimeout(() => {
    loadMoreBtn.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 300);
}

/**
 * Creates a movie card element
 * @param {Object} movie - The movie data
 * @returns {HTMLElement} The movie card element
 */
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  // Poster image or placeholder
  const poster = document.createElement("div");
  poster.className = "movie-poster";

  if (movie.Poster && movie.Poster !== "N/A") {
    const img = document.createElement("img");
    img.src = movie.Poster;
    img.alt = `${movie.Title} poster`;
    img.loading = "lazy";
    poster.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";
    placeholder.textContent = "No Poster Available";
    poster.appendChild(placeholder);
  }

  // Movie info
  const info = document.createElement("div");
  info.className = "movie-info";

  const title = document.createElement("h3");
  title.textContent = movie.Title;

  const year = document.createElement("p");
  year.className = "movie-year";
  year.textContent = movie.Year;

  // Type badge
  if (movie.Type && movie.Type !== "N/A") {
    const typeBadge = document.createElement("div");
    typeBadge.className = "movie-type";
    typeBadge.textContent = movie.Type;
    info.appendChild(typeBadge);
  }

  info.appendChild(title);
  info.appendChild(year);

  card.appendChild(poster);
  card.appendChild(info);

  // Add click event to show movie details
  card.addEventListener("click", () => {
    showMovieDetails(movie.imdbID);
  });

  return card;
}

/**
 * Loads trending Spider-Man movies with carousel functionality
 */
async function loadTrendingMovies() {
  try {
    // Clear previous content
    trendingContainer.innerHTML = "";

    // Create movie cards
    const moviePromises = trendingMovies.map((title) =>
      fetch(
        `${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
      ).then((response) => response.json())
    );

    const movies = await Promise.all(moviePromises);

    // Filter out failed responses and create cards
    const validMovies = movies.filter((movie) => movie.Response === "True");

    if (validMovies.length === 0) {
      trendingContainer.innerHTML =
        '<div class="error">No trending movies found.</div>';
      return;
    }

    // Create cards
    validMovies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      trendingContainer.appendChild(movieCard);
    });

    // Initialize carousel
    initCarousel();
  } catch (error) {
    console.error("Error loading trending movies:", error);
    trendingContainer.innerHTML =
      '<div class="error">Failed to load trending movies.</div>';
  }
}

/**
 * Initializes the trending movies carousel
 */
function initCarousel() {
  const carousel = document.querySelector(".trending-movies");
  const dotsContainer = document.querySelector(".carousel-dots");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const movieCards = document.querySelectorAll(".trending-movies .movie-card");

  if (movieCards.length === 0) return;

  // Calculate how many cards are visible based on screen size
  const getVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 576) return 1;
    if (width < 768) return 2;
    if (width < 992) return 3;
    return 4;
  };

  let visibleCards = getVisibleCards();
  let currentIndex = 0;
  const totalSlides = Math.ceil(movieCards.length / visibleCards);

  // Create dots
  const createDots = () => {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = "carousel-dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => scrollToIndex(i));
      dotsContainer.appendChild(dot);
    }
  };

  // Scroll to specific index
  const scrollToIndex = (index) => {
    currentIndex = index;
    const cardWidth = movieCards[0].offsetWidth + 30; // Include gap
    const scrollPosition = cardWidth * visibleCards * index;
    carousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    updateControls();
  };

  // Update control states
  const updateControls = () => {
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalSlides - 1;
  };

  // Navigation handlers
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      scrollToIndex(currentIndex + 1);
    }
  });

  // Handle window resize
  window.addEventListener("resize", () => {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
      visibleCards = newVisibleCards;
      createDots();
      updateControls();
    }
  });

  // Initialize
  createDots();
  updateControls();
}

/**
 * Fetches and displays detailed information for a specific movie
 * @param {string} imdbID - The IMDb ID of the movie
 */
async function showMovieDetails(imdbID) {
  try {
    // Show loading state in modal
    modalContent.innerHTML =
      '<div class="loading">Loading movie details...</div>';
    movieModal.style.display = "block";

    // Fetch detailed movie data
    const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
    const movie = await response.json();

    // Check for errors
    if (movie.Response === "False") {
      modalContent.innerHTML =
        '<div class="error">Failed to load movie details.</div>';
      return;
    }

    // Create and display movie details
    modalContent.innerHTML = createMovieDetails(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    modalContent.innerHTML =
      '<div class="error">An error occurred while loading movie details.</div>';
  }
}

/**
 * Creates HTML for detailed movie information
 * @param {Object} movie - The detailed movie data
 * @returns {string} HTML string of movie details
 */
function createMovieDetails(movie) {
  return `
    <div class="movie-details">
      <div class="top-section">
        <div class="poster">
          ${
            movie.Poster && movie.Poster !== "N/A"
              ? `<img src="${movie.Poster}" alt="${movie.Title} poster" loading="lazy">`
              : '<div class="placeholder">No Poster Available</div>'
          }
        </div>
        <div class="info">
          <h2>${movie.Title} (${movie.Year})</h2>
          <div class="meta">
            ${
              movie.Rated && movie.Rated !== "N/A"
                ? `<span><i class="fas fa-certificate"></i> ${movie.Rated}</span>`
                : ""
            }
            ${
              movie.Runtime && movie.Runtime !== "N/A"
                ? `<span><i class="fas fa-clock"></i> ${movie.Runtime}</span>`
                : ""
            }
            ${
              movie.imdbRating && movie.imdbRating !== "N/A"
                ? `<span><i class="fas fa-star"></i> ${movie.imdbRating}/10</span>`
                : ""
            }
          </div>
          <div class="plot">
            <h3>Plot</h3>
            <p>${movie.Plot}</p>
          </div>
          <div class="details">
            ${
              movie.Director && movie.Director !== "N/A"
                ? `
            <div class="detail-item">
              <h4>Director</h4>
              <p>${movie.Director}</p>
            </div>`
                : ""
            }
            ${
              movie.Writer && movie.Writer !== "N/A"
                ? `
            <div class="detail-item">
              <h4>Writer</h4>
              <p>${movie.Writer}</p>
            </div>`
                : ""
            }
            ${
              movie.Actors && movie.Actors !== "N/A"
                ? `
            <div class="detail-item">
              <h4>Actors</h4>
              <p>${movie.Actors}</p>
            </div>`
                : ""
            }
            ${
              movie.Genre && movie.Genre !== "N/A"
                ? `
            <div class="detail-item">
              <h4>Genre</h4>
              <p>${movie.Genre}</p>
            </div>`
                : ""
            }
            ${
              movie.Language && movie.Language !== "N/A"
                ? `
            <div class="detail-item">
              <h4>Language</h4>
              <p>${movie.Language}</p>
            </div>`
                : ""
            }
            ${
              movie.Country && movie.Country !== "N/A"
                ? `
            <div class="detail-item">
              <h4>Country</h4>
              <p>${movie.Country}</p>
            </div>`
                : ""
            }
            ${
              movie.Awards && movie.Awards !== "N/A"
                ? `
            <div class="detail-item">
              <h4>Awards</h4>
              <p>${movie.Awards}</p>
            </div>`
                : ""
            }
          </div>
        </div>
      </div>
      ${
        movie.Ratings && movie.Ratings.length > 0
          ? `
      <div class="ratings">
        <h3>Ratings</h3>
        <div class="ratings-grid">
          ${movie.Ratings.map(
            (rating) => `
          <div class="rating-item">
            <h4>${rating.Source}</h4>
            <p>${rating.Value}</p>
          </div>
          `
          ).join("")}
        </div>
      </div>`
          : ""
      }
    </div>
  `;
}