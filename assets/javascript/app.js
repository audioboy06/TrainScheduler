// Javascript file for Timesheet Exercise

// Initialize Firebase
  
  var config = {
    apiKey: "AIzaSyCCbxnLbLHAqILaBcqw16IMp5QH1sIWPUk",
    authDomain: "undergroundtimer.firebaseapp.com",
    databaseURL: "https://undergroundtimer.firebaseio.com",
    projectId: "undergroundtimer",
    storageBucket: "",
    messagingSenderId: "626462798713"
  };


  firebase.initializeApp(config);

    var database = firebase.database();

    var name = "";
    var orig = "";
    var dest = "";
    var firstTime = "";
    var frequency = "";


// Click Event
$("#add-train-button").on("click", function(event) {

// Prevents screen refresh
    event.preventDefault();

// Get values from input boxes
    trnName = $("#inputName").val();
    trnOrig = $("#inputOrig").val();
    trnDest = $("#inputDest").val();
    trnFT = $("#inputFirstTime").val();
    trnFreq = $("#inputFrequency").val();
    
    var newTrn = {
        name: trnName,
        orig: trnOrig,
        dest: trnDest,
        firstTime: trnFT,
        frequency: trnFreq
    };

    database.ref().push(newTrn);

    console.log("name: ", newTrn.name);
    console.log("origination: ", newTrn.orig);
    console.log("destination: ", newTrn.dest);
    console.log("first time: ", newTrn.firstTime);
    console.log("frequency: ", newTrn.frequency);

    // ALERT
    // alert("Train Successfully Added!");

    // Clears input boxes
    $("#inputName").val("")
    $("#inputOrig").val("")
    $("#inputDest").val("")
    $("#inputFirstTime").val("")
    $("#inputFrequency").val("")
    
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
      console.log(childSnapshot.val());

      var trnName = childSnapshot.val().name;
      var trnOrig = childSnapshot.val().orig;
      var trnDest = childSnapshot.val().dest;
      var trnFT = childSnapshot.val().firstTime;
      var trnFreq = childSnapshot.val().frequency

      // Train Info
      console.log(trnName);
      console.log(trnOrig);
      console.log(trnDest);
      console.log(trnFT);
      console.log(trnFreq);
    
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trnFT, "hh:mm").subtract(1, "years");
    console.log("FIRST TIME: " + firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trnFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trnFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // Add each train's data into the table
  $("#train-table > tbody").append(
  "<tr><td>" + trnName + 
  "</td><td>" + trnOrig + 
  "</td><td>" + trnDest + 
  "</td><td>" + trnFreq + 
  "</td><td>" + moment(nextTrain).format("hh:mm") + 
  "</td><td>" + tMinutesTillTrain + 
  "</td></tr>");

});
