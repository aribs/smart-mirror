var app = angular.module("smart_mirror", []); 
app.controller("mirror", function($scope, $interval) {
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
});