# 🎬 MovieFinder - Your Ultimate Movie Discovery App

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Click_Here!-brightgreen?style=for-the-badge&logo=vercel)](https://suniltechs.github.io/movie-finder)
[![GitHub Stars](https://img.shields.io/github/stars/suniltechs/movie-finder?style=social)](https://github.com/suniltechs/movie-finder/stargazers)

![MovieFinder Hero Banner](https://i.pinimg.com/1200x/42/00/da/4200dae9ac7b15a5c65375cbfaceaa69.jpg)

A modern, responsive web application for discovering movies with beautiful UI and seamless experience powered by OMDb API.

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔍 Smart Search | Instant search with title suggestions |
| 🎞️ Media-rich Cards | Beautiful movie cards with posters and details |
| 📱 Responsive Design | Flawless experience on all devices |
| ⚡ Fast Performance | Optimized API calls and smooth animations |
| 🔄 Real-time Updates | Dynamic content loading without page refresh |

## 🛠 Tech Stack

**Frontend:**
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)

**APIs & Libraries:**
![OMDb API](https://img.shields.io/badge/-OMDb_API-black)
![Font Awesome](https://img.shields.io/badge/-Font_Awesome-528DD7?logo=fontawesome)
![Google Fonts](https://img.shields.io/badge/-Google_Fonts-4285F4?logo=googlefonts)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/suniltechs/movie-finder.git
   cd movie-finder
   ```
2. **Get API Key**
   - Register at OMDb API
   - Add your key in app.js:
     ```
     const API_KEY = "your_api_key_here"; // 🔑 Add your key here
     ```
3. **Launch the app**
   - Simply open index.html in your browser

## 📸 App Screenshots
  <div align="center"> <img src="assets/desktop-view.png" width="45%" alt="Desktop View"> <img src="assets/mobile-view.png" width="45%" alt="Mobile View"> <img src="assets/search-results.png" width="45%" alt="Search Results"> <img src="assets/movie-details.png" width="45%" alt="Movie Details"> </div>

## 🧩 Project Structure
  ```
  movie-finder/
  ├── index.html         # Main application entry point
  ├── styles.css         # Modern CSS with animations
  ├── app.js             # Core application logic
  ├── assets/            # Images and screenshots
  │   ├── desktop-view.png
  │   ├── mobile-view.png
  │   └── ...
  └── README.md          # Project documentation
  ```

## API Usage

| Endpoint | Description |
|---------|-------------|
| GET /?s={query} | Search movies by title |
| GET /?i={imdbID} | Get detailed movie info |

  - Example API Call:
    ```
    fetch(`https://www.omdbapi.com/?s=inception&apikey=${API_KEY}`)
    .then(response => response.json())
    .then(data => console.log(data));
    ```
## 🏆 Challenges Overcome

| Challenge | Solution |
|---------|-------------|
| API Rate Limiting | Implemented response caching |
| Complex Sorting | Parallel API requests with Promise.all |
| Mobile Carousel | CSS scroll-snap with JS controls |
| Modal UX | Multiple close methods (click, ESC, button) |

## 🔮 Future Roadmap
