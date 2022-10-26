/*
    pa3.js

    ISP Assignment 3 || Web Page Generator || 10/25/22

    functions manipulating the generated window of pa3.html
*/

// page is a string that is incrementally appended to as the user gives commands. 
// myWindow is an indentifier for a new window. 
// On each peek(), it is displayed up-to-date with the current content of the page
let page = "";
var myWindow = null;

/* Global constants that restrict the number of each type of element that the user can create */
const MAX_HEADINGS = 6;
const MAX_PARAGRAPHS = 4;

/* A set of all the id's that have been assigned to elements */
let assignedID = new Set();

/* 
    CSS variables (for each possible id). 
    needed for the user to change style properties after the content has already been entered. 
    Initialized to default values here, but can be modified by the user. They are returned to default by calling reset() 
*/
let h1Color = "black";
let h1Align = "center";

let h2Color = "black";
let h2Align = "center";

let h3Color = "black";
let h3Align = "center";

let h4Color = "black";
let h4Align = "center";

let h5Color = "black";
let h5Align = "center";

let h6Color = "black";
let h6Align = "center";

let p1Color = "black";
let p1Align = "left";

let p2Color = "black";
let p2Align = "left";

let p3Color = "black";
let p3Align = "left";

let p4Color = "black";
let p4Align = "left";

/* Function call-counter variables used to assign a unique id to each new element */
let addHeadingCount = 0;
let addTextCount = 0;

// peek() overwrites the window, rendering all the content of the page, 
// including any content that has been appended to it since the user last peeked
function peek() 
{
    // if an old window is still open, close it 
    if(myWindow != null)
    {
        myWindow.close();
    } 
    
    // open the new window with a specified width and height
    // (URL, name, specs)
    myWindow = window.open("", "ISP-PA3-CHILD", "width=800,height=300");

    /* Piece-by-piece, the window is rendered with an entire HTML document, which contains any user-updated page contents */
    myWindow.document.write("<!DOCTYPE html><html><head><style>");
    myWindow.document.write // Individual CSS blocks are defined line-by-line below
    ( 
        // CSS for the background color
        "body { background-color : " + document.getElementById("bg-color").value + "; }" +
        
        // CSS for headings
        "#h1 { color : " + h1Color + "; text-align : " + h1Align + "; }" +
        "#h2 { color : " + h2Color + "; text-align : " + h2Align + "; }" +
        "#h3 { color : " + h3Color + "; text-align : " + h3Align + "; }" +
        "#h4 { color : " + h4Color + "; text-align : " + h4Align + "; }" +
        "#h5 { color : " + h5Color + "; text-align : " + h5Align + "; }" +
        "#h6 { color : " + h6Color + "; text-align : " + h6Align + "; }" +

        // CSS for paragraphs
        "#p1 { color : " + p1Color + "; text-align : " + p1Align + "; }" +
        "#p2 { color : " + p2Color + "; text-align : " + p2Align + "; }" +
        "#p3 { color : " + p3Color + "; text-align : " + p3Align + "; }" +
        "#p4 { color : " + p4Color + "; text-align : " + p4Align + "; }" +
        
        // CSS for subscripts
        "sub { font-size : 50%; color : black; }"                          
    );
    myWindow.document.write("</style></head><body>");
    myWindow.document.write(page);                          
    myWindow.document.write("</body></html>"); 
}

// addHeading() prompts for heading input and a heading size.
// A unique ID is derived using the call counter.
// Page is appended with the new header.
function addHeading()
{
    // Has the user already reached the max number of permitted headings?
    if (addHeadingCount >= MAX_HEADINGS)
    {
        alert("For this prototype, the number of heading elements is restricted to " + MAX_HEADINGS);
        return;
    }

    // prompt for text
    let headingEntry = prompt("Enter some text for a heading - containing any HTML formatting elements, such as <mark> or <i>, that you wish to use");

    // if the user hits cancel
    if (headingEntry == null)
    {
        return;
    }

    // prompt in a loop to validate the input
    while (headingEntry === "")
    {
        headingEntry = prompt("The heading must consist of atleast one character");
        
        // if the user hits cancel, break the loop by returning
        if (headingEntry == null)
        {
            return;
        }
    } 

    // prompt for a heading size
    let X = prompt("...And now choose a heading size (1 - 6)");
    
    // if the user hits cancel
    if (X == null)
    {
        return;
    }

    // prompt in a loop to validate the input
    while (X <= 0 || X > 6)
    {
        X = prompt("Size must follow the standard heading sizes (1 - 6) in HTML");

        // if the user hits cancel, break the loop by returning
        if (X == null)
        {
            return;
        }
    } 

    // increment the call count of addHeading()
    ++addHeadingCount;

    // construct a unique id from the call count
    const ID = "h" + addHeadingCount;

    // add the ID to the set of id's
    assignedID.add(ID);

    // string to be appended is "<hX id='ID'> headingEntry <sub>ID</sub></hX>" 
    const stringToAppend = "<h" + X + " id='" + ID + "'> " + headingEntry + " <sub>" + ID + "</sub>" + "</h" + X + "> ";
    
    // append to the page
    page += stringToAppend;
    
    /* LOGGING */
    
    // log the appended string
    console.log("Page appended with: " + stringToAppend);

    // log an updated list of all identified elements
    let idList = "";
    for (const x of assignedID.values()) 
    { 
        idList += x + ", ";
    }
    console.log("List of identified elements: " + idList);
}

