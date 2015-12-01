(function ($) {
    $(window).load(function() {
        $('#slider').css({"height": $(window).height()});
        $('#slider').nivoSlider({
            effect: 'fold',                 // Specify sets like: 'fold,fade,sliceDown'
            slices: 5,                     // For slice animations
            animSpeed: 1000,                 // Slide transition speed
            pauseTime: 4000,                 // How long each slide will show
            directionNav: false,             // Next & Prev navigation
            controlNav: false,                 // 1,2,3... navigation
            pauseOnHover: true,             // Stop animation while hovering
        });

        $(".nivo-caption").each(function(){
            $(this).css({
                left: $(window).width()/20,
                height: $(window).height()/4,
                bottom: $(window).height()/2
            });
        });
    });
}(jQuery));
