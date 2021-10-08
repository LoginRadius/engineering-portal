var elementToClickOnID = "tocTrigger";
var elementToChangeId = "tocUl";

var slideOutName = "initialValue";

var gatsbyWrapperID = "gatsby-focus-wrapper";

var media1620 = window.matchMedia("(max-width: 1620px)");
var media1620on = false;

var tocShown = true;


// window.onload = function()
// {

window.onscroll = function() {
    doSomethingAtStart();
};

window.onresize = function ()
{
    checkMedia( media1620 );

    ( checkForElement() && media1620on )
        ? hideTOC()
        : showTOC();
};

window.onclick = function() {
    timeoutDoSomething();
}


timeoutDoSomething();

function timeoutDoSomething()
{
    setTimeout(function()
    {
        checkForElement()
            ? doSomethingAtStart()
            : timeoutDoSomething();

    }, 2000);
}





function doSomethingAtStart()
{
    if ( !checkForElement() ) return;

    var elementToChangeClassList = document.getElementById(elementToChangeId).classList;

    for (var i = 0; i < elementToChangeClassList.length; i++) {
        if (elementToChangeClassList[i].includes("slideOut")) {
            slideOutName = elementToChangeClassList[i];
        }
    }

    if ( media1620on ) hideTOC();
}

function hideTOC() {
    document.getElementById(elementToChangeId).classList.remove(slideOutName);
    tocShown = false;
}

function showTOC() {
    document.getElementById(elementToChangeId).classList.add(slideOutName);
    tocShown = true;
}

document.addEventListener('click', function (event)
{
    // If the clicked element doesn't have the right selector, bail
    if ( !event.target.matches("#" + elementToClickOnID) ) return;

    // Don't follow the link
    event.preventDefault();

    ( checkForElement() && tocShown )
        ? hideTOC()
        : showTOC();

}, false);


function checkForElement() {
    return ( document.getElementById(elementToChangeId ) != null );
}

// Call listener function at run time
checkMedia( media1620 );
// }


function checkMedia( media1620 )
{
    // If media query matches
    media1620on = media1620.matches;
}
