export default {
    name: "storeComp",
    pop: false,
    user: null,
    password: null,
    redirect: false,
    api_requests: {
        temp : "http://activetrackerv1.herokuapp.com/api/getTemperature.php?user=",
        hum : "http://activetrackerv1.herokuapp.com/api/getTemperature.php?user=",
        loc: "http://activetrackerv1.herokuapp.com/api/getLocation.php?user=",
        imu: "http://activetrackerv1.herokuapp.com/api/getIMU.php?user="

    }
    
}