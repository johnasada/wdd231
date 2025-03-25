// DOM Elements
const hamburger = document.getElementById('hamburger');
const primaryNav = document.getElementById('primaryNav');
const currentYear = document.getElementById('currentyear');
const lastModified = document.getElementById('lastmodified');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    primaryNav.classList.toggle('show');
    hamburger.textContent = primaryNav.classList.contains('show') ? '✕' : '☰';
});

// Current Year
currentYear.textContent = new Date().getFullYear();

// Last Modified Date
lastModified.textContent = document.lastModified;

// Simplified Weather Display with PNG Icons
const weatherDisplay = {
    currentCity: "Your Town",
    currentTemp: 72, // Default temperature
    currentCondition: "Partly Cloudy",
    currentHumidity: 65,
    currentWind: 8,
    
    init() {
        // Set current date/year
        document.getElementById('currentyear').textContent = new Date().getFullYear();
        document.getElementById('lastmodified').textContent = document.lastModified;
        
        // Mobile menu toggle
        document.getElementById('hamburger').addEventListener('click', () => {
            const nav = document.getElementById('primaryNav');
            nav.classList.toggle('show');
            document.getElementById('hamburger').textContent = 
                nav.classList.contains('show') ? '✕' : '☰';
        });
        
        // Initialize weather if on home page
        if (document.querySelector('.weather')) {
            this.setupWeather();
        }
        
        // Initialize spotlights if needed
        if (document.querySelector('.spotlights')) {
            this.displaySpotlights();
        }
    },
    
    setupWeather() {
        // Set initial weather display
        this.updateWeatherDisplay();
        
        // Add temperature toggle
        const toggle = document.createElement('button');
        toggle.className = 'temp-toggle';
        toggle.textContent = '°F / °C';
        toggle.addEventListener('click', () => {
            const isFahrenheit = document.getElementById('temperature').textContent.includes('°F');
            this.updateWeatherDisplay(!isFahrenheit);
        });
        
        document.querySelector('.weather').appendChild(toggle);
        
        // Try to get location for more personalized display
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.currentCity = this.getCityFromCoords(position.coords);
                    this.updateWeatherLocation();
                },
                error => {
                    console.log("Geolocation not available, using default");
                }
            );
        }
    },
    
    updateWeatherDisplay(showCelsius = false) {
        const temp = showCelsius ? this.fahrenheitToCelsius(this.currentTemp) : this.currentTemp;
        const unit = showCelsius ? '°C' : '°F';
        const windUnit = showCelsius ? 'kph' : 'mph';
        
        document.getElementById('temperature').textContent = `${Math.round(temp)}${unit}`;
        document.getElementById('weather-description').textContent = this.currentCondition;
        document.getElementById('humidity').textContent = `${this.currentHumidity}%`;
        document.getElementById('wind-speed').textContent = `${this.currentWind} ${windUnit}`;
        
        // Set appropriate weather icon based on condition
        const icon = this.getWeatherIcon(this.currentCondition);
        document.getElementById('weather-icon').src = `images/weather-icons/${icon}.png`;
        document.getElementById('weather-icon').alt = this.currentCondition;
        
        // Update forecast
        this.displayForecast(showCelsius);
    },
    
    displayForecast(showCelsius = false) {
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '';
        
        // Simple forecast data
        const forecastData = [
            { day: 'Mon', condition: 'Sunny', high: 75, low: 58 },
            { day: 'Tue', condition: 'Partly Cloudy', high: 72, low: 56 },
            { day: 'Wed', condition: 'Rain', high: 68, low: 54 }
        ];
        
        forecastData.forEach(day => {
            const high = showCelsius ? this.fahrenheitToCelsius(day.high) : day.high;
            const low = showCelsius ? this.fahrenheitToCelsius(day.low) : day.low;
            const unit = showCelsius ? '°C' : '°F';
            
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            forecastCard.innerHTML = `
                <h4>${day.day}</h4>
                <img src="images/weather-icons/${this.getWeatherIcon(day.condition)}.png" alt="${day.condition}">
                <p>${Math.round(high)}${unit} / ${Math.round(low)}${unit}</p>
                <p class="forecast-desc">${day.condition}</p>
            `;
            forecastContainer.appendChild(forecastCard);
        });
    },
    
    getWeatherIcon(condition) {
        // Map conditions to PNG icon names
        const icons = {
            'Sunny': 'sun',
            'Partly Cloudy': 'partly-cloudy',
            'Cloudy': 'cloudy',
            'Rain': 'rain',
            'Thunderstorm': 'thunderstorm',
            'Snow': 'snow',
            'Fog': 'fog'
        };
        
        return icons[condition] || 'sun';
    },
    
    fahrenheitToCelsius(f) {
        return (f - 32) * 5/9;
    },
    
    getCityFromCoords(coords) {
        // Simple city detection based on coordinates
        if (coords.latitude > 40) return "Lagos";
        if (coords.latitude < 25) return "Abuja";
        if (coords.longitude < -100) return "Uyo";
        return "Port Harcourt";
    },
    
    updateWeatherLocation() {
        // Update the city name display
        const cityDisplay = document.getElementById('weather-city');
        if (cityDisplay) {
            cityDisplay.textContent = this.currentCity;
        }
        
        // Adjust weather based on location
        if (this.currentCity === "Lagos") {
            this.currentTemp = 85;
            this.currentCondition = "Sunny";
        } else if (this.currentCity === "Abuja") {
            this.currentTemp = 72;
            this.currentCondition = "Partly Cloudy";
        } else if (this.currentCity === "Uyo") {
            this.currentTemp = 68;
            this.currentCondition = "Cloudy";
        } else if (this.currentCity === "Port Harcourt") {
            this.currentTemp = 70;
            this.currentCondition = "Partly Cloudy";
        }
        
        this.updateWeatherDisplay();
    },
    
    displaySpotlights() {
        const spotlights = [
            {
                name: "ACE Hardware",
                description: "Your local hardware store with expert advice for all your home improvement needs.",
                image: "images/hardware.jpg",
                link: "#"
            },
            {
                name: "Finance Solution",
                description: "Personalized financial services to help you plan for the future.",
                image: "images/finance.jpg",
                link: "#"
            },
            {
                name: "Pine Ridge Diner",
                description: "Family-owned restaurant serving homemade meals since 1982.",
                image: "images/diner.jpg",
                link: "#"
            }
        ];

        const container = document.querySelector('.spotlight-cards');
        container.innerHTML = '';
        
        spotlights.forEach(business => {
            const card = document.createElement('div');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <a href="${business.link}">
                    <img src="${business.image}" alt="${business.name}" loading="lazy">
                    <div class="spotlight-content">
                        <h3>${business.name}</h3>
                        <p>${business.description}</p>
                        <span class="learn-more">Learn More →</span>
                    </div>
                </a>
            `;
            container.appendChild(card);
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    weatherDisplay.init();
});