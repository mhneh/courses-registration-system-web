$(document).ready(function () {

    $(function () {

        const newsContainer = $(".news");

        // newsContainer.draggable({
        //     axis: "y",
        //     containment: "body"
        // });

        $("#news-container").sortable();

        // $("#news-container").droppable({
        //     accept: ".news",
        //     class: {
        //         "ui-droppable-active":"ac",
        //         "ui-droppable-hover":"hv"
        //     },
        //     acivate: function( event, ui ) {
        //         $(this).css('background','red');
        //     },
        //     over: function( event, ui ) {
        //         $(this).css('background',"yellow");
        //     },
        //     out: function( event, ui ) {
        //         $(this).css('background','blue');
        //     },
        //     drop: function( event, ui ) {
        //         $(this).css('background','white');
        //     },
        //     deactivate: function( event, ui ) {
        //         $(ui.item).css('background','green');
        //     },
        // });

        newsContainer.click(function (event) {
            const header = $(event.target);

            const container = header.parent();
            const arrow = header.children("img").eq(0);
            const enlarger = header.children("img").eq(1);
            if (container.hasClass("selected")) {
                arrow.attr("src", "./icons/sort-right.png");
                enlarger.attr("src", "./icons/resize-horizontal.png");
            } else {
                arrow.attr("src", "./icons/arrow-down.png");
                enlarger.attr("src", "./icons/icons8-direction-64.png");
            }
            container.toggleClass("selected");

            const content = header.next();
            content.toggleClass("close");
        });
    })



})