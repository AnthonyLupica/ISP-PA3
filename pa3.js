/*
    pa3.js

    ISP Assignment 3 || Web Page Generator || 10/25/22

    functions manipulating the generated window of pa3.html
*/

// page is a string that is incrementally appended to as the user gives commands. 
// myWindow is an indentifier for a new window. 
// On each peek(), it is displayed up-to-date with the current content of the page
var page = "";
var myWindow = null;

/* Global constants that restrict the number of each type of element that the user can create */
const NUM_HEADINGS = 6;

/* A set of all the id's that have been assigned to elements */
const assignedID = new Set();

/* CSS variables needed for the user to change style properties after the content has already been entered, initialized to default values */
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

/* Function call-counter variables used to assign a unique id to each new element */
let addHeadingCount = 0;

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
    myWindow = window.open("", "ISP-PA3-CHILD", "width=800,height=200");

    /* Piece-by-piece, the window is rendering an entire HTML document, which contains any user-updated page contents */
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
        
        // CSS for subscripts
        "sub { font-size : 50%; color : black; }"                          
    );
    myWindow.document.write("</style></head><body>");
    myWindow.document.write(page);                          
    myWindow.document.write("</body></html>"); 
}

// addHeading() prompts for heading input (headingEntry) and a heading size (X).
// A unique ID is derived using the call counter.
// Page is appended with a new header.
function addHeading()
{
    // Has the user already reached the number of permitted headings?
    if (addHeadingCount >= NUM_HEADINGS)
    {
        alert("For this prototype, the number of headings is restricted to " + NUM_HEADINGS);
        return;
    }

    // prompt for text
    let headingEntry = prompt("Enter some text for a heading");

    // if the user hits cancel
    if (headingEntry == null)
    {
        return;
    }

    // prompt in a loop to validate the input
    while (headingEntry === "")
    {
        headingEntry = prompt("The heading must consist of atleast one character");
        
        // if the user hits cancel, return
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
        X = prompt("Size must define the standard heading sizes (1 - 6) in HTML");

        // if the user hits cancel, return
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
    const stringToAppend = "<h" + X + " id='" + ID + "'> " + headingEntry + " <sub>" + ID + "</sub>" + "</h" + X + ">";
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
        return;
    }

    // validate the id
    if (!assignedID.has(elemID))
    {
        alert("No element with id '" + elemID + "' could be found");
        return;
    }
    
    // get the new color
    const newColor = document.getElementById("text-color").value;
    
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
    }
}

function close() 
{
    myWindow.close();
}
