var savedRestaurants = []; 

// Initialize the map
var map = L.map('map').setView([39.9526, -75.165222], 13);
// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add the geocoder control
const geocoder = L.Control.geocoder({
  defaultMarkGeocode: false,
}).on('markgeocode', function (e) {
  const { center, name, properties } = e.geocode;
  // Create a marker and add it to the map
  const marker = L.marker(center).addTo(map);
  // Bind a popup with the address information to the marker
  marker.bindPopup(`<form id="restaurant-form"><h2><b>${name.split(",")[0]}</b></h2><br><div class="field">
    <label class="label">Type of Restaurant</label><br>
    <div class="control">
      <input class="input" type="text" id="restaurant-type" placeholder="e.g Italian">
    </div>
  </div>
  <br>

   <button>Save</button></form>`).openPopup();

  // async function generateMapSearch(center, name, properties);

  const restaurantForm = document.getElementById('restaurant-form');
  restaurantForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    console.log('name:', name.split(",")[0]);
    console.log('address:', properties.address.house_number, properties.address.road, properties.address.city, properties.address.state, properties.address.postcode);
    console.log('longitude:', properties.lon);
    console.log('longitude:', properties.lat);
  
    const restaurantData = {
      name: name.split(",")[0],
      address: `${properties.address.house_number}, ${properties.address.road}, ${properties.address.city}, ${properties.address.state}, ${properties.address.postcode}`,
      longitude: properties.lon,
      latitude: properties.lat,
      type: document.querySelector('#restaurant-type').value,
      // review: document.querySelector('#restaurant-review').value,
    };
  
    try {
      const response = await fetch('/api/storeRestaurant', {
        method: 'POST',
        body: JSON.stringify(restaurantData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Restaurant saved successfully');
        loadSavedRestaurantsFromServer();
      } else {
        console.error('Error saving restaurant');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}).addTo(map);


// google street view tileLayer
var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
googleStreets.addTo(map);


// fetch saved restaurants
async function loadSavedRestaurantsFromServer() {
  try {
    const response = await fetch('/api/savedRestaurants');
    if (response.ok) {
      const savedRestaurants = await response.json();
      savedRestaurants.forEach((restaurant) => {
        // Create a marker for each saved restaurant and add it to the map
        const marker = L.marker([restaurant.latitude, restaurant.longitude]).addTo(map);
        marker.bindPopup(`<b>${restaurant.name}</b>`);
      });
    } else {
      console.error('Error fetching saved restaurants');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// console.log(savedRestaurants)

loadSavedRestaurantsFromServer();


// create markers of savedRestaurants
// savedRestaurants.forEach((restaurant) => {
//   const { name, latitude, longitude } = restaurant;
//   // Create a marker for each restaurant
//   const marker = L.marker([latitude, longitude]).addTo(map);
//   marker.bindPopup(`<b>${name}</b>`);

//   // const customIcon = L.icon({
//   //   iconUrl: 'path/to/icon.png',
//   //   iconSize: [32, 32], // Adjust icon size as needed
//   // });
//   // const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
// });