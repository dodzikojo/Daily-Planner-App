//Set the current date
$('#currentDay').text(moment().format('dddd, MMMM Do'))

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
        class: "col-1 hour",
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

//TextArea change event.
$(document).change( "#textArea", function(evt) {
    $("#"+evt.target.id.replace("TextArea","")).addClass("unsavedBtn");
});


//Clear all button event. This clears all text
$("#clear-all-btn").on("click touchend", clearAllBtnClick);

//Function to clear all for each hour
function clearAllBtnClick(evt) {
    Swal.fire({
        title: 'Are you sure you want to clear all entry?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            allHours.forEach(hour => {
                $("#" + hour.replace(" ", "") + 'TextArea').val("")
                localStorage.removeItem(moment().format('L').replaceAll("/","-")+"-"+hour.replace(" ", ""))
            });
            Swal.fire('Schedule Cleared!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Schedule not cleared!', '', 'info')
        }
    })

}

//Function to save the text
async function saveBtnClick(evt) {
    var message = $("#" + evt.target.id + 'TextArea').val();
    $("#"+evt.target.id.replace("TextArea","")).removeClass("unsavedBtn");

    localStorage.setItem(moment().format('L').replaceAll("/","-")+"-"+evt.target.id, message)

    await Toast.fire({
        icon: 'success',
        title: 'Entry Saved!'
    })
}


function getSaveditem(hoursArr) {
    hoursArr.forEach(hour => {
        $("#" + hour.replace(" ", "") + 'TextArea').val(localStorage.getItem(moment().format('L').replaceAll("/","-")+"-"+hour.replace(" ", "")))
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
    timer: 500,
    timerProgressBar: true
})


