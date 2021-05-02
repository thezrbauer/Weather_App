//This can access the location of the user, pushing that information to the console.
let lat, lon;




if ('geolocation' in navigator)  {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition( async position => {
   let lat, lon;
   try {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);
    const api_url = `/weather/${lat},${lon}`;
    //const api_url = '/weather'
    const response = await fetch(api_url);
    const json = await response.json();
    document.getElementById('summary').textContent = json.weather[0].main;
    document.getElementById('temperature').textContent = json.main.temp;
    document.getElementById('wind_speed').textContent = json.wind.speed;
    
    let locationIcon = document.querySelector('.weather-icon');
     const {icon} = json.weather[0]
     locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
    



    console.log(json);
  } catch(error){
    document.getElementById('temperature').textContent = 'no data available'
    console.log(error);
 }
 //submit data to database... 
   const data = {lat, lon};
   const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
  },
     body: JSON.stringify(data)
 };
   const db_response = await fetch('/api', options)
   const db_json = await  db_response.json();
   console.log(db_json);

});
}  else{
  console.log('gelocation not available');
}






