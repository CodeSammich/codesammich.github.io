
// google map
var map = '';
var center;

function initialize() {
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(40.7679619,-73.9800172),
        scrollwheel: false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),  mapOptions);

    google.maps.event.addDomListener(map, 'idle', function() {
        calculateCenter();
    });

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
    });
}

function calculateCenter() {
    center = map.getCenter();
}

function loadGoogleMap(){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' + 'callback=initialize';
    document.body.appendChild(script);
}

// Flexslider
$(function(){
    /* FlexSlider */
    $('.flexslider').flexslider({
        animation: "fade",
        directionNav: false
    });

    new WOW().init();

    loadGoogleMap();
});

// isotope
jQuery(document).ready(function($){

    if ( $('.iso-box-wrapper').length > 0 ) {

        var $container  = $('.iso-box-wrapper'),
            $imgs     = $('.iso-box img');

        $container.imagesLoaded(function () {

            $container.isotope({
                layoutMode: 'fitRows',
                itemSelector: '.iso-box'
            });

            $imgs.load(function(){
                $container.isotope('reLayout');
            })

        });

        //filter items on button click
        $('.filter-wrapper li a').click(function(){

            var $this = $(this), filterValue = $this.attr('data-filter');

            $container.isotope({
                filter: filterValue,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            // don't proceed if already selected
            if ( $this.hasClass('selected') ) {
                return false;
            }

            var filter_wrapper = $this.closest('.filter-wrapper');
            filter_wrapper.find('.selected').removeClass('selected');
            $this.addClass('selected');

            return false;
        });

    }

});

// Hide mobile menu after clicking on a link
$('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.navbar-default a, a,').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 68
        }, 1000);
        event.preventDefault();
    });
});

$(".card").mouseenter(function(e){
    if ($(this).find('> .card-reveal').length) {
        if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i')) ) {
            // Make Reveal animate up
            $(this).find('.card-reveal').css({ display: 'block'}).velocity("stop", false).velocity(
                {translateY: '-100%'},
                {
                    duration: 300,
                    queue: false,
                    easing: 'easeInOutQuad'
                });
        }
    }

    $('.card-reveal').closest('.card').css('overflow', 'hidden');

});

$(".card").mouseleave(function(){
    // Make Reveal animate down and display none
    $(this).find('.card-reveal').velocity(
        {translateY: 0},
        {
            duration: 225,
            queue: false,
            easing: 'easeInOutQuad',
            complete: function() {
                $(this).css({ display: 'none'});
            }
        });
});