// addText() prompts for paragraph input.
// A unique ID is derived using the call counter.
// Page is appended with the new paragraph.
function addText()
{
    // Has the user already reached the max number of permitted paragraphs?
    if (addTextCount >= MAX_PARAGRAPHS)
    {
        alert("For this prototype, the number of paragraph elements is restricted to " + MAX_PARAGRAPHS);
        return;
    }

    // prompt for text
    let textEntry = prompt("Enter some text for a paragraph - containing any HTML formatting elements, such as <ins>, <del>, or <br>, that you wish to use");

    // if the user hits cancel
    if (textEntry == null)
    {
        return;
    }

    // prompt in a loop to validate the input
    while (textEntry === "")
    {
        textEntry = prompt("The paragraph must consist of atleast one character");
        
        // if the user hits cancel, break the loop by returning
        if (textEntry == null)
        {
            return;
        }
    } 

    // increment the call count of addText()
    ++addTextCount;

    // construct a unique id from the call count
    const ID = "p" + addTextCount;

    // add the ID to the set of id's
    assignedID.add(ID);

    // string to be appended is "<p id='ID'> textEntry <sub>ID</sub></p>" 
    const stringToAppend = "<p id='" + ID + "'> " + textEntry + " <sub>" + ID + "</sub>" + "</p> ";
    
    // append to the page
    page += stringToAppend;
    
    /* LOGGING */
    
    // log the appended string
    console.log("Page appended with: " + stringToAppend);

    // log an updated list of all identified elements
    let idList = "";
    for (const x of assignedID.values()) 
    { 
        idList += x + ", ";
    }
    console.log("List of identified elements: " + idList);
}

function textColor() 
{
    // prompt for an element id
    const elemID = prompt("Which element would you like to assign this color to (subscript identifier)?");

    // if the user hits cancel
    if (elemID == null)
    {
        // reset the color picker to white
        document.getElementById("text-color").value = "#FFFFFF"
        return;
    }

    // validate the id (is it in the id set?)
    if (!assignedID.has(elemID))
    {
        alert("No element with id '" + elemID + "' could be found");
        document.getElementById("text-color").value = "#FFFFFF"
        return;
    }
    
    // store the new color
    const newColor = document.getElementById("text-color").value;

    // determine which CSS color variable needs to be updated
    switch (elemID)
    {
        case "h1":
            h1Color = newColor;
            break;
        case "h2":
            h2Color = newColor;
            break;
        case "h3":
            h3Color = newColor;
            break;
        case "h4":
            h4Color = newColor;
            break;
        case "h5":
            h5Color = newColor;
            break;
        case "h6":
            h6Color = newColor;
            break;     
        case "p1":
            p1Color = newColor;
            break;
        case "p2":
            p2Color = newColor;
            break;
        case "p3":
            p3Color = newColor;
            break;
        case "p4":
            p4Color = newColor;
            break;
    }
}

//@TODO before submission, make sure this function is up to date
// reset() is responsible for returning all non-const global variables back to the state they had on page load
function reset() 
{
    // wipeout the page
    page = "";
    
    // clear the id set
    assignedID.clear();

    // reset CSS variables to default
    h1Color = "black";
    h1Align = "center";

    h2Color = "black";
    h2Align = "center";

    h3Color = "black";
    h3Align = "center";

    h4Color = "black";
    h4Align = "center";

    h5Color = "black";
    h5Align = "center";

    h6Color = "black";
    h6Align = "center";

    p1Color = "black";
    p1Align = "left";

    p2Color = "black";
    p2Align = "left";

    p3Color = "black";
    p3Align = "left";

    p4Color = "black";
    p4Align = "left";

    // reset call counter variables
    addHeadingCount = 0;
    addTextCount = 0;

    // reset color picker values to white
    document.getElementById("bg-color").value = "#FFFFFF"
    document.getElementById("text-color").value = "#FFFFFF"
}

// close() closes the design window
function close() 
{
    myWindow.close();
}
