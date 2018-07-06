$(document).ready(function () {
    // Firebase configuration
    var config = {
        apiKey: "AIzaSyCS_9h3uKISks5RAsJx_gZaI5Voa7LU7Kk",
        authDomain: "train-time-5e96c.firebaseapp.com",
        databaseURL: "https://train-time-5e96c.firebaseio.com",
        projectId: "train-time-5e96c",
        storageBucket: "train-time-5e96c.appspot.com",
        messagingSenderId: "1051750918211"
    };
    firebase.initializeApp(config);

    //variables
    var database = firebase.database();
    //var currentTime = moment();

    // submit button function
    $('#submit').on('click', function () {
        event.preventDefault();
        var trainName = $('#trainName').val().trim();
        var destination = $('#destination').val().trim();
        var trainTime = moment($('#trainTime').val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $('#frequency').val().trim();

        //clear fields after submit
        $('#trainName').val('');
        $('#destination').val('');
        $('#trainTime').val('');
        $('#frequency').val('');

        //database push
        database.ref('/').push({
            trainName,
            destination,
            trainTime,
            frequency,
        })
    })

    // listener for new train
    database.ref('/').on('child_added', function (childSnapshot) {
        //console.log(childSnapshot.val());

        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().trainTime;
        var frequency = childSnapshot.val().frequency;

        var remainder = moment().diff(moment.unix(trainTime), "minutes") % frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, "m").format("hh:mm A");

        // console.log(remainder);
        // console.log(minutes);
        // console.log(arrival);

        //append data to new row
        var newRow = $('<tr>');
        newRow.append($('<td>').html(trainName));
        newRow.append($('<td>').html(destination));
        newRow.append($('<td>').html(trainTime));
        newRow.append($('<td>').html(frequency));
        newRow.append($('<td>').html(arrival));
        newRow.append($('<td>').html(minutes));

        $('#tbody').append(newRow);
    })


})