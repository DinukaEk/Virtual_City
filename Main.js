// Global variables
const tooltip = document.getElementById('tooltip');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const cityContainer = document.getElementById('cityContainer');

let isNightMode = false;
let trafficCount = 0;
let isDragging = false;
let startX, startY, currentX = 0, currentY = 0;

// Available vehicle images for dynamic traffic
const vehicleImages = [
    './Resources/vehicles/Asset 297@2x.png',
    './Resources/vehicles/Asset 298@2x.png',
    './Resources/vehicles/Asset 299@2x.png',
    './Resources/vehicles/Asset 300@2x.png',
    './Resources/vehicles/Asset 301@2x.png',
    './Resources/vehicles/Asset 302@2x.png'
];

// Initialize the city when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCity();
});

// Initialize the city
function initializeCity() {
    setupTooltips();
    setupModal();
    setupDragging();
    setupRandomElements();
    setupBuildingEffects();
    setupVehicleEffects();
    setupKeyboardShortcuts();
    optimizePerformance();
    showWelcomeMessage();
}

// Tooltip functionality
function setupTooltips() {
    document.addEventListener('mousemove', (e) => {
        if (tooltip) {
            tooltip.style.left = e.clientX + 10 + 'px';
            tooltip.style.top = e.clientY + 10 + 'px';
        }
    });

    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = e.target.closest('[data-tooltip]').getAttribute('data-tooltip');
            if (tooltip && tooltipText) {
                tooltip.textContent = tooltipText;
                tooltip.classList.add('show');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.classList.remove('show');
            }
        });
    });
}

