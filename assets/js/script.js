// Display the current day at the top of the calender when a user opens the planner
var currentDay = moment();
$('#currentDay').text(currentDay.format("dddd, MMMM Do"));

// Present timeblocks for standard business hours when the user scrolls down.
for (var i = 9; i < 18; i++) {
    var row = $('<div class="row">');
    var timeblock = $('<div class="col-1 hour">');
    timeblock.text(i);
    // Color-code each timeblock based on past, present, and future when the timeblock is viewed.
    var currentHour = parseInt(currentDay.hour());
    var currentTime = 'past'; //Past
    // Allow a user to enter an event when they click a timeblock
    if(i === currentHour) { // Present        
        currentTime = 'present" contenteditable="true';
    } else if(i > currentHour) { // Future  
        currentTime = 'future" contenteditable="true';
    }
    //If there's something for that hour on localStorage, pre-populate the div
    if(localStorage.getItem(i)){
        var eventSpace = $('<div class="col-10 event-description '+currentTime+'">'+localStorage.getItem(i)+'</div>');
    } else {
        var eventSpace = $('<div class="col-10 event-description '+currentTime+'"></div>');
    }
    // Create buttons
    var icon = $('<i class="fas fa-3x fa-save p-3"></i>');
    var saveBtn = $('<div class="col-1 saveBtn"></div>');
    // Append eventSpace to timeblock and timeblock to container
    saveBtn.append(icon);
    row.append(timeblock, eventSpace, saveBtn);
    $(".container").append(row);
}

// Save the event in local storage when the save button is clicked in that timeblock
// Persist events between refreshes of a page
// Get the time correspondent of the save button clicked, delegate event to the parent row and get value stored on correspondent hour and event-description divs
function handleEventPersistence(event) {
    var btnClicked = $(event.target);
    var parent = btnClicked.parent().parent();
    var hour = parent.children(".hour").text();
    var event = parent.children(".event-description").text();
    localStorage.setItem(hour, event);
}

var clickedRow = $(".row");
clickedRow.on("click", ".saveBtn", handleEventPersistence);