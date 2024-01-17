
    // Initialize the map
    var map = L.map('map').setView([39.9526, -75.165222], 13);
    // Add a tile layer (you can use your preferred tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    // Add the geocoder control
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false, // Prevent automatic marker placement on geocoded address
    }).on('markgeocode', function (e) {
      // Extract the geocoded information
      const { center, name, properties } = e.geocode;
      // Create a marker and add it to the map
      const marker = L.marker(center).addTo(map);
      // Bind a popup with the geocoded address information to the marker
      marker.bindPopup(`<form id="restaurant-form"><h2><b>${name.split(",")[0]}</b></h2><br><div class="field">
    <label class="label">Type of Restaurant</label><br>
    <div class="control">
      <input class="input" type="text" placeholder="e.g Italian">
    </div>
  </div>
  <br>
  <div class="field"><label class="label">Review</label><br>
      <textarea class="textarea" placeholder="e.g. It was good."></textarea><br><br>
   <button>Save</button></form>`).openPopup();
      // Execute your function with the geocoded information
      generateMapSearch(center, name, properties);
    // this function shoud create a post request to save the restaurant data and the review
    const restaurantForm = document.getElementById('restaurant-form');
    restaurantForm.onSubmit = function(f) {
      console.log(f);
    };
    }).addTo(map);
    // Function to run when an address is geocoded
    function generateMapSearch(center, name, properties) {
      // Your logic here
      console.log('Geocoded Address:', name);
      console.log('Coordinates:', center);
      console.log('Properties:', properties);
      // pull up the form
      // add the save button
    };
  
      // google street view tileLayer
      var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
      googleStreets.addTo(map);