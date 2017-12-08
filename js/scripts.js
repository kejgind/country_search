
document.getElementById('getForm').addEventListener('submit', searchCountries);

function searchCountries(e){
  e.preventDefault();

  let countryName = document.getElementById('country-name').value;
  const subHead = document.getElementById('sub-header');

  if(!countryName.length) {
    countryName = 'Poland';
  }

  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://restcountries.eu/rest/v2/name/'+countryName, true);

  xhr.onload = function(){
    if(this.status == 200){
      // console.log(this.responseText);

      let countries = JSON.parse(this.responseText);

      var output = '';
      for(let i in countries){
        for(let k in countries[i].currencies){
          output +=
            `
            <div class="country">
            <div class="ctr-flag"><img src="${countries[i].flag}"></div>
            <div class="ctr-name-wrapper">
              <h3>Name: ${countries[i].name}</h3>
              <p>Native Name: ${countries[i].nativeName}</p>
              <p>Country code: ${countries[i].alpha2Code}</p>
            </div>
            <p class="ctr-cap">Capital: ${countries[i].capital}</p>
            <div class="ctr-reg-wrapper">
              <p class="ctr-reg">Region: ${countries[i].region}</p>
              <p class="ctr-subreg">Subregion: ${countries[i].subregion}</p>
            </div>
            <p class="ctr-pop">Population: ${countries[i].population}</p>
            <p class="ctr-cur">Currency: ${countries[i].currencies[k].name} (${countries[i].currencies[k].code})</p>
            </div>
            `;
        }
      }
      subHead.classList.remove('hidden');
      document.getElementById('countries-wrapper').innerHTML = output;
    }
  }

  xhr.onerror = function(){
    console.log('Request Error...');
  }

  xhr.send();

  document.forms["getForm"].reset();
}