// Modal functionality
function setupModal() {
    document.querySelectorAll('[data-info]').forEach(element => {
        element.addEventListener('click', (e) => {
            const targetElement = e.target.closest('[data-info]');
            const info = targetElement.getAttribute('data-info');
            const tooltipText = targetElement.getAttribute('data-tooltip');
            
            if (info && modal && modalTitle && modalContent) {
                modalTitle.textContent = tooltipText || 'Information';
                modalContent.textContent = info;
                modal.classList.add('show');
            }
        });
    });

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// City controls
function toggleDayNight() {
    isNightMode = !isNightMode;
    document.body.classList.toggle('night-mode', isNightMode);
    
    const btn = document.querySelector('.controls button');
    if (btn) {
        btn.textContent = isNightMode ? '☀️ Day Mode' : '🌙 Night Mode';
    }
}

function addTraffic() {
    trafficCount++;
    const newCar = document.createElement('div');
    newCar.className = 'vehicle dynamic-car';
    newCar.setAttribute('data-tooltip', `Traffic Car ${trafficCount}`);
    
    // Create image element
    const img = document.createElement('img');
    img.src = vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
    img.alt = 'Vehicle';
    img.style.height = '100%';
    img.style.width = '100%';
    
    newCar.appendChild(img);
    
    // Random positioning and animation
    const animations = ['car-animation1', 'car-animation2', 'car-animation3', 'car-animation4', 'car-animation5', 'car-animation6'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    const animationDuration = 5 + Math.random() * 10;
    
    newCar.style.top = Math.random() * 80 + 10 + '%';
    newCar.style.left = Math.random() * 80 + 10 + '%';
    newCar.style.animation = `${randomAnimation} ${animationDuration}s linear infinite`;
    
    if (cityContainer) {
        cityContainer.appendChild(newCar);
    }
    
    // Add tooltip functionality to new car
    newCar.addEventListener('mouseenter', (e) => {
        const tooltipText = e.target.closest('[data-tooltip]').getAttribute('data-tooltip');
        if (tooltip && tooltipText) {
            tooltip.textContent = tooltipText;
            tooltip.classList.add('show');
        }
    });
    
    newCar.addEventListener('mouseleave', () => {
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    });
}

function resetCity() {
    // Remove all dynamically added cars
    document.querySelectorAll('.dynamic-car').forEach(car => {
        car.remove();
    });
    
    // Remove random elements
    document.querySelectorAll('.random-element').forEach(element => {
        element.remove();
    });
    
    trafficCount = 0;
    
    // Reset to day mode
    if (isNightMode) {
        toggleDayNight();
    }
    
    // Reset city position
    currentX = 0;
    currentY = 0;
    if (cityContainer) {
        cityContainer.style.transform = 'translate(0px, 0px)';
    }
}

function closeModal() {
    if (modal) {
        modal.classList.remove('show');
    }
}

// City dragging functionality
function setupDragging() {
    if (!cityContainer) return;
    
    cityContainer.addEventListener('mousedown', (e) => {
        // Don't drag if clicking on interactive elements
        if (e.target.closest('.building, .vehicle, .plant, .controls')) {
            return;
        }
        
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        
        // Limit dragging range
        currentX = Math.max(Math.min(currentX, 200), -200);
        currentY = Math.max(Math.min(currentY, 200), -200);
        
        if (cityContainer) {
            cityContainer.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Random elements functionality
function setupRandomElements() {
    setInterval(() => {
        if (Math.random() < 0.15) { // 15% chance every 3 seconds
            addRandomElement();
        }
    }, 3000);
}

function addRandomElement() {
    const elements = ['🌸', '🦋', '🐦', '⭐', '🌟', '🌺', '🍃', '✨'];
    const element = document.createElement('div');
    element.className = 'random-element';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.position = 'absolute';
    element.style.top = Math.random() * 100 + '%';
    element.style.left = Math.random() * 100 + '%';
    element.style.fontSize = Math.random() * 15 + 15 + 'px';
    element.style.animation = 'float 10s linear forwards';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '2';
    element.style.opacity = '0.8';
    
    if (cityContainer) {
        cityContainer.appendChild(element);
    }
    
    // Remove after animation
    setTimeout(() => {
        if (element.parentNode) {
            element.remove();
        }
    }, 10000);
}

// Welcome message
function showWelcomeMessage() {
    setTimeout(() => {
        if (modal && modalTitle && modalContent) {
            modalTitle.textContent = 'Welcome to Virtual City!';
            modalContent.textContent = 'Click on buildings to learn more about them. Use the controls to switch between day and night mode, add more traffic, or reset the city. You can also drag the city around to explore different areas! Hover over any element to see tooltips.';
            modal.classList.add('show');
        }
    }, 1000);
}

// Enhanced building interactions
function setupBuildingEffects() {
    const buildings = document.querySelectorAll('.building');
    
    buildings.forEach(building => {
        building.addEventListener('mouseenter', () => {
            // Add a subtle glow effect
            building.style.filter = 'brightness(1.2) drop-shadow(0 8px 20px rgba(255, 255, 255, 0.3))';
        });
        
        building.addEventListener('mouseleave', () => {
            building.style.filter = '';
        });
    });
}

// Enhanced vehicle interactions
function setupVehicleEffects() {
    const vehicles = document.querySelectorAll('.vehicle');
    
    vehicles.forEach(vehicle => {
        vehicle.addEventListener('click', () => {
            // Add a honk sound effect (visual feedback)
            vehicle.style.transform = 'scale(1.1)';
            setTimeout(() => {
                vehicle.style.transform = '';
            }, 200);
        });
    });
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        switch(e.key.toLowerCase()) {
            case 'n':
                toggleDayNight();
                break;
            case 't':
                addTraffic();
                break;
            case 'r':
                resetCity();
                break;
            case 'escape':
                closeModal();
                break;
        }
    });
}

// Performance optimization
function optimizePerformance() {
    // Reduce animations when many elements are present
    const observer = new MutationObserver((mutations) => {
        const totalElements = document.querySelectorAll('.vehicle, .random-element').length;
        
        if (totalElements > 20) {
            // Reduce animation frequency for better performance
            document.querySelectorAll('.random-element').forEach(element => {
                if (Math.random() < 0.5) {
                    element.remove();
                }
            });
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Weather effects
function addWeatherEffect(type) {
    const weatherContainer = document.createElement('div');
    weatherContainer.className = `weather-effect ${type}`;
    weatherContainer.style.position = 'fixed';
    weatherContainer.style.top = '0';
    weatherContainer.style.left = '0';
    weatherContainer.style.width = '100%';
    weatherContainer.style.height = '100%';
    weatherContainer.style.pointerEvents = 'none';
    weatherContainer.style.zIndex = '50';
    
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'weather-drop';
        drop.style.position = 'absolute';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        if (type === 'rain') {
            drop.style.width = '2px';
            drop.style.height = '10px';
            drop.style.background = 'linear-gradient(to bottom, transparent, #4FC3F7)';
            drop.style.animation = 'rainFall 2s linear infinite';
        } else if (type === 'snow') {
            drop.style.width = '4px';
            drop.style.height = '4px';
            drop.style.background = 'white';
            drop.style.borderRadius = '50%';
            drop.style.animation = 'snowFall 3s linear infinite';
        }
        
        weatherContainer.appendChild(drop);
    }
    
    document.body.appendChild(weatherContainer);
    
    // Remove weather after 10 seconds
    setTimeout(() => {
        weatherContainer.remove();
    }, 10000);
}

// Traffic light system
function createTrafficLight() {
    const trafficLight = document.createElement('div');
    trafficLight.className = 'traffic-light';
    trafficLight.style.position = 'absolute';
    trafficLight.style.top = '30%';
    trafficLight.style.left = '45%';
    trafficLight.style.width = '20px';
    trafficLight.style.height = '60px';
    trafficLight.style.background = '#333';
    trafficLight.style.borderRadius = '10px';
    trafficLight.style.zIndex = '15';
    
    const lights = ['red', 'yellow', 'green'];
    lights.forEach((color, index) => {
        const light = document.createElement('div');
        light.className = `light ${color}`;
        light.style.width = '12px';
        light.style.height = '12px';
        light.style.borderRadius = '50%';
        light.style.margin = '2px auto';
        light.style.background = color === 'red' ? '#ff4444' : 
                                color === 'yellow' ? '#ffff44' : '#44ff44';
        light.style.opacity = '0.3';
        trafficLight.appendChild(light);
    });
    
    if (cityContainer) {
        cityContainer.appendChild(trafficLight);
    }
    
    // Traffic light cycle
    let currentLight = 0;
    setInterval(() => {
        trafficLight.querySelectorAll('.light').forEach(light => {
            light.style.opacity = '0.3';
        });
        trafficLight.querySelectorAll('.light')[currentLight].style.opacity = '1';
        currentLight = (currentLight + 1) % 3;
    }, 2000);
}

// Sound effects simulation (visual feedback)
function playSound(type) {
    const soundIndicator = document.createElement('div');
    soundIndicator.className = 'sound-indicator';
    soundIndicator.textContent = type === 'honk' ? '🔊' : '🎵';
    soundIndicator.style.position = 'fixed';
    soundIndicator.style.top = '20px';
    soundIndicator.style.right = '20px';
    soundIndicator.style.fontSize = '24px';
    soundIndicator.style.zIndex = '100';
    soundIndicator.style.opacity = '0';
    soundIndicator.style.animation = 'soundPulse 1s ease-in-out';
    
    document.body.appendChild(soundIndicator);
    
    setTimeout(() => {
        soundIndicator.remove();
    }, 1000);
}

// Add day/night cycle
function startDayNightCycle() {
    setInterval(() => {
        toggleDayNight();
    }, 30000); // Toggle every 30 seconds
}

// Add population counter
function updatePopulation() {
    const populationCounter = document.createElement('div');
    populationCounter.className = 'population-counter';
    populationCounter.style.position = 'fixed';
    populationCounter.style.bottom = '20px';
    populationCounter.style.right = '20px';
    populationCounter.style.background = 'rgba(255, 255, 255, 0.9)';
    populationCounter.style.padding = '10px';
    populationCounter.style.borderRadius = '5px';
    populationCounter.style.fontSize = '14px';
    populationCounter.style.zIndex = '100';
    
    const buildings = document.querySelectorAll('.building').length;
    const vehicles = document.querySelectorAll('.vehicle').length;
    const plants = document.querySelectorAll('.plant').length;
    
    populationCounter.innerHTML = `
        <div>🏢 Buildings: ${buildings}</div>
        <div>🚗 Vehicles: ${vehicles}</div>
        <div>🌳 Plants: ${plants}</div>
    `;
    
    document.body.appendChild(populationCounter);
}

// Initialize additional features
setTimeout(() => {
    createTrafficLight();
    updatePopulation();
}, 2000);

// Add CSS animations for weather effects
const style = document.createElement('style');
style.textContent = `
    @keyframes rainFall {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes snowFall {
        0% { transform: translateY(-100vh) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
    }
    
    @keyframes soundPulse {
        0%, 100% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);