var elementToClickOnID = "tocTrigger";
var elementToChangeId = "tocUl";

var slideOutName = "initialValue";
var elementToChangeClassList = "initialValue";

var gatsbyWrapperID = "gatsby-focus-wrapper";

var media1620 = window.matchMedia("(max-width: 1620px)");
var media1620on = false;

var tocShown = true;


window.onload = function () {

    setTimeout(function () {

        doSomethingAtStart();

    }, 2000);

    function doSomethingAtStart() {
        if (checkforElement()) {

//            console.log("doSomethingAtStart RAN");

            var elementToChangeId = "tocUl";
            var elementToChangeClassList = document.getElementById(elementToChangeId).classList;

            for (var i = 0; i < elementToChangeClassList.length; i++) {
                if (elementToChangeClassList[i].includes("slideOut")) {

                    slideOutName = elementToChangeClassList[i];
                }
            }

            if (media1620on) hideTOC();

        }
    }


    document.addEventListener('click', function (event) {


        // If the clicked element doesn't have the right selector, bail
        if (!event.target.matches("#" + elementToClickOnID)) {
            return;
        }

        // Don't follow the link
        event.preventDefault();


        if (tocShown) {
            hideTOC();
        } else {
            showTOC();
        }


    }, false);


    function hideTOC() {
        document.getElementById(elementToChangeId).classList.remove(slideOutName);
        tocShown = false;
    }

    function showTOC() {
        document.getElementById(elementToChangeId).classList.add(slideOutName);
        tocShown = true;
    }


    window.onscroll = function () {
        if (checkforElement()) {
            if (media1620on) hideTOC();
        }
    };


    window.onresize = function () {

        checkMedia(media1620);

        if (checkforElement()) {
            if (media1620on) {
                hideTOC();
            } else {
                showTOC();
            }
        }
    };


    function checkforElement() {
        if (document.getElementById(elementToChangeId) != null) return true
        return false;
    }

//
//    function addObserverIfDesiredNodeAvailable() {
//
//
//        var mutTargetNode = document.querySelector(".py-80");
//
//
//        if (!mutTargetNode) {
//            //The node we need does not exist yet.
//            //Wait 500ms and try again
//            window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
//
//            console.log("target doesnt exist");
//
//            return;
//        }
////
//
//        var observerOptions = {
//            childList: false,
//            attributes: true,
//            attributeFilter: ['id'],
//
//            // Omit (or set to false) to observe only changes to the parent node
//            subtree: false
//        }
//
//        var observer = new MutationObserver(function (mutations) {
//
//            console.log("ID CHANGED");
//
//            doSomethingAtStart();
//
//        });
//
//        observer.observe(mutTargetNode, observerOptions);
//
//    }

};


function checkMedia(media1620) {
    if (media1620.matches) { // If media query matches

        media1620on = true;

    } else {

        media1620on = false;

    }
}


checkMedia(media1620) // Call listener function at run time
//media1620.addListener(checkMedia) // Attach listener function on state changes
