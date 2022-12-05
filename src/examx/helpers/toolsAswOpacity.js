export const toolsAswOpacity = () => {

    $('.ne-qst-respe').mouseover( () => {
        $(".tools").removeClass("ne-qst-tools0p");
        $('.tools').addClass('ne-qst-tools')
    });

    $('.ne-qst-respe').mouseout( () => {
        $('.tools').removeClass('ne-qst-tools')
        $(".tools").addClass("ne-qst-tools0p");
    });
}
