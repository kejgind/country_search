
document.getElementById('getForm').addEventListener('submit', searchCountries);

function searchCountries(e){
  e.preventDefault();

  let countryName = document.getElementById('country-name').value;

  if(!countryName.length) {
    countryName = 'Poland';
  }

  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://restcountries.eu/rest/v2/name/'+countryName, true);

  xhr.onload = function(){
    if(this.status == 200){
      console.log(this.responseText);

      let countries = JSON.parse(this.responseText);

      var output = '';
      for(let i in countries){
        for(let cur in countries[i].currencies){
          output +=
            `<h2>List of selected countries</h2>
            <ul>
            <li>Name: ${countries[i].name}</li>
            <li>Native Name: ${countries[i].nativeName}</li>
            <li>Country code: ${countries[i].alpha2Code}</li>
            <li>Flag: <img src="${countries[i].flag}" style="width:150px;"></li>
            <li>Capital: ${countries[i].capital}</li>
            <li>Region: ${countries[i].region}</li>
            <li>Subregion: ${countries[i].subregion}</li>
            <li>Population: ${countries[i].population}</li>
            <li>Currency: ${countries[i].currencies[cur].name} (${countries[i].currencies[cur].code})</li>
            </ul>`;
        }
      }
      document.getElementById('countries').innerHTML = output;
    }
  }

  xhr.onerror = function(){
    console.log('Request Error...');
  }

  xhr.send();

  document.forms["getForm"].reset();
}
