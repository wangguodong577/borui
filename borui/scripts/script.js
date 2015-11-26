(function ($) {

    function sizeImages() {
        $('.image-ratio').each(function () {
            var $img = $(this).find('img');
            var imgWidth = $img.width(),
                imgHeight = $img.height(),
                winWidth = $(window).width(),
                winHeight = $(window).height(),
                widthRatio = winWidth / imgWidth,
                heightRatio = winHeight / imgHeight,
                widthDiff = heightRatio * imgWidth,
                heightDiff = widthRatio * imgHeight;

            $img.css({
                width: (heightDiff > winHeight ? winWidth : widthDiff) + 'px'
            });
        });
    }

    $(document).ready(function () {
        var height = $('.ch-carousel').height() * 2 / 3;
        $('.image-ratio .vertical-centre').height(height);
    });
    
    $(window).load(function () {
        sizeImages();
        $(".ch-carousel").codehouseCarousel({
            modes: {
                slide: true,
                infinite: true,
                responsive: true,
                nudge: false
            },
            rotate: {
                auto: true,
                direction: "right",
                interval: 4000,
                duration: 400,
                type: 'quad'
            },
            dimensions: {
                fixedHeight: true,
                maxHeight: 1197,
                baseWidth: 980
            },

        });
    });
}(jq110));