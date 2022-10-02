$(document).ready(function () {

    $(function () {

        $("#news-container").sortable({
            helper: "clone",
            axis: "y",
            cursor: "grabbing"
        });

        $(".news .news-header").click(function (event) {
            const target = $(event.target);

            let container;
            let header;
            if (target.prop("tagName") === "IMG") {
                console.log("test")
                container = target.parent().parent();
                header = target.parent();
            } else {
                container = target.parent();
                header = target;
            }

            const imgChildren = header.children("img");
            const arrow = imgChildren.eq(0);
            const enlarger = imgChildren.eq(1);
            if (container.hasClass("selected")) {
                arrow.attr("src", "./icons/sort-right.png");
                enlarger.attr("src", "./icons/resize-vertical.png");
                enlarger.css("width", "12px");
            } else {
                arrow.attr("src", "./icons/arrow-down.png");
                enlarger.attr("src", "./icons/icons8-direction-64.png");
                enlarger.css("width", "16px");
            }
            container.toggleClass("selected");

            const content = header.next();
            content.toggleClass("close");
        });
    });

    $("#form-register").submit(function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const id = formData.get("id");
        const name = formData.get("name");
        const sex = formData.get("sex");
        const birthdate = new Date(formData.get("birthdate"));

        const datestring = ("0" + birthdate.getDay()).slice(-2) + "/" + ("0"+(birthdate.getMonth()+1)).slice(-2) + "/" +
            birthdate.getFullYear();
        $("#students").children(":first").append("<tr>\n" +
            "<td>" + id + "</td>\n" +
            "<td>" + name + "</td>\n" +
            "<td>" + ((sex === "male") ? "Nam" : "Nu") + "</td>\n" +
            "<td>" + datestring + "</td>\n" +
            "</tr>");

        let registeredCourses = "";
        $("#courses-registered").children().each((id, course) => {
            registeredCourses += (id + 1 + ". " + course.innerText + "\n");
        });

        alert(registeredCourses);
    });

    $("#register-btn").click(function (event) {
        resetError();

        let error = false;

        const idField = $("input[name='id']").first();
        const id = idField.val().trim();
        const errorIdField = idField.parent().next();
        if (!id) {
            idField.css({"border": "1px solid red", "color": "red"});
            errorIdField.append("<br/>Vui long nhap ma so.");
            error = true;
        }
        if (isNaN(id)) {
            idField.css({"border": "1px solid red", "color": "red"});
            errorIdField.append("<br/>Ma so chi bao gom ky so.");
            error = true;
        }
        if (id.length !== 8) {
            idField.css({"border": "1px solid red", "color": "red"});
            errorIdField.append("<br/>Ma so chi gom 8 ky so.");
            error = true;
        }
        const prefixId = parseInt(id.slice(0, 2));
        if (16 > prefixId || prefixId > 22) {
            idField.css({"border": "1px solid red", "color": "red"});
            errorIdField.append("<br/>2 ky so dau chi tu 17 -> 22.");
            error = true;
        }

        const nameField = $("input[name='name']").first();
        const name = nameField.val().trim();
        const errorNameField = nameField.parent().next();
        if (name.split(" ").length < 2) {
            nameField.css({"border": "1px solid red", "color": "red"});
            errorNameField.append("<br/>Ho va Ten co it nhat 2 ki tu.");
            error = true;
        }

        const addressField = $("input[name='address']").first();
        const address = addressField.val().trim();
        const errorAddressField = addressField.parent().next();
        if (address.split(" ").length < 2) {
            addressField.css({"border": "1px solid red", "color": "red"});
            errorAddressField.append("<br/>Dia chi co it nhat 2 ki tu.");
            error = true;
        }

        const phoneField = $("input[name='phone']").first();
        const phone = phoneField.val().trim();
        const errorPhoneAddress = phoneField.parent().next();
        if (!phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/g)) {
            phoneField.css({"border": "1px solid red", "color": "red"});
            errorPhoneAddress.append("<br/>SDT yeu cau 10 ky so bat dau boi 0.");
            error = true;
        }

        const emailField = $("input[name='email']").first();
        const email = emailField.val().trim();
        const emailErrorField = emailField.parent().next();
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            emailField.css({"border": "1px solid red", "color": "red"});
            emailErrorField.append("<br/>Vui long nhap email hop le.");
            error = true;
        }

        if (!error) {
            $("#form-register").submit();
        }
    });

    $("#reset-btn").click(function (event) {
        resetForm();
        resetError()
    });

    function resetForm() {
        $("#form-register").trigger("reset");
    }

    function resetError() {
        $("#form-register input").css({"border": "1px solid #000", "color": "#000"});
        $(".error").text("");
    }

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

    $(".course-list").each((listId, list) => {
        $(list).each((courseId, course) => {
            $(course).click(function (event) {
                event.preventDefault();
                $(event.target).toggleClass("selected");
            })
        })
    });

    $("#register").click((event) => {
        $("#courses-unregister").children().each((id, course) => {
            const el = $(course);
            if ($(course).hasClass("selected")) {
                el.toggleClass("selected");
                $("#courses-registered").append(el.detach());
            }
        })
    });

    $("#register-all").click((event) => {
        $("#courses-unregister").children().each((id, course) => {
            const el = $(course);
            if ($(course).hasClass("selected")) {
                el.toggleClass("selected");
            }
            $("#courses-registered").append(el.detach());
        })
    });

    $("#unregister").click((event) => {
        $("#courses-registered").children().each((id, course) => {
            const el = $(course);
            if ($(course).hasClass("selected")) {
                el.toggleClass("selected");
                $("#courses-unregister").append(el.detach());
            }
        })
    });

    $("#unregister-all").click((event) => {
        $("#courses-registered").children().each((id, course) => {
            const el = $(course);
            if ($(course).hasClass("selected")) {
                el.toggleClass("selected");
            }
            $("#courses-unregister").append(el.detach());
        })
    });;
})