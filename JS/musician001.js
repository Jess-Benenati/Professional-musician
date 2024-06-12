jQuery(document).ready(function($){
// Toggle Nav Menu on button click
var $root = $('html, body'),
    menu_toggle = $('.menu-toggle');

    menu_toggle.on('click', function(){
        var $this = $(this);

        $this.toggleClass('close');
        $('.menu, .menu-nav, .menu-nav-item').toggleClass('show');
    });

    // Toggle nav menu item click and smooth scroll
    $('.menu-nav-item a').on('click', function() {
        var $this = $(this),
            href = $this.attr('href');
            // Toggle nav menu
        menu_toggle.removeClass('close');
        $this.parents('.menu-nav-item, .menu-nav, .menu').removeClass('show');

        // Smooth scrolling
        $root.animate({
            scrollTop: $(href).offset().top - 100
        }, 500, function(){
            window.location.hash = href;
        });
        return false;
    });

    // Attach submit handler to form
    $(".contact-form").submit(function(event) {
       
        // Stop form from submitting normally
        event.preventDefault();

        // Serialize submitted form date and get action

        var $form = $(this),
            url = $form.attr("action");
        
        // Send data using post
        var posting = $.post(url, $form.serialize());

        // Put results in a div
        posting.done(function(data) {
            var response = $.parseJSON(data),
                target = $('#status-messages');
            // Add success/error classes
            if(response.status == 1) {
                target.removeClass('error');
                target.addClass('success');
            } else if(response.status == 0) {
                target.removeClass('success');
                target.addClass('error');
            }

            // Append message
            target.empty().append(response.message).hide().fadeIn(400);
        });
    });
});