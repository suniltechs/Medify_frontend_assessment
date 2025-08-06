# 🎬 MovieFinder - Your Ultimate Movie Discovery App

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Click_Here!-brightgreen?style=for-the-badge&logo=vercel)](https://suniltechs.github.io/movie-finder)

<img src="./App Screenshots/1.png">

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
git clone https://github.com/suniltechs/medify_frontend_assessment.git
cd medify_frontend_assessment
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
  <div align="center"> 
     <img src="./App Screenshots/1.png" width="45%" alt="Desktop View"> 
     <img src="./App Screenshots/2.png" width="45%" alt="Mobile View"> 
     <img src="./App Screenshots/3.png" width="45%" alt="Search Results"> 
     <img src="./App Screenshots/4.png" width="45%" alt="Movie Details">
     <img src="./App Screenshots/5.png" width="90.5%" alt="Movie Details">
     <img src="./App Screenshots/app_collage.png" width="90.5%  alt="Movie Details">
     
  </div>

## 🧩 Project Structure
  ```
  movie-finder/
  ├── index.html         # Main application entry point
  ├── styles.css         # Modern CSS with animations
  ├── app.js             # Core application logic
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
- �  User authentication
- 💾 Local storage for favorites
- 🎥 YouTube trailer integration
- 📊 Advanced analytics dashboard
- 🌍 Multi-language support

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the project
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## Developer

Developed by [Sunil Sowrirajan](https://www.linkedin.com/in/sunil-sowrirajan-40548826b/)

[![GitHub](https://img.shields.io/badge/GitHub-Profile-blue?style=for-the-badge&logo=github)](https://github.com/suniltechs)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sunil-sowrirajan-40548826b/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Website-green?style=for-the-badge)](https://sunilsowrirajan.netlify.app/)

