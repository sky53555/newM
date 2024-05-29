$(function () {


    $('.openImg').stop().animate({ top: "0" }, 1000, function () {
        $(this).stop().animate({ top: "-250px" }, 2000, function () {
            $('.open').stop().fadeOut()
        })
    })
});