//Set the current date
$('#currentDay').text(moment().format('dddd, MMMM Do'))

//Get the current hour
let currentHour = moment().format('h A')
let allHours = getHours_CreateTimeBlocks()
getSaveditem(allHours)

console.log(allHours)

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})


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
        class: "col-1 hour",
        text: hourBlockId
    })

    let textAreaEl = $("<textarea>", {
        id: hourBlockId.replace(" ", "") + "TextArea",
        class: "col-10 " + textAreaClass,
    }).attr({
        "placeholder": "Add text",

    })

    let saveBtnEl = $("<button>", {
        class: "col-1 saveBtn",
        id: hourBlockId.replace(" ", ""),
    })

    let icon = $("<i>", {
        class: "fas fa-save"
    })
    hourTextEl.appendTo(newTimeBlockDivEl);
    textAreaEl.appendTo(newTimeBlockDivEl);
    icon.appendTo(saveBtnEl)
    saveBtnEl.appendTo(newTimeBlockDivEl);
    newTimeBlockDivEl.appendTo('#time-blocks');
}

//Save button event.
$(document).on("click touchend", ".saveBtn", saveBtnClick);


//Clear all button event. This clears all text
$("#clear-all-btn").on("click touchend", clearAllBtnClick);

//Function to clear all for each hour
function clearAllBtnClick(evt) {
    Swal.fire({
        title: 'Are you sure you want to clear all?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            allHours.forEach(hour => {
                $("#" + hour.replace(" ", "") + 'TextArea').val("")
                localStorage.removeItem(hour.replace(" ", ""))
            });
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })

}

//Function to save the text
async function saveBtnClick(evt) {
    console.log("This is the button: " + evt.target.id)
    var message = $("#" + evt.target.id + 'TextArea').val();
    var savedItem = localStorage.getItem(evt.target.id)

    localStorage.setItem(evt.target.id, message)

    await Toast.fire({
        icon: 'success',
        title: 'Saved!'
    })

    evt.stopPropagation();
}


function getSaveditem(hoursArr) {
    hoursArr.forEach(hour => {
        $("#" + hour.replace(" ", "") + 'TextArea').val(localStorage.getItem(hour.replace(" ", "")))
    });
}

