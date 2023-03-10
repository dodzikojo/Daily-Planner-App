//Set the current date
$('#currentDay').text(setGreeting() + "! It's " + moment().format('dddd, MMMM Do'))

//Get the current hour
let currentHour = moment().format('h A')
let allHours = getHours_CreateTimeBlocks()
getSaveditem(allHours)



function getHours_CreateTimeBlocks() {
    const items = [];
    new Array(24).fill().forEach((acc, index) => {
        hR = moment({ hour: index });

        if (hR.isSameOrAfter(moment().hour(8)) & hR.isSameOrBefore(moment().hour(17))) {
            items.push(hR.format('h A'));
            let hourBlockId = hR.format('h A') //Set to 12 Hour format

            if (currentHour === hourBlockId) {
                createTimeBlock(hourBlockId, "present")
            } else if (hR.isSameOrBefore(moment().hour(currentHour))) {
                createTimeBlock(hourBlockId, "past")
            } else {
                createTimeBlock(hourBlockId, "future")
            }
        }
    })
    return items;
}


//Create the time block using a loop
//Apply a color class based on .past .present .future
function createTimeBlock(hourBlockId, textAreaClass) {
    var hourBlockId = hR.format('h A') //Set to 12 Hour format
    let newTimeBlockDivEl = $("<div>", {
        class: "row time-block",
    });

    let hourTextEl = $("<p>", {
        class: "pt-2 col-1 hour",
        text: hourBlockId
    })

    let textAreaEl = $("<textarea>", {
        id: hourBlockId.replace(" ", "") + "TextArea",
        class: "textArea col-10 " + textAreaClass,
    }).attr({
        "placeholder": "Add text",

    })

    let saveBtnEl = $("<button>", {
        class: "col-1 saveBtn",
        id: hourBlockId.replace(" ", ""),
    })

    let saveBtnIconEl = $("<i>", {
        id: hourBlockId.replace(" ", "")+"Icon",
        class: "fas fa-save"
    })
    hourTextEl.appendTo(newTimeBlockDivEl);
    textAreaEl.appendTo(newTimeBlockDivEl);
    saveBtnIconEl.appendTo(saveBtnEl)
    saveBtnEl.appendTo(newTimeBlockDivEl);
    newTimeBlockDivEl.appendTo('#time-blocks');

}

//Save button event.
$(document).on("click", ".saveBtn", saveBtnClick);

//TextArea change event.
$(document).change("#textArea", function (evt) {
    $("#" + evt.target.id.replace("TextArea", "")).addClass("unsavedBtn");
});


//Clear all button event. This clears all text
$("#clear-all-btn").on("click", clearAllBtnClick);

//Function to clear all for each hour
function clearAllBtnClick(evt) {
    Swal.fire({
        title: 'Are you sure you want to clear all saved entries?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            allHours.forEach(hour => {
                $("#" + hour.replace(" ", "") + 'TextArea').val("")
                localStorage.removeItem(moment().format('L').replaceAll("/", "-") + "-" + hour.replace(" ", ""))
            });
            Swal.fire('Schedule Cleared!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Schedule not cleared!', '', 'info')
        }
    })

}

//Uses the time to set greeting to Good Morning/ Good Afternoon/ Good Evening
function setGreeting() {
    let hrs = moment().hour();
    let mins = moment().minute();
    let greet;


    if (hrs >= 5 && ((hrs == 5 && mins >= 30) || (hrs > 5 && hrs < 12)))
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs < 18)
        greet = 'Good Afternoon';
    else if ((hrs >= 18 && hrs < 24) || hrs > 0)
        greet = 'Good Evening';
    else
        greet = 'Error';

    return greet;
}

//Function to save the text
async function saveBtnClick(evt) {
    let textAreaEl
    let targetId

    targetId = evt.target.id.replace("Icon", "")
    textAreaEl = $("#" + targetId + "TextArea")
    let saveBtnEl = $("#"+targetId)

    let message = textAreaEl.val();

    if (saveBtnEl.hasClass('unsavedBtn')) {
        saveBtnEl.removeClass("unsavedBtn");
    }

    localStorage.setItem(moment().format('L').replaceAll("/", "-") + "-" + targetId, message)

    await Toast.fire({
        icon: 'success',
        title: 'Entry Saved!'
    })
}


function getSaveditem(hoursArr) {
    hoursArr.forEach(hour => {
        $("#" + hour.replace(" ", "") + 'TextArea').val(localStorage.getItem(moment().format('L').replaceAll("/", "-") + "-" + hour.replace(" ", "")))
    });
}

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true
})


