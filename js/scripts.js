// scripts.js

$(document).ready(function(){

  "use strict";

  var countryName = $('#country-name').val('');
  var url = 'https://restcountries.eu/rest/v2/name/';
  var countriesList = $('#countries');

  function searchCountries() {
    countryName = $('#country-name').val();
    if(!countryName.length) {countryName = 'Poland'};

    $.ajax({
      url: url + countryName,
      method: 'GET',
      success: showCountriesList
    });
  }

  $('#search').on('click', function(){
    searchCountries();
    countryName = $('#country-name').val('');
  });

  function showCountriesList(resp) {
    countriesList.empty();
    resp.forEach(function(item) {
      $('<li>').text(item.name + ', ' + item.capital + ', ' + item.subregion).appendTo(countriesList);
    });
  }

});


