//Set the current date
$('#currentDay').text(moment().format('dddd, MMMM Do'))

//Get the current hour
let currentHour = moment().format('h A')


getHours_CreateTimeBlocks()


function getHours_CreateTimeBlocks() {
    const items = [];
    new Array(24).fill().forEach((acc, index) => {
        hR = moment({ hour: index });

        if (hR.isSameOrAfter(moment().hour(9)) & hR.isSameOrBefore(moment().hour(17))) {
            let hourBlockId = hR.format('h A') //Set to 12 Hour format

            if (currentHour === hourBlockId) {
                createTimeBlock( hourBlockId, "present")
            }else if (hR.isSameOrBefore(moment().hour(currentHour))) {
                createTimeBlock( hourBlockId, "past")
            } else {
                createTimeBlock( hourBlockId, "future")
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
        class: "col-10 "+textAreaClass,
    })

    let saveBtnEl = $("<button>", {
        class: "col-1 saveBtn",
        id: hourBlockId.replace(" ", "")
    });

    let icon = $("<i>", {
        class: "fas fa-save"
    })


    hourTextEl.appendTo(newTimeBlockDivEl);
    textAreaEl.appendTo(newTimeBlockDivEl);
    icon.appendTo(saveBtnEl)
    saveBtnEl.appendTo(newTimeBlockDivEl);
    newTimeBlockDivEl.appendTo('#time-blocks');
}