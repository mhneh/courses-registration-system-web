$(document).ready(function () {

    $(function () {

        $("#news-container").sortable({
            helper: "clone",
            axis: "y",
            cursor: "grabbing"
        });

        $(".news").click(function (event) {
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
    });

    $("#form-register").submit(function (event) {
        event.preventDefault();
        console.log("HH");

        const form = $(event.target);
        console.log(form.data("id"));
        console.log(form.data("name"));
    });

    $("#register").click(function (event) {
        console.log("Register");
        $("#form-register").submit();
    });

    $("#reset").click(function (event) {
        console.log("Reset");
        $("#form-register").trigger("reset");
    });

    $("#courses-unregister").sortable({
        helper: "clone",
        cursor: "grabbing",
        connectWith: "#courses-registered"
    });

    $("#courses-registered").sortable({
        helper: "clone",
        cursor: "grabbing",
        connectWith: "#courses-unregister"
    });
})