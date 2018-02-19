/**
 * Set To top button visibility
 */

var to_top_btn_visibility = function (body_offset) {
    /**
 * Auto show and hide to-top button
 */
    // Show button
    if(body_offset<-200) {
        // $("#to-top").fadeIn(300);
        $("#to-top").removeClass("corner-btn-hide");
    }

    // Hide button
    if(body_offset>-140) {
        // $("#to-top").fadeOut(300);
        $("#to-top").addClass("corner-btn-hide");
    }
}


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
    /**
     * Initializations
     * 
     * Modals
     * 
     * To-top button
     * 
     * Scrollspy
     * 
     */

        // Initialize Modals
        $(".modal").modal();

        // to-top button visibility
        to_top_btn_visibility(document.getElementsByTagName("body")[0].getBoundingClientRect().top);

        // Scrollspy
        $('.scrollspy').scrollSpy();

    /**
     * 
     * Scroll Event Listener
     * 
     */
    $(document).scroll(function(){
        console.log("Scroll");
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
           if(body_offset<-150) {
            $("#nav").addClass("nav-hide");
           }
        }
        // Set background Color
        if(body_offset<-100) {
            $("#nav").removeClass("nav-transparent");
            $("#nav").addClass("nav-black");
        } else {
            $("#nav").addClass("nav-transparent");
            $("#nav").removeClass("nav-black");
        }


        /**
         *  Set visibility of To-top button 
         * 
         * */
        to_top_btn_visibility(body_offset);


        // Update last_offset
        last_offset = body_offset;


    });

    // End of Sroll Event
    
    // Scroll to top when clicked
    $("#to-top").click(function(){
        $("html, body").animate({scrollTop: 0});
    });

    // Click to pop up toc-mobile
    $("#toc-corner-btn").click(function(){
        $("#toc-mobile").modal('open');
    });

    // TOC - Normal Button trigger
    $("#toc-corner-norm-btn").click(function(){
        // Set toc-normal position
          // Get toc-corner-norm-btn location rel to viewport
        var tocNormBtnLocation = document.getElementById("toc-corner-norm-btn").getBoundingClientRect();
          // Set toc-normal location
        var tocNormMenuLocation = document.getElementById("toc-normal").getBoundingClientRect();
        if((tocNormBtnLocation.bottom - tocNormMenuLocation.top) || (tocNormBtnLocation.right - tocNormMenuLocation.right)) {
            $("#toc-normal").css("right",($(window).width()-tocNormBtnLocation.right));
            $("#toc-normal").css("bottom",($(window).height()-tocNormBtnLocation.top+10));
        }
        // Toggle toc-normal visibility
        $("#toc-normal").fadeToggle(600,"easeInOutQuint");
    });

    
});


