/* Monitoring side bar */

$(document).ready(function(){
    $(document).on("scroll",function(){
        var pinned = document.getElementsByClassName("pin-to-view");
        for(var i =0;i<pinned.length;i++){
            // Get the current top position
            
        }
    })
})


$(document).ready(function(){
    var last_offset = 0;
    $(document).scroll(function(){
/*
 *  Auto Hide and Show Nav bar 
*/

        // Fetch the direction of scroll
        var body_offset = document.getElementsByTagName("body")[0].getBoundingClientRect().top;
        // If Page Scroll Up
        if(body_offset>last_offset){
            // Show Nav
            $("#nav").removeClass("nav-hide");
            
        }
        // If Page Scroll Down
        if(body_offset<last_offset){
            // If page scroll down enough, hide
           if(body_offset<-100) {
            $("#nav").addClass("nav-hide");
           }
        }
        // Set background Color
        if(body_offset<-70) {
            $("#nav").removeClass("nav-transparent");
            $("#nav").addClass("nav-black");
        } else {
            $("#nav").addClass("nav-transparent");
            $("#nav").removeClass("nav-black");
        }

        // Update last_offset
        last_offset = body_offset;

/**
 * Auto show and hide to-top button
 */
        // Show button
        if(body_offset<-200) {
            $("#to-top").fadeIn(300);
        }

        // Hide button
        if(body_offset>-140) {
            $("#to-top").fadeOut(300);
        }

    });

    // End of Sroll Event
    
    // Scroll to top when clicked
    $("#to-top").click(function(){
        $("html, body").animate({scrollTop: 0});
    });
});


