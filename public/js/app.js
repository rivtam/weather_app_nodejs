
const weatherForm = document.querySelector('form');
const searchItem = document.querySelector('input');
const weatherOne = document.querySelector('#weather-results');
const weatherTwo = document.querySelector('#weather-error');

weatherForm.addEventListener('submit', (e) => {
  weatherTwo.textContent = '';
  if(searchItem.value === ''){
    weatherOne.textContent = 'Please enter a city name or postal code';
  } else {
    weatherOne.textContent = 'Loading ...';
    fetch(`/weather?address=${searchItem.value}`).then((response) => {
      response.json().then((data) => {
       if (data.error) {
         weatherOne.textContent = data.error;
       } else {
        weatherOne.textContent = data.place;
        weatherTwo.textContent = `Temperature: ${data.temp} degrees celsius. ${data.summary}`;
       }
      })
    })
 
  }
  e.preventDefault();
});