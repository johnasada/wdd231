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
// Business Directory Data
const businesses = [
    {
        name: "Summit Outdoor Gear",
        address: "40 Accra Street, Your Town",
        phone: "+234 123-4567",
        website: "https://summitoutdoor.com",
        image: "images/businesses/outdoor.jpg",
        category: "retail",
        description: "Your one-stop shop for all outdoor adventure equipment and apparel."
    },
    {
        name: "Pine Valley Café",
        address: "456 Abacha Road, Abuja",
        phone: "+234 234-5678",
        website: "https://pinevalleycafe.com",
        image: "images/businesses/cafe.jpg",
        category: "restaurant",
        description: "Locally-sourced ingredients in a cozy atmosphere. Famous for our homemade pies!"
    },
    {
        name: "Horizon Accounting",
        address: "789 Business Plaza, Suite 101, Abuja",
        phone: "+234 345-6789",
        website: "https://horizonaccounting.com",
        image: "images/businesses/finance.jpg",
        category: "service",
        description: "Full-service accounting and tax preparation for businesses and individuals."
    },
    {
        name: "Green Valley Landscaping",
        address: "32 Garden Lane, Abuja",
        phone: "+234 456-7890",
        website: "https://greenvalleylandscaping.com",
        image: "images/businesses/land-scaping.jpg",
        category: "service",
        description: "Professional landscaping services with sustainable practices."
    },
    {
        name: "Community Youth Center",
        address: "20 Hope Street, Abuja",
        phone: "+234 567-8901",
        website: "https://communityyouth.org",
        image: "images/businesses/youth.jpg",
        category: "nonprofit",
        description: "Providing programs and activities for local youth since 1995."
    },
    {
        name: "Peak Performance Physical Therapy",
        address: "64 Health Way, Abuja",
        phone: "+234 678-9012",
        website: "https://peakperformancept.com",
        image: "images/businesses/pt.jpg",
        category: "health",
        description: "Helping you recover and reach your physical potential."
    },
    {
        name: "Main Street Books",
        address: "87 Downtown Plaza, Abuja",
        phone: "+234 789-0123",
        website: "https://mainstreetbooks.com",
        image: "images/businesses/books.jpg",
        category: "retail",
        description: "Independent bookstore featuring local authors and book clubs."
    },
    {
        name: "Blue Sky Dental",
        address: "53 Mpape, Abuja",
        phone: "+234 890-1234",
        website: "https://blueskydental.com",
        image: "images/businesses/dentist.jpg",
        category: "health",
        description: "Comprehensive dental care for the whole family."
    },
    {
        name: "The Rustic Table",
        address: "159 Gwarimpa Rd, Abuja",
        phone: "+234 901-2345",
        website: "https://therustictable.com",
        image: "images/businesses/restaurant.jpg",
        category: "restaurant",
        description: "Farm-to-table dining featuring seasonal, locally-sourced ingredients."
    }
];

// DOM Elements
const directoryContainer = document.getElementById('directory-container');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');

// Initialize Directory
function initDirectory() {
    displayBusinesses(businesses);
    
    // Event Listeners
    gridViewBtn.addEventListener('click', () => {
        directoryContainer.classList.remove('directory-list');
        directoryContainer.classList.add('directory-grid');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', () => {
        directoryContainer.classList.remove('directory-grid');
        directoryContainer.classList.add('directory-list');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
    
    categoryFilter.addEventListener('change', filterBusinesses);
    searchInput.addEventListener('input', filterBusinesses);
}

// Display Businesses
function displayBusinesses(businessArray) {
    directoryContainer.innerHTML = '';
    
    if (businessArray.length === 0) {
        directoryContainer.innerHTML = '<p class="no-results">No businesses match your search criteria.</p>';
        return;
    }
    
    businessArray.forEach(business => {
        const businessCard = document.createElement('div');
        businessCard.className = 'business-card';
        
        // Format category for display
        const categoryDisplay = {
            'retail': 'Retail',
            'restaurant': 'Restaurant',
            'service': 'Service',
            'nonprofit': 'Non-Profit',
            'health': 'Health & Wellness'
        };
        
        businessCard.innerHTML = `
            <img src="${business.image}" alt="${business.name}" loading="lazy">
            <div class="card-content">
                <span class="category">${categoryDisplay[business.category]}</span>
                <h3>${business.name}</h3>
                <p class="description">${business.description}</p>
                <p class="address">${business.address}</p>
                <p class="phone">${business.phone}</p>
                <p class="website">Website: <a href="${business.website}" target="_blank">${business.website.replace(/^https?:\/\//, '')}</a></p>
            </div>
        `;
        
        directoryContainer.appendChild(businessCard);
    });
}

// Filter Businesses
function filterBusinesses() {
    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    const filtered = businesses.filter(business => {
        // Category filter
        if (category !== 'all' && business.category !== category) {
            return false;
        }
        
        // Search term filter
        if (searchTerm) {
            return (
                business.name.toLowerCase().includes(searchTerm) ||
                business.description.toLowerCase().includes(searchTerm) ||
                business.category.toLowerCase().includes(searchTerm)
            );
        }
        
        return true;
    });
    
    displayBusinesses(filtered);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDirectory);