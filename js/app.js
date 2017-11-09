var app = angular.module("smart_mirror", ['ngSanitize']); 
app.controller("mirror", function($scope, $interval, $http) {
	$scope.updateClock = function () {
		var date = new Date;	        
        var minutes = date.getMinutes();
		var hour = date.getHours();
		$scope.hour = hour + ":" + minutes;
		document.getElementById("clock").innerHTML = $scope.hour;
	    setTimeout($scope.updateClock, 1000);
	}
    $scope.getDate = function () {
    	var date = new Date(Date.now());
    	$scope.dayName = $scope.getDayName(date);
    	$scope.dateSpanish = $scope.dayName + ", " + date.toLocaleDateString('es-ES');
    }
    $scope.getDayName = function (date) {
    	var day = date.getDay();
    	switch(day){
    		case 1: 
    			return "Lunes";
    		break;
    		case 2: 
    			return "Martes";
    		break;
    		case 3: 
    			return "Miércoles";
    		break;
    		case 4: 
    			return "Jueves";
    		break;
    		case 5: 
    			return "Viernes";
    		break;
    		case 6: 
    			return "Sábado";
    		break;
    		case 7: 
    			return "Domingo";
    		break;
    	}
    }
    $scope.getWeather = function () {
    	var promise = $http.get('https://api.darksky.net/forecast/542f611761769e690dcda585aa4fb53d/40.395700,-3.668861');
    	promise.then(function (data){
    		console.log(data.data)
    		$scope.temperature = '<i class="wi wi-thermometer"></i> ' + $scope.getCelsius(data.data.currently.temperature) + '<i class="wi wi-celsius"></i>';
    		$scope.weatherIcon = $scope.getWeatherIcon(data.data.currently.icon);
    		$scope.InfoWeather = $scope.moreInfoWeather(data.data.currently);
    	})
    }
    $scope.getCelsius = function (farenheit) {
    	return Math.round((farenheit - 32) / 1.8 * 100) / 100;
    }
    $scope.getWeatherIcon = function (weather) {
    	switch (weather) {
    		case 'clear-day':
    			return '<h1><i class="wi wi-day-sunny"></i> Día Despejado</h1>';
    		break;
    		case 'clear-night':
    			return '<h1><i class="wi wi-night-clear"></i> Noche Despejada</h1>';
    		break;
    		case 'rain':
    			return '<h1><i class="wi wi-rain"></i> Lluvia</h1>';
    		break;
    		case 'snow':
    			return '<h1><i class="wi wi-snow"></i> Nieve</h1>';
    		break;
    		case 'sleet':
    			return '<h1><i class="wi wi-sleet"></i> Aguanieve</h1>';
    		break;
    		case 'wind':
    			return '<h1><i class="wi wi-windy"></i> Viento</h1>';
    		break;
    		case 'fog':
    			return '<h1><i class="wi wi-fog"></i> Niebla</h1>';
    		break;
    		case 'cloudy':
    			return '<h1><i class="wi wi-cloudy"></i> Nublado</h1>';
    		break;
    		case 'partly-cloudy-day':
    			return '<h1><i class="wi wi-day-cloudy-high"></i>Parcialmente Nublado</h1>';
    		break;
    		case 'partly-cloudy-night':
    			return '<h1><i class="wi wi-night-alt-cloudy-high"></i>Parcialmente Nublado</h1>';
    		break;
    	}
    }
    $scope.moreInfoWeather = function (weatherInfo) {
    	return '<h5><i class="wi wi-umbrella"></i> Probabilidad ' + weatherInfo.precipProbability + ' % Intensidad ' + weatherInfo.precipIntensity + ' <i class="wi wi-cloud-down"></i> Velocidad ' + weatherInfo.windSpeed + ' <i class="wi wi-strong-wind"></i></h5>';
    }
});