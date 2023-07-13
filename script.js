$( document ).ready(function() {

    $(".languages .__select__label").on('click', (function () {
        window.location.replace($(this).data('url'));
    }));
});
