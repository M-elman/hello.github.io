var socket = io.connect('http://localhost:8002');
socket.on('connect', function (data) {
    // convert the json string into a valid javascript object
      socket.emit('storeClientInfo', {customID: $.cookie("userID")})
      
   });
   
socket.on('notification', function (data) {
 // convert the json string into a valid javascript object
   var _data = JSON.parse(data);
   console.log(data);
   notifyMe(_data)
});

function notifyMe(obj) {
  var options = {
    body: new Date(obj.event.metaData["timestamp"]).toLocaleDateString("en-US",{day:"numeric", month:"short", year:"numeric", minute:"numeric", hour:"numeric"}),
    icon: "../exclamation.png"
}

switch(obj.event.metaData["operation_type"]) {
  case "Hypoxic Attack":
      options.icon = "../hypoxia.png";
      break;
  case "Heart Attack":
      options.icon = "../heart_attack.png";
      break;
  case "Epileptic Attack":
      options.icon = "../epilepsy.png";
      break;
  default:
      options.icon = "../exclamation.png";
} 
    //ADD ONCLICK EVENT ON NOTIFICATIONS
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("New event from " + capitalizeFirstLetter(getParameterByName('name', obj.event.metaData["id_utente"])) + " " + capitalizeFirstLetter(getParameterByName('surname', obj.event.metaData["id_utente"])), options);
      
      notification.addEventListener('click', function() {
        populateEventModalNotification(obj);
        
    })
      //notification.on("click",populateEventModal);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("New event from " + capitalizeFirstLetter(getParameterByName('name', obj.event.metaData["id_utente"])) + " " + capitalizeFirstLetter(getParameterByName('surname', obj.event.metaData["id_utente"])), options);          //var notification = new Notification("New event from " + obj.event.metaData["id_utente"], options);
          notification.addEventListener('click', function() {
            populateEventModalNotification(obj);
          })
        }
      });
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.



}

function getParameterByName(parameterName, fullID) {
  parameterName = parameterName.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + parameterName + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(fullID);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}