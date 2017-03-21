var queryWeather = "";
var dataQuery = "";
var units = "&units=metric";
var dataMetric = true;
var appId = "&APPID=061f24cf3cde2f60644a8240302983f2";
var dataTemp = 0;
var dataMainWeather = "";
var items = ["rain", "sun", "drizzle", "clouds", "snow", "clear", "thunderstom"];

var getRequest = $.getJSON('http://ipinfo.io', function (data) {
  dataQuery = data.city + ',' + data.country;
  queryWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + dataQuery + units + appId;
  console.log(dataQuery);
  $('#city').text(dataQuery);

  $.getJSON(queryWeather, function (res) {
    dataTemp = Math.round(res.main["temp"]);
    // dataMainWeather = res.weather[0]["main"];
    dataMainWeather = items[Math.floor(Math.random()*items.length)];
    $('#temp').text(dataTemp);
    $('#description').text(res.weather[0]["description"].capitalize());
    console.log("The weather of " + dataQuery + " :");
    console.log(res.weather[0]["main"].capitalize());
    console.log(res.main["temp"]);
    console.log("Random dataMainWeather: " + dataMainWeather.capitalize());
    getImgMainWeather(dataMainWeather.capitalize());
  });
});

$(document).ready(function() {
  $('#label-units').on('click', function () {
    dataMetric = !dataMetric;
    changeUnits();
  });
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function changeUnits() {
  var dataTempF = Math.round(dataTemp * 1.8 + 32);
  if (dataMetric) {
    $('#label-units').text('C');
    $('#temp').text(dataTemp);
  } else {
    $('#label-units').text('F');
    $('#temp').text(dataTempF);
  }
  console.log(dataMetric);
}

function getImgMainWeather(dataWeather) {
  switch (dataWeather) {
    case "Rain":
      $("#dataWeather").addClass("rain");
      break;
    case "Sun":
      $("#dataWeather").addClass("sun");
      break;
    case "Drizzle":
      $("#dataWeather").addClass("drizzle");
      break;
    case "Clouds":
      $("#dataWeather").addClass("clouds");
      break;
    case "Snow":
      $("#dataWeather").addClass("snow");
      break;
    case "Clear":
      $("#dataWeather").addClass("clear");
      break;
    case "Thunderstom":
      $("#dataWeather").addClass("thunderstom");
      break;
    default:
      $("#dataWeather").addClass("sun");
  }
}
