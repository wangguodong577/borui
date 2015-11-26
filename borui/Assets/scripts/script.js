/* 
 * ---------------------------------------- *
 * Name: 	Primary JavaScripts             *
 * Type: 	JavaScript                      *
 * Version: Not versioned                   *
 * Author:	Robert Beaney                   *
 * Project: KWM                             *
 * Status:	Release                         *
 * Requisites: jQuery v1.10.2               *
 *             jQuery UI - v1.11.2          *
 *             client.min.js                *
 * ---------------------------------------- *
 */

(function ($) {

    var $window = $(window),
        $html = $('html'),
        $body = $('body');

    /* primary functions
   ---------------------------- */

    // check if query has key value 
    function checkQuery(keyValue) {
        return !(window.location.href.indexOf(keyValue) == -1);
    }

    // takes key and value, pairs them and tests for existence in query string, then redirects to url as parameter or modified url from parameter
    function setQuery(key, value, link) {

        var param = link.indexOf('?') == -1 ? '?' : '&', // new param or add param
            keyValue = key + '=' + value;

        window.location = link + param + keyValue;

    }

    // show/hide advanced search 
    function filterSearch() {
        var $filters = $('.filters'),
            $trigger = $filters.find('.toggle-filter'),
            $searchComponent = $filters.find('.search-filters'),
            $filterNav = $filters.find('.navigation');

        // if no filters, hide the trigger
        if ($.trim($searchComponent.html()).length === 0) {
            $trigger.closest('.col').hide();
            return;
        }

        $trigger.on({
            click: function () {
                if (!$searchComponent.is(':animated')) {
                    $searchComponent.slideToggle();
                }
            }
        });

        // next prev
        $filterNav.find('.prev-next > .button a').on({
            click: function (e) {
                e.preventDefault();
                setQuery('exp', 0, $(this).attr('href'));
            }
        });

    }


    // set the rows of the associated articles the same height
    function setRowsEqual() {
        $('.equal-height-row').each(function () {
            var $row = $(this),
                $contentItems = $row.find('.col .content-height'),
                highestBox = 0;

            if (!$row.is(':visible')) {
                return;
            }

            $contentItems.each(function () {
                var $item = $(this);
                $item.height('auto');
                var itemHeight = $item.height();

                if (itemHeight > highestBox) {
                    highestBox = itemHeight;
                }
            });

            $contentItems.height(highestBox);

        });
    }

    // resize results area based on window height to create overflow area
    function sizeSearch() {

        var resultsOffset = $('#search-results').offset().top,
            height,
            remainder;

        if ($('#mainWrapper').hasClass('homepage')) {
            height = $('#bottom-section').offset().top + $('#bottom-section').height();
        } else {
            height = $('#mainWrapper').height();
        }

        remainder = height - resultsOffset;

        $('#search-results').css({
            maxHeight: remainder,
            height: remainder
        });

    }

    function lightboxResize() {
        
        var $lightboxContainer = $('.lightbox-container'),
            $lightboxContent = $lightboxContainer.find('.lightbox-content'),
            $lightboxContentMask = $lightboxContent.find('.lightbox-content-mask'),
            width = $lightboxContainer.width(),
            height = $lightboxContainer.height(),
            maxHeight = $window.height();

        // set position
        $lightboxContent.css({
            'max-height': (maxHeight * 0.8) + 'px'
        });

        height = $lightboxContainer.height();

        $lightboxContainer.css({
            'margin-left': '-' + (width / 2) + 'px',
            'margin-top': '-' + (height / 2) + 'px'
        });

        // other subsequent actions
        if ($lightboxContainer.find('.equal-heights').length) {
            equalHeights($lightboxContainer.find('.equal-heights'));
        }

    }

    function sizeImages() {
        $('.image-ratio').each(function () {

            var $img = $(this).find('img');
            var imgwidth = $img.width(),
                imgheight = $img.height(),
                winwidth = $window.width(),
                winheight = $window.height(),
                widthratio = winwidth / imgwidth,
                heightratio = winheight / imgheight,
                widthdiff = heightratio * imgwidth,
                heightdiff = widthratio * imgheight;

            $img.css({
                width: (heightdiff > winheight ? winwidth : widthdiff) + 'px'
            });
        });
    }

    //#region show more modes

    // inherited from sjberwin
    function showMoreLegacyOne() {
        $('.show.cta').each(function () {
            var $trigger = $(this),
                $content = $trigger.next('.show-more');

            $trigger.on('click', function () {
                $trigger.css('visibility', 'hidden');
                $content.slideDown(800);
            });
        });
    }

    // legacy show-more 2
    function showMoreLegacyTwo() {
        $('.show-more-trigger.cta').not('.more').each(function () {
            var $trigger = $(this),
                $content = $trigger.next('.show-more-content');

            $trigger.on('click', function () {
                $trigger.css('visibility', 'hidden');
                $content.slideDown(800);
            });
        });
    }

    // legacy show-more 3
    function showMoreLegacyThree() {
        $('.show-more-trigger.more.cta').each(function () {
            var $trigger = $(this),
                $content = $trigger.next('.show-more-content'),
                $labelMore = $trigger.find('.show-more-label'),
                $labelLess = $trigger.find('.show-less-label');

            $trigger.on('click', function () {
                if (!$content.is(':animated')) {
                    $content.slideToggle(300).toggleClass('open');

                    if (!$content.hasClass("open")) {
                        $labelMore.show();
                        $labelLess.hide();
                    } else {
                        $labelMore.hide();
                        $labelLess.show();
                    }
                }
            });
        });
    }

    // show more
    function showMore() {     
        $('.show-more-container .show-more-trigger.more.cta').each(function () {

            var $trigger = $(this),
                $content = $trigger.parents('.show-more-container').find('.show-more-content'),
                $labelMore = $trigger.find('.show-more-label'),
                $labelLess = $trigger.find('.show-less-label');

            $trigger.on('click', function () {
                if (!$content.is(':animated')) {
                    $content.slideToggle(300).toggleClass('open');

                    if (!$content.hasClass("open")) {
                        $labelMore.show();
                        $labelLess.hide();
                    } else {
                        $labelMore.hide();
                        $labelLess.show();
                    }
                }
            });
        });
    }

    //#endregion

    function scrollDown() {
        $('.down-arrow a').on('click', function (e) {
            e.preventDefault();

            var target = this.hash,
                $target = $(target);

            $html.add($body).stop().animate({
                scrollTop: $target.offset().top
            }, 900);
        });
    }

    function goDeeper() {
        $('#go').on('click', function (e) {
            e.preventDefault();
            $('#go-deeper-holder').css('max-height', $window.height() - 100);
            $('#go-deeper-content').slideToggle('slow', function() {
                $('html, body').stop().animate({ 
                    'scrollTop': $('#go-deeper-holder').offset().top
                }, 900);
                $('#go-deeper-content').toggleClass('open');
            });
            
            
        });
    }

    function searchColumns() { // todo mon: used?
        var numCols = 3,
        container = $('.search-results'),
        listItem = 'li',
        listClass = 'sub-list';
        container.each(function () {
            var itemsPerCol = new Array(),
            items = $(this).find(listItem),
            minItemsPerCol = Math.floor(items.length / numCols),
            difference = items.length - (minItemsPerCol * numCols);
            for (var i = 0; i < numCols; i++) {
                if (i < difference) {
                    itemsPerCol[i] = minItemsPerCol + 1;
                } else {
                    itemsPerCol[i] = minItemsPerCol;
                }
            }
            for (var i = 0; i < numCols; i++) {
                $(this).append($('<ul ></ul>').addClass(listClass));
                for (var j = 0; j < itemsPerCol[i]; j++) {
                    var pointer = 0;
                    for (var k = 0; k < i; k++) {
                        pointer += itemsPerCol[k];
                    }
                    $(this).find('.' + listClass).last().append(items[j + pointer]);
                }
            }
        });
    };

    // regioncolums setting 
    function regionTwoCol() {

        $('.region-content-mobile').each(function () {

            var $regionContent = $(this),
                $regionItems = $regionContent.find('li'),
                regionItemsCount = $regionItems.length;

            if (regionItemsCount > 1) {
                $regionItems.slice(Math.round(regionItemsCount / 2)).appendTo($regionContent.find('.right-col ul'));
            }
        });

    }

    // location filter
    function locationFilter() {
        // showing of default region contianer
        $('.region-content-mobile[data-location="' + $(".region-container-mobile select option:selected").prop('value') + '"]').css('display', 'block');

        // change event
        $('.region-container-mobile select').change(function () {
            var selectVal = $(this).find('option:selected').prop('value');

            $('.region-content-mobile:visible').fadeOut( function() {
                $('.region-content-mobile[data-location="'+selectVal+'"]').fadeIn();
            });
        });
    }

    // homepage mobile landscape helper
    function mobileLandscapeHelper() {
        if (client.Mobile) {
            $('.homepage').addClass('mobile');
        }
    }

    // column classes helper
    function setAuthorColumns() {
        //var $authorContainer = $('.featured-author.multi').closest('.associated-articles'),
        //$authorCols = $authorContainer.find('.col'),
        //colCount = $authorCols.length,
        //colClasses = { // map count to meaningful css classname
        //    '2': 'col-6',
        //    '3': 'col-4',
        //    '4': 'col-3',
        //    '6': 'col-3',
        //    '7': 'col-3',
        //    '8': 'col-3'
        //},
        //// check column count with fallback 
        //colsClass = /8|7|6|4|3|2/i.test(colCount) ? colClasses[colCount] : 'col-12';

        //$authorContainer.each(function () {
        //    $authorCols.removeClass('col-2 col-3 col-4 col-6 col-12'); // get rid of any existing column class
        //    $authorCols.addClass(colsClass); // apply css class to column
        //});
    };

    //Media gallery carousels

    function setImageGallery() {
        var ImageGallery = this;
        var $container = $('div.image-gallery');
        var $largeContainer = $container.find('div.large div.image-container');
        var $descriptionContainer = $container.find('div.gallery-footer div.description');
        var $thumbs = $container.find('div.thumbs-carousel ul li');
        var $largeNavigation = $container.find('div.large ul.large-nav li');
        var $thumbsContainer = $container.find('div.thumbs div.thumbs-carousel ul');
        var $thumbsNavigation = $container.find('div.thumbs ul.thumbs-nav li');
        var currentSelected = 0;
        var firstVisible = 0;

        this.loadLargeImage = function (type, url) {
            var iframe, img;

            if (type == "vimeo") {
                iframe = $("<iframe class='vimeo' />");

                iframe.attr('src', url + '?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autoplay=1');
                iframe.css('width', '100%');
                iframe.attr('height', '441');
                if ($window.width() < 761 && !client.OldIE) { // needed for the mediaCentreResponsive function to work
                    iframe.css({ height: $(this).width() * 0.66415 });
                }
                iframe.attr('frameborder', '0');
                iframe.attr('webkitAllowFullScreen', 'webkitAllowFullScreen');
                iframe.attr('mozallowfullscreen', 'mozallowfullscreen');
                iframe.attr('allowFullScreen', 'allowFullScreen');

                $largeContainer.html(iframe);
            } else if (type == "youtube") {
                var ytVidID = url.substring(url.lastIndexOf('/') + 1, url.length);
                var ytURL = "http://www.youtube.com/embed/" + ytVidID;

                iframe = $("<iframe class='youtube'/>");

                iframe.attr('src', ytURL + '?rel=0&amp;autoplay=1&amp;modestbranding=1&wmode=opaque&enablejsapi=1');
                //iframe.attr('width', '664');
                iframe.css('width', '100%');
                iframe.attr('height', '441');
                if ($window.width() < 761 && !client.OldIE) {
                    iframe.css({ height: $(this).width() * 0.66415 });
                }
                iframe.attr('frameborder', '0');
                iframe.attr('webkitAllowFullScreen', 'webkitAllowFullScreen');
                iframe.attr('mozallowfullscreen', 'mozallowfullscreen');
                iframe.attr('allowFullScreen', 'allowFullScreen');

                $largeContainer.html(iframe);
            } else if (type == "slideshare") {
                iframe = $("<iframe class='slideshare'/>");

                iframe.attr('src', url + '?rel=0');
                //iframe.attr('width', '664');
                iframe.css('width', '100%');
                iframe.attr('height', '441');
                if ($window.width() < 761 && !client.OldIE) {
                    iframe.css({ height: $(this).width() * 0.66415 });
                }
                iframe.attr('frameborder', '0');
                iframe.attr('webkitAllowFullScreen', 'webkitAllowFullScreen');
                iframe.attr('mozallowfullscreen', 'mozallowfullscreen');
                iframe.attr('allowFullScreen', 'allowFullScreen');

                $largeContainer.html(iframe);

            } else {
                //dont fade image until its been loaded  
                img = $("<img>");
                img.hide().bind("load", function () { $(this).fadeIn(300); });

                $largeContainer.html(img);
                img.attr('src', url);
            }
        };

        this.loadItem = function (index) {
            if (index < 0) {
                index = $thumbs.length - 1;
            }
            if (index > $thumbs.length - 1) { index = 0; }

            $thumbs.removeClass('active');
            $thumbs.eq(index).addClass('active');

            $thumbs.find('span').removeClass('themed-background themed-border').css('opacity', 0.5);
            $thumbs.eq(index).find('span').addClass('themed-background themed-border').css('opacity', 1);

            var type = $thumbs.eq(index).attr('data-type');
            var imgUrl = $thumbs.eq(index).attr('data-url');

            if ($largeContainer.find('img, iframe').length) {
                $largeContainer.find('img, iframe').fadeOut(300, function () {
                    ImageGallery.loadLargeImage(type, imgUrl);
                });
            } else {
                ImageGallery.loadLargeImage(type, imgUrl);
            }

            $descriptionContainer.html($thumbs.eq(index).attr('data-description'));

            currentSelected = index;
            window.location.hash = index;

            if (index == 0) {
                ImageGallery.moveThmbs("begining");
            } else if (index == $thumbs.length - 1) {
                ImageGallery.moveThmbs("end");
            } else if (currentSelected - firstVisible < 0) {
                ImageGallery.moveThmbs("left");
            } else if (currentSelected - firstVisible > 5) {
                ImageGallery.moveThmbs("right");
            }
        };

        this.moveThmbs = function (direction) {
            var moveby = 3;
            var cellWidth = (parseInt($thumbs.eq(0).width()) + parseInt($thumbs.eq(0).css('margin-right')));
            var currentPosition = parseInt($thumbsContainer.css('margin-left'));
            var maxMargin = -(parseInt($thumbs.length) * cellWidth) + cellWidth * 6;
            var moveTo = 0;

            if (direction == 'right') {
                moveTo = currentPosition - (cellWidth * moveby);
            } else if (direction == 'left') {
                moveTo = currentPosition + (cellWidth * moveby);
            } else if (direction == 'end') {
                moveTo = maxMargin;
            } else if (direction == 'begining') {
                moveTo = 0;
            }

            if (moveTo > 0) {
                moveTo = 0;
            }
            if (moveTo < maxMargin) {
                moveTo = maxMargin;
            }

            $thumbsContainer.animate({
                marginLeft: moveTo
            }, 500);

            firstVisible = (-moveTo) / cellWidth;
        };

        if ($thumbs.length) {
            // from the list for thumbs, load first image and related text
            var hashVal = (window.location.hash).replace('#', '');
            if (isNumber(hashVal)) { currentSelected = hashVal; }

            ImageGallery.loadItem(parseInt(currentSelected));
        }

        //on thumb item click, load the image and related text
        $thumbs.click(function (event) {
            event.preventDefault();
            currentSelected = $(this).index();
            ImageGallery.loadItem(currentSelected);
        });

        //on large next click, move to next image
        $largeNavigation.click(function (event) {
            event.preventDefault();
            currentSelected = ($(this).hasClass('next')) ? currentSelected + 1 : currentSelected - 1;
            ImageGallery.loadItem(currentSelected);
        });

        //on small next click, move carosel over by three, or until it reaches end;
        $thumbsNavigation.click(function (event) {
            event.preventDefault();
            var direction = ($(this).hasClass('next')) ? "right" : "left";
            ImageGallery.moveThmbs(direction);
        });

        //pick up browser back and forward buttons
        window.onhashchange = function (e) {
            var hashVal = (window.location.hash).replace('#', '');

            if (currentSelected != hashVal) {
                ImageGallery.loadItem(parseInt(hashVal));
            }
        };
    }

    // cookie notice
    function cookieNotice() {

        var kwmCookie = new Cookie(),
            $cookieBar = $('#cookies'),
            $agreeCta = $cookieBar.find('#cookie-agree').parent(),
            $moreInfo = $cookieBar.find('#cookie-more-info').parent();

        function hideCookieNotice() {
            $cookieBar.slideUp('medium', function () {
                $window.trigger('resize');
            });
        }

        // read cookies
        if (!kwmCookie.check("kwm_Cookie")) {
            $cookieBar.show();
        }

        // write and hide
        $agreeCta.on('click', function () {
            kwmCookie.write("kwm_Cookie", true, 30);
            hideCookieNotice();
        });

        // hide notice
        $moreInfo.on('click', function () {
            $('#cookie-info').slideToggle('medium');
        });
    }

    // language fallback close
    function languageFallback() {
        $('.language-fallback a').on('click', function (e) {
            e.preventDefault();
            $(this).parents('.language-fallback').slideUp('medium');
        });
    }

    // utility functions

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // banner helper function
    function bannerHelper() {
        $('.intro-section.banner-intro').parents('.module-featured-article').addClass('with-intro');
    }

    // gmap get directions
    function getDirections() {
        $('.directions-go').click(function (event) {

            var newWinUrl = 'https://maps.google.com/maps',
                origLocation = $('#map-latitude').text() + ',' + $('#map-longitude').text(),
                destLocation = $('.directions input[type="text"]').val();

            if (destLocation) {
                newWinUrl = newWinUrl + '?saddr=' + origLocation + '&daddr=' + destLocation;
                window.open(newWinUrl, '_blank');
            }
        });

        $('.directions input[type="text"]').keypress(function(e) {
            if (e.which == 13) {
                e.preventDefault();
                $(this).parents('.directions').find('.directions-go').click();
            }
        });
    }

    /*DropLinkModule dropdownlist */
    function setSelectboxStyling() {
        if ($('div.styled-select, div.scfDropListGeneralPanel').length) {
            $('div.styled-select, div.scfDropListGeneralPanel').each(function () {
                //change event handler sets the text to the updated selected text
                $(this).on('change keyup', 'select', function () {
                    if ($(this).attr('data-followLink')) {
                        var url = $(this).find('option:selected').val(); // get selected value
                        if (url) { // require a URL
                            window.location = url.replace('/Careers/Home/', '/'); // redirect
                        }
                        return false;
                    }
                    $(this).parent().find('span').text($.trim($(this).find('option:selected').text()));
                });
            });
        }
    };

    /*DropLinkModule dropdownlist */
    setSelectboxStyling();

    /* history timeline*/

    if ($('div.history-timeline').length) {
        setHistoryTimeline();
    }
    $("li.year-item").wrapAll('<div class="year-area" />'); // wraps all year-items in a div
    $(".history-timeline-pagination ul li.first, .history-timeline-pagination ul li.prev").wrapAll('<div class="first-area" />'); // wraps all year-items in a div
    $(".history-timeline-pagination ul li.last, .history-timeline-pagination ul li.next").wrapAll('<div class="last-area" />'); // wraps all year-items in a div  

    /* history timeline*/


    function setHistoryTimeline() {
        var HistoryTimelineOBJ = this;
        var isTouchSupported = 'ontouchstart' in window;

        var $historyTimeline = $('.history-timeline');
        var $historyTimelineNavigation = $('.history-timeline-pagination');
        var $historyTimelineInner = $('.history-timeline-inner');
        var $historyTimelineMovers = $('.history-timeline-movers');
        var animating = false;
        var yearNow;

        // ** builder functions	**
        this.init = function () {
            $historyTimeline.find('.timeline-hidden').hide();

            HistoryTimelineOBJ.buildTimelineNavigation();
            HistoryTimelineOBJ.highlightCurrentNav();
        };

        this.setContainerMaxWidth = function () {

        };

        this.buildTimelineNavigation = function () {
            var navigationItems = '';
            var year = '';
            var maxWidth = 0;
            var liClass = '';
            var itemsLength = $historyTimeline.find('.year').length;

            navigationItems += '<ul>';
            navigationItems += '<li class="first"><a href="#">first</a></li>';
            navigationItems += '<li class="prev"><a href="#">prev</a></li>';

            $historyTimeline.find('.year').each(function (index) {
                if (index === itemsLength) {
                    liClass = 'year-item year-item-last';
                    maxWidth = maxWidth + $historyTimeline.width();
                } else {
                    liClass = 'year-item';
                    maxWidth = maxWidth + $(this).width();
                }

                year = $(this).find('h2.year-date').text();
                navigationItems += '<li class="' + liClass + '"><a href="#" class="date-' + year + '">' + year + '</a></li>';
            });
            navigationItems += '<li class="next"><a href="#">next</a></li>';
            navigationItems += '<li class="last"><a href="#">last</a></li>';
            navigationItems += '</ul>';

            $historyTimelineNavigation.append(navigationItems);

            $historyTimelineInner.width(maxWidth);

        };

        this.highlightCurrentNav = function () {
            $historyTimeline.find('.year').each(function () {
                leftpos = $(this).offset().left - $('.history-timeline').offset().left;
                yearNow = $(this).find('h2.year-date').text();

                if (leftpos <= 0) {
                    $historyTimelineNavigation.find('.active-year').removeClass('active-year');
                    $historyTimelineNavigation.find('.date-' + yearNow).addClass('active-year');
                }
            });
            $historyTimelineNavigation.find('ul').stop().animate({ scrollLeft: $historyTimelineNavigation.find(".year-item .active-year").position().left - $(".history-timeline-wrapper").width() / 2.5 });
        };

        // ** interaction functions	**
        this.topNavigationButtonClicks = function (obj) {
            var target;
            if (!isNaN($(obj).text())) {
                // clicking a year
                target = $historyTimeline.find('.year-' + $(obj).text());
                activeYear = $(obj).text();
            } else {
                activeYear = $historyTimelineNavigation.find('.active-year').text();

                switch ($(obj).text()) {
                    case 'right':
                    case 'next':
                        target = $historyTimeline.find('.year-' + activeYear).next();
                        break;
                    case 'left':
                    case 'prev':
                        target = $historyTimeline.find('.year-' + activeYear).prev();
                        break;
                    case 'last':
                        target = $historyTimeline.find('.year').eq(-1);
                        break;
                    case 'first':
                        target = $historyTimeline.find('.year').eq(0);
                        break;
                }
                if ($(target).offset() !== undefined)
                    activeYear = target.find('h2.year-date').text();
            }

            if ($(target).offset() !== undefined) {
                var moveto = $(target).offset().left - $('.history-timeline').offset().left;
                $historyTimeline.stop().animate(
                    { scrollLeft: '+=' + moveto }, 400, function () {

                    });
            }
        };

        this.slideLooper = function (moveBy, duration) {
            $historyTimeline.stop().animate({
                scrollLeft: '+=' + moveBy
            }, duration, function () {
                HistoryTimelineOBJ.slideLooper(moveBy, duration);
                //HistoryTimelineOBJ.highlightCurrentNav();
            });
        };

        this.textonlyToggleContent = function (obj) {
            if (!animating) {
                animating = true;

                if (!$(obj).parent().hasClass('opened')) {
                    $historyTimeline.find('.timeline-hidden').slideUp();
                    $historyTimeline.find('.timeline-intro').parent().removeClass('opened');
                    $(obj).siblings('.timeline-hidden').stop().slideDown(function () {
                        $(obj).parent().addClass('opened');
                        animating = false;
                    });
                } else {
                    $(obj).siblings('.timeline-hidden').stop().slideUp(function () {
                        animating = false;
                    });
                    $(obj).parent().removeClass('opened');
                }
            }
        };

        // ** Calling init **
        HistoryTimelineOBJ.init();

        // ** DOM events **
        $historyTimeline.scroll(function () {
            HistoryTimelineOBJ.highlightCurrentNav();
        });

        $historyTimeline.find('.timeline-intro, .expandable-menu-control').click(function () {
            HistoryTimelineOBJ.textonlyToggleContent(this);
        });

        $historyTimelineNavigation.find('ul li a').click(function (event) {
            HistoryTimelineOBJ.topNavigationButtonClicks(this);
            event.preventDefault();
        });

        $historyTimelineMovers.find('ul li a').bind({
            mouseleave: function () {
                $historyTimeline.stop();
            },
            mousemove: function (event) {
                if (!(isTouchSupported)) {
                    var moveby = (event.pageX - $(this).offset().left) / 20;
                    if ($(this).text() == 'left')
                        moveby = moveby - 10;

                    HistoryTimelineOBJ.slideLooper(moveby, 5);
                }
            },
            click: function (event) {
                if (isTouchSupported) {
                    $historyTimeline.stop();
                    HistoryTimelineOBJ.topNavigationButtonClicks(this);
                }
                event.preventDefault();
            },
            mouseup: function (event) {
                $historyTimeline.stop();
                event.preventDefault();
            }
        });

    }

    // wrap each word (or line) of a given text area in a span
    function lineHighlight($els, wrapLine) {
        $els.each(function () {

            var $el = $(this),
                $words,
                $lines,
                text = ($.trim($el.text())).split(' '),
                newText = [],
                temp = [],
                lineTop = undefined,
                lineWrap = false,
                expectedHeight,
                fontSize;

            // wrap words
            for (var i in text) {
                text[i] = '<span class="word">' + text[i] + '</span>';
            }

            $el.html(text.join(' '));

            if (client.IE7) {
                return;
            }

            // wrap line
            if (wrapLine) {
                $words = $el.children('span');
                $words.each(function (index) {
                    var $word = $(this),
                        posTop = $word.position().top;

                    if (index === 0 || posTop !== lineTop) {
                        if (index !== 0) {
                            newText.push('<div class="line"><span>' + temp.join(' ') + '</span></div>');
                            temp = [];
                        }
                        lineTop = posTop;
                    }

                    temp.push($word.text());

                    if ((index + 1) === $words.length) {
                        newText.push('<div class="line"><span>' + temp.join(' ') + '</span></div>');
                    }
                });
                $el.html(newText.join(' '));

                // now check if line wrap anomaly and reduce font size until fits
                $lines = $el.children('div');
                expectedHeight = parseInt($lines.css('line-height')),
                fontSize = parseInt($lines.css('font-size'));

                do {
                    $lines.each(function () {
                        var $line = $(this).children('span');
                        if ($line.height() > expectedHeight) {
                            fontSize = fontSize - 2;
                            $lines.css('font-size', fontSize);
                            lineWrap = false;
                        } else {
                            lineWrap = true;
                        }
                    });
                } while (lineWrap === false)

            }
        });
    }

    function buttonArrow($arrow) {
            $arrow.on("click", function() {
                if (!$(this).closest(".button").hasClass("down")) {
                    var $closestButton = $(this).closest('.button').find('a');
                    closestButtonLocation = $closestButton.attr('href');
                    window.location.href = closestButtonLocation;
                }
            });
    }

    // check contents of border-bottom divs - if the child column divs are all empty, hide the container
    function emptyBorderDivCheck() {

        $('.border-bottom').each(function () {
            var $el = $(this),
                $childDivs = $el.children(),
                isEmpty = false,
                notEmpty = false;

            $childDivs.each(function () {
                $.trim($(this).html()); // trim whitespace from children

                if (!$(this).children().length > 0) { // check if child has children
                    if ($.trim($(this).html()) === '') {
                        isEmpty = true;
                    }
                } else {
                    notEmpty = true;
                }
            });

            if (!(notEmpty && isEmpty)) {
                if (isEmpty == true && notEmpty == false) {
                    $el.addClass('empty-hide');
                }
            }
        });
    }

    $('.lightbox-trigger').on('touchstart click', function () {
        var targetLightbox = $(this).attr('href'),
            $lightbox = $(targetLightbox);
        $lightbox.addClass('shown');
        lightboxResize();

    });
    $('.lightbox-close').on('touchstart click', function () {
        $('.lightbox-wrapper').removeClass('shown');
        $('body').removeClass('no-scroll');
    });

    function setDatePickerParameters() {
        var $hdnDateFrom = $('#hdnDateFrom'),
            $hdnDateTo = $('#hdnDateTo');

        if ($hdnDateFrom) {
            $('.start-date .date-input').datepicker('setDate', $hdnDateFrom.val());
        }
        if ($hdnDateTo) {
            $('.end-date .date-input').datepicker('setDate', $hdnDateTo.val());
        }
    }

    // vertical slider text centering
    function centreSliderText() {
        
        var height = $('.ch-carousel').height() * 2 / 3;

        $('.image-ratio .vertical-centre').height(height);
    }

    // generic equal heights for list items
    function equalHeights($container) {

        $container.each(function () {

            var heights = [];

            $(this).children().each(function() {
                heights.push($(this).height());
            });

            var tallest = Math.max.apply(Math, heights);

            if (tallest > 0) {
                $(this).children().height(tallest);
            }

        });
    }

    // enter kepress helper
    function enterKeypressHelper(event, callback) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode === 13) {
            event.preventDefault();
            callback(); // run resultant
        }
    }

    function createResponsiveArticleItems($items, itemsPerRow) {
        var markup = '<div class="equal-height-row row group">';
        $items.each(function (index) {
            if (index !== 0 && index % itemsPerRow === 0) {
                markup += '</div><div class="equal-height-row row group">'; // insert a new row if at the start of a new set of items
            }
            markup += $(this).clone().removeClass('col-12 col-6 col-4 col-3 last').addClass('col-3')[0].outerHTML;
        });
        markup += '</div>';
        return markup;
    }

    function responsiveArticles() {
        var $group = $(this).find('.group-holder').addClass('only-desktop'),
            $items = $group.find('.result.col'),
            $groupMob = $('<div class="group group-holder only-tablet only-mobile">' + createResponsiveArticleItems($items, 2) + '</div>');

        $group.after($groupMob);
    }

    function locationsMap() {
        $('.locations-map').each(function () {
            var $holder = $(this),
                $mapImg = $holder.find('img'),
                $map = $holder.find('[name="' + $mapImg.attr('usemap').replace('#', '') + '"]'),
                widthAttr = $mapImg.attr('width');

            // set height attr to allow script to calculate area positions
            if (typeof widthAttr !== 'undefined' && widthAttr !== '') {
                $mapImg.attr('height', parseInt($mapImg.attr('width')) * ($mapImg.height() / $mapImg.width()));
            }

            // prevent areas causing errors for responsive behaviour if no coordinates are defined
            $map.find('area').each(function () {
                var coords = $(this).attr('coords');
                if (typeof coords === 'undefined' || coords === '') {
                    $(this).remove();
                }
            });

            // call responsive map plugin
            $mapImg.rwdImageMaps();

            // disable area click at reduced widths
            $map.on('click', 'area', function (e) {
                if ($window.width() <= 768) { // width to disable areas
                    e.preventDefault();
                }
            });
        });
    }

    // auto load url in location and language dropdown
    function headerSelectors() {
        $(this).find('select').on('change', function () {
            window.location.href = this.value;
        });
    }

    // site search
    function searchAutoComplete($input, $searchResults) {
        // hide input when emptied
        $input.on('keyup', function () {
            if ($.trim($input.val()) === '') {
                $searchResults.removeClass('show');
            }
        });

        // auto complete
        $.widget("custom.catcomplete", $.ui.autocomplete, {
            _create: function () {
                this._super();
                this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
            },

            _resizeMenu: function () {
            },

            _renderMenu: function (ul, items) {

                var categoryMarkup = [],
                    resultsMarkup = '',
                    sorted = {}, // sorted data object
                    currentCategory = '';

                // sort data by categories
                for (var item in items) {
                    var data = items[item];
                    if (data.category !== currentCategory) {
                        if (!sorted[data.category]) {
                            sorted[data.category] = []; // create new category
                        }
                        sorted[data.category].push(data);
                    }
                }

                // iterate through categories
                for (var category in sorted) {
                    categoryMarkup = []; // flush array
                    categoryMarkup.push('<ul class="' + category.toLowerCase() + '"><li class="header">' + category + '</li>'); // build category ul and add header

                    // iterate through category items
                    for (var line in sorted[category]) {
                        var lineData = sorted[category][line];
                        categoryMarkup.push('<li><a href=" ' + lineData.value + '">' + lineData.label + '</a></li>');
                    }

                    categoryMarkup.push('</ul>');
                    resultsMarkup += categoryMarkup.join("");
                }

                $searchResults.html(resultsMarkup);

                if (resultsMarkup !== '') {
                    $searchResults.addClass('show');
                } else {
                    $searchResults.removeClass('show');
                }
            },

            _renderItemData: function (ul, item) {

            }
        });

        var dataRequest;
        $input.catcomplete({
            delay: 0,
            closeOnSelect: false, // Keep list open when item selected.
            updateElement: false, // Don't change the input box contents.
            minLength: 0,
            select: function (event, ui) {
                return false;
            },
            focus: function () {
                return false;
            },
            source: function (request, response) {
                request.term = encodeURI($.trim(request.term)); // make sure to trim string
                var url = '/services/AutocompleteService.svc/search?term=' + request.term,
                    lang = $input.attr('data-language'),
                    autocompleteContentDistribution = $input.data('content-distribution');

                if (lang !== undefined) {
                    url += '&lang=' + lang;
                } else {
                    url += '&lang=en';
                }

                if (autocompleteContentDistribution != undefined) {
                    url += '&contentDistribution=' + autocompleteContentDistribution;
                }

                // clear any currently running ajax calls to prevent previous requests finishing after newer ones
                if (typeof dataRequest !== 'undefined') {
                    dataRequest.abort();
                }
                dataRequest = $.getJSON(url, function (data) {
                    if (data.length === 0) {
                        $searchResults.removeClass('show').empty();
                        return false;
                    }
                    response(data);
                });
            }

        });
    }

    function headerSiteSearch() {
        var $holder = $(this),
            $input = $holder.find('input[type="text"]'),
            $searchPanel = $holder.find('.search-panel');

        $holder.find('.icon, .search-close').on('click', function () {
            $searchPanel.toggleClass('show');
            $html.toggleClass('search-open');
            $searchPanel.stop().fadeToggle(200);
            if ($searchPanel.hasClass('show')) {
                $input.trigger('focus');
            }
        });

        $input.on('keyup', function (e) {
            if (e.keyCode === 13) { // enter key
                $holder.find('input[type="submit"]').trigger('click');
            }
        });

        if (!client.OldIE) {
            searchAutoComplete($input, $searchPanel.find('.results-container'));
        }

        // bind click to document to hide search
        $(document).on('click touchend', function (e) {
            if ($(e.target).parents('.search-holder').length === 0) {
                $searchPanel.removeClass('show');
                $html.removeClass('search-open');
                $searchPanel.stop().fadeOut(200);
            }
        });
    }

    // site nav hover events
    function siteNavigation() {
        if (client.Mobile) {
            var $topAnchors = $(this).find('> ul > li > a'),
                $subNavs = $topAnchors.next('.subnav');

            // clickable nav items for mobile
            $(this).find('> ul > li > a').on('click', function() {
                if ($(window).width() <= 1100) { // width taken from media query where slide nav is used
                    return;
                }

                var $anchor = $(this),
                    $subNav = $anchor.next('.subnav');

                if ($subNav) {
                    if ($anchor.hasClass('open')) {
                        return;
                    }
                    e.preventDefault();
                    $subNavs.fadeOut(200);
                    $subNav.stop().fadeIn(200);
                    $topAnchors.removeClass('open');
                    $anchor.addClass('open');
                }
            });

            // bind click to document to hide subnavs if open
            $(document).on('click touchend', function (e) {
                if ($(e.target).parents('.site-navigation').length === 0) {
                    $topAnchors.removeClass('open');
                    $subNavs.stop().fadeOut(200);
                }
            });
        } else {
            $(this).find('> ul > li').on({
                mouseenter: function() {
                    $(this).children('div').fadeIn(200);
                },
                mouseleave: function() {
                    $(this).children('div').stop().fadeOut(200);
                }
            });
        }
    }

    function mobileMenu() {
        var $mobNav = $('#mobile-nav');
        $('#begin-journey').find('a').add($mobNav.find('a.close')).on('click', function (e) {
            e.preventDefault();
            $mobNav.toggleClass('open');
        });
        
        // close mobile nav by default when clicking off of it
        $(document).on('click touchend', function (e) {
            var $target = $(e.target);
            if ($target.parents('#mobile-nav').length === 0 && $target.parents('#begin-journey').length === 0 && !$target.is($mobNav)) {
                $mobNav.removeClass('open');
            }
        });
    }

    function landingListingToggle() {
        var $itesmWithChildren = $(this).find('.has-children');
        $itesmWithChildren.find('h3').on('click', function (e) {
            if ($window.width() <= 600) { // media query width used in CSS to hide listing child items
                var $clickedItem = $(this);
                if ($clickedItem.hasClass('open')) {
                    return;
                }
                e.preventDefault();

                // close any other open items
                $itesmWithChildren.find('.open').removeClass('open').next('ul').slideUp(250);

                // open child up and scroll to it
                $clickedItem.addClass('open').next('ul').stop().slideDown(250, function () {
                    if ($clickedItem.offset().top < $window.scrollTop()) { // if item will be above viewport area, scroll to it
                        $html.add($body).animate({ scrollTop: $clickedItem.offset().top - 10 }, 250);
                    }
                });
            }
        });
    }

    function regionFilter() {
        var $holder = $(this),
            $filterSelect = $holder.find('select'),
            $regionContainer = $holder.siblings('.region-container'),
            $regions = $regionContainer.find('.grouping');

        function toggleVisible() {
            var val = $filterSelect.val();
            if (val === '-1') {
                $regions.removeClass('hide');
                return;
            }
            $regions.addClass('hide');
            $regions.filter('[data-region="' + val + '"]').removeClass('hide');
        }

        toggleVisible();
        $holder.find('select').on('change', toggleVisible);
    }

    // set class to hide articles on small height screens
    function homePageIe8Helper() {
        if ($(window).height() <= 800) {
            $html.addClass('height-lt-800');
            $('.homepage .feature-carousel').parent('.group').height($window.height());
        } else {
            $html.removeClass('height-lt-800');
            $('.homepage .feature-carousel').parent('.group').height('');
        }
    }
  
    $(document).ready(function () {

        $('.sectors-dropdown-compontent').on('change', function () {
            if ($(this).val() !== '') {
                window.location.href = $(this).val();
            }
        });

        $('#practicesDropDown').on('change', function () {
            if ($(this).val() !== '') {
                window.location.href = $(this).val();
            }
        });

        $('#locationsDropDown').on('change', function () {
            if (this.value !== '#') {
                window.location.href = this.value;
            }
        });

        $('#searchCategoriesDropDown').on('change', function () {
            $('#select-searchcategory-link').attr('href', $(this).val());
        });


        $('.accordion-header').on('touchstart click', function (e) {
            var accordContainer = $(this).closest('.accordion-container');
            var accordContent = accordContainer.find('.accordion-content');

            $(this).toggleClass('open');
            accordContent.slideToggle();
            e.preventDefault();
        });

        // open contact me lightbox on page load if open-contact query is in url
        if ($('.scfCaptchaLimitGeneralPanel').length) {
            if (window.location.href.indexOf('open-contact=1') > -1) { // open lightbox
                loadEmailLightbox();
                if (window.history && window.history.replaceState) {
                    window.history.replaceState({}, window.title, window.location.pathname);
                }
            } else {
                $('.scfCaptchaLimitGeneralPanel tbody tr td:last-child input[type=image]:first').on('click', function () {
                    $('body > form').attr('action', $('body > form').attr('action') + '?' + 'open-contact' + '=1'); // add open-contact query to form action
                });
            }

            $window.load(function() {
                $('input[href*="CaptchaAudio"]').click(function () {
                    $(this).parents('table').next().find('embed').attr('hidden', false);
                });
            });
        }

        if ($('a.sendmail').length) {
            $('a.sendmail').each(function () {
                $(this).click(function (e) {
                    var emailAddress = $(this).attr('data-email-pre') + '@' + $(this).attr('data-email-post');
                    e.preventDefault();
                    window.open('mailto:' + emailAddress, '_self');
                });
            });
        }

        if ($("#map_canvas").length) { // check existence
            initialize();
        }

        if ($('.map-canvas-google').length) { // if google map
            if ($('#get-directions').length) {
                $('#get-directions').show(); // show the directions control
                getDirections(); // initialise directions logic
            }
        } else {
            $('#get-directions').closest('.border-bottom').css('border-bottom', '0'); // hide the border above for other map types
        }

        if ($('div.image-gallery').length) {
            setImageGallery();
        }

        if ($('.region-container-mobile').length) {
            regionTwoCol();
            locationFilter();
        }

        if ($('.language-fallback').length) {
            languageFallback();
        }

        //#region show more with legacy versions

        // show more legacy 1
        if ($('.show-more').length) {
            showMoreLegacyOne();
        }

        // show more legacy 2 
        if ($('.show-more-trigger.cta').length) {
            showMoreLegacyTwo();
        }

        // show more legacy 3
        if ($('.show-more-trigger.cta').length) {
            showMoreLegacyThree();
        }

        // show more / show less
        if ($('.show-more-container .show-more-trigger.more.cta').length) {
            showMore();
        }

        //#endregion

        if ($('.featured-author.multi').length) {
            setAuthorColumns();
        }

        if ($('.show-filter-search').length) {
            filterSearch();
        }

        if ($('.down-arrow').length) {
            scrollDown();
        }

        if ($('#go').length) {
            goDeeper();
        }

        if ($('.button').length) {
            buttonArrow($('.button .arrow'));
        }

        if ($('.with-image h1.banner-title').length) {
            lineHighlight($('.with-image .banner-title'), true);
        }

        if ($('.lightbox-container').length) {
            lightboxResize();
        }

        if ($('.module-featured-article .intro-section').length) {
            bannerHelper();
        }

        if ($('.border-bottom').length) {
            emptyBorderDivCheck();
        }

        if ($('.homepage').length) {
            mobileLandscapeHelper(); // homepage mobile landscape helper
            centreSliderText();
            if (client.IE8) { // set class to hide articles on small height screens
                homePageIe8Helper();
            }
        }

               
        stylishForms.apply();

        if ($('.date-input').length) {
            $('.date-input').datepicker({
                dateFormat: $('#hdnDatePickerFormat').val(),
                minDate: new Date(2009, 10 - 1, 25),
                maxDate: '0'
            });

            setDatePickerParameters();
        }

        // key contact positioning if line wraps
        var $keyContact = $(".key-contact");
        if ($keyContact.length) {

            //$keyContact.width($keyContact.outerWidth());
            //$keyContact.find('.contact-info').css({
            //    position: 'absolute',
            //    bottom: '0',
            //    right: '0'
            //});

            //if ($keyContact.height() > 320 || $window.width() <= 670) {
            //    var $keyContactInfo = $keyContact.find('.contact-info');

            //    $keyContactInfo.css({
            //        marginTop: 10,
            //        marginLeft: 0
            //    });
            //    $keyContactInfo.children().css({
            //        whiteSpace: 'normal'
            //    });
            //}
        }

        /*
         * various search pages trigger implemetation (different markup structures per search page)
         * 
         */

        // people search 

        if ($("#simpleKeywordsSearch").length) {
            $("#simpleKeywordsSearch").on({
                keyup: function (e) {
                    $('#txtTitleName').val($(this).val());
                    enterKeypressHelper(e, function() {
                        $('#btnSearch').click();
                    });
                }
            });
        }

        // side nav search
        if ($('#menu-2').length) {
            var $searchMenu = $('#menu-2');

            $searchMenu.find('#SearchInput').on({
                keypress: function (e) {
                    enterKeypressHelper(e, function () {
                        $searchMenu.find('input[type="submit"]').click(); // do generic search
                    });
                }
            });
        }

        // general search
        if ($(".search-results-bar").length) {
            $(".search-results-bar").on({
                keypress: function (e) {
                    enterKeypressHelper(e, function () {
                        $(".search-results-bar").find('input[type="submit"]').click(); // do generic search
                    });
                }
            });
        }

        // responsive iframe helper
        $('iframe[src*="youtube.com/embed"]').each(function () {
            $(this).wrap('<div class="responsive-embed-container"></div>');
        });


        // has searched
        // catches searched state and adjusts positioning of page accordingly
        var formAction = $('form').attr('action');
        if (formAction.indexOf('?') != -1) {
            
            // scroll to search component
            setTimeout(function () {

                // people search loaded
                if ($('#search-simple-form').length) {
                    window.scrollTo(0, $('#search-simple-form').position().top - 50);
                }

                // generic search loaded
                if ($('#search-results-page').length) {
                    window.scrollTo(0, $('.search-results-bar').position().top - 200);
                }

                // filter search loaded 
                if ($('.search-filters').length) {
                    window.scrollTo(0, $('.module-filter-bar').position().top - 200);
                    if (checkQuery('exp', 0) === false) { // was not a pagination search
                        $('.search-filters').show();
                    }
                    
                }

            }, 0);

        }


        // tweet to
        if ($('.tweet-to').length) {
            $('.tweet-to a').on({
                click: function(e) {
                    e.preventDefault();
                    window.open($(this).attr('href'), "Tweet to", "width=600, height=600, left=500, top=200");
                }
            });
        }

        // mobile menu - not needed in old IE
        if ($('#mobile-nav').length && !client.OldIE) {
            mobileMenu();
        }

        // create article listing mobile variant
        if ((!$('#mainWrapper').hasClass('homepage')) && (!client.OldIE)) {
            $('.article-listing').each(responsiveArticles);
        }

        if ($('.equal-height-container').length) {
            setRowsEqual();
        }

        // reload page on header selector change events
        $('.header-selectors').each(headerSelectors);

        // site search events + autocomplete
        $('#site-header .search-holder').each(headerSiteSearch);

        // main navigation events
        $('.site-navigation').each(siteNavigation);

        // click to show 
        $('.two-col-listing:not(.region-container)').each(landingListingToggle);

        // region filter for locations page
        $('.region-filter').each(regionFilter);

    }); // dom ready
    
    $(window).load(function () {
        sizeImages();
        cookieNotice();

        // ensure image has loaded for location map
        if ($('.locations-map').length) {
            boot.loadScript('jquery.rwdImageMaps.min.js', 'global', locationsMap);
        }

        // load carousel after all images
        if ($('.ch-carousel').length) {
            $(".ch-carousel").codehouseCarousel({
                modes: {
                    slide: true,
                    infinite: true,
                    responsive: true,
                    nudge: false
                },
                controls: {
                    step: true,
                    pager: true
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
                options: {
                    stickySlides: false,
                    visibleClassAfter: true,
                    maskedOverflow: true
                },
                onReady: function() {
                    buttonArrow($('.slide-container .arrow')); // bind arrow clicks RBE
                }
            });
        }

    }); // window load

    var resizeTimer;

    // global resize
    function resizeEnd() {

        // line highlights
        if ($('.with-image h1.banner-title').length) {
            lineHighlight($('.with-image .banner-title'), true);
        }

        // other subsequent actions
        if ($('.lightbox-container').find('.equal-heights').length) {
            equalHeights($('.lightbox-container').find('.equal-heights'));
        }

        // set class to hide articles on small height screens
        if (client.IE8 && $('.homepage').length) {
            homePageIe8Helper();
        }
    }

    $(window).resize(function () {
        sizeImages();
        setRowsEqual();
        sizeSearch();
        lightboxResize();

        if ($('.homepage').length) {
            mobileLandscapeHelper();
            centreSliderText();
        }

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            resizeEnd();
        }, 100);

    }); //window resize

}(jq110)); // specific jQuery version passed in to prevent issues if Sitecore version in preview mode is used
