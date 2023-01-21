# Daily Planner App
A simple calendar application taht allows a user to save events for each hour of the day.


## Preview
[Live Preview Daily Planner App](https://dodzikojo.github.io/Daily-Planner-App/ "Live Preview")

## Project Requirements
* Display the current day at the top of the calender when a user opens the planner.
* Present timeblocks for standard business hours when the user scrolls down.
* Color-code each timeblock based on past, present, and future when the timeblock is viewed.
* Allow a user to enter an event when they click a timeblock
* Persist events between refreshes of a page


## Functionality
* The app generates all hourly time blocks based on a function
    ```javascript
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
    ```

*

![Work Day Scheduler Preview](previews/main-image.png)