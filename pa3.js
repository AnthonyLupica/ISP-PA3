/*
    pa3.js

    ISP Assignment 3 || Web Page Generator || 10/25/22
    
    functions manipulating the generated window of pa3.html
*/

var page = "";
var myWindow = null;

// updateWindow() opens an overwritten window which includes all modifications 
// to 'page' that the user has made since they last peeked
function updateWindow() 
{
    if(myWindow != null)
    {
        myWindow.close();
    } 
        
    // open the new window with a specified width and height
    // (URL, name, specs)
    myWindow = window.open("", "ISP-PA3-CHILD", "width=800,height=200");

    /* CALLS TO DOCUMENT.WRITE() BELOW UPDATE THE WINDOW WITH MODIFIED PAGE CONTENTS */ 
    myWindow.document.write("<!DOCTYPE html><html><head><style>");
    myWindow.document.write
    ( 
        // Individual CSS blocks are written line by line
        "h1, h2, h3, h4, h5, h6 { text-align : center; }" // style for headings
    );
    myWindow.document.write("</style></head><body>");
    myWindow.document.write(page);                        // the contents of 'page' goes in <body>
    myWindow.document.write("</body></html>"); 
}

// setHeading prompts for heading input (headingEntry) and a size X.
// Page is appended with "<hX> HeadingEntry </hX>"
function setHeading()
{
    let headingEntry = prompt("Enter the text for the heading");

    // validate heading 
    while (!headingEntry)
    {
        headingEntry = prompt("Valid entry is text of a minimum of one character");
    } 

    let X = prompt("...And now choose a heading size (1 - 6) for the text to display in");

    // validate heading size
    while (X <= 0 || X > 6)
    {
        X = prompt("Valid entry is 1 (for maximum heading size) through 6 (for minimum heading size");
    } 

    // appening "<hX> HeadingEntry </hX>" to page
    page += "<h" + X + ">" + headingEntry + "</h" + X + ">";
}

function addButton() {
    page += "<button>A do nothing button</button>";
}

function addExamples() {
    page += "<button onclick='window.open(" + "\"" + "http://www.w3schools.com/jsref/met_win_open.asp" + "\"" + ")'>Examples</button>";
}

function closeWindow() {
    myWindow.close();
}

function reference() {
    window.open("http://www.w3schools.com/jsref/obj_window.asp");
}

function examples() {
    window.open("http://www.w3schools.com/jsref/met_win_open.asp");
}
