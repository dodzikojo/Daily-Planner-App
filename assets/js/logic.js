let hours24 = ["10 AM", "11 AM", "12 PM", "13 PM", "14 PM", "15 PM", "16 PM", "17 PM"];

//Set the current date
$('#currentDay').text(moment().format('dddd, MMMM Do'))

var sample = someFunction()
console.log(sample)

hours24.forEach(hour => {
    createTimeBlock(hour)
});


// function someFunction () {
//     startFrom = moment()
//     const items = [];
//     new Array(8).fill().forEach((acc, index) => {
//         console.log(index)
//       items.push(moment( {hour: index} ).format('h:mm A'));
//     //   items.push(moment({ hour: index, minute: 30 }).format('h:mm A'));
//     })
//     return items;
//   }


//Create the time block using a loop
//Apply a color class based on .past .present .future
function createTimeBlock(blockId) {
    let newTimeBlockDivEl = $("<div>", {
        class: "row time-block",
    });

    let hourTextEl = $("<p>", {
        class: "col-1 hour",
        text: blockId
    })

    let textAreaEl = $("<textarea>", {
        id: blockId.replace(" ","")+"TextArea",
        class: "col-10",
    })

    let saveBtnEl = $("<button>", {
        class: "col-1 saveBtn",
        id:blockId.replace(" ","")
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