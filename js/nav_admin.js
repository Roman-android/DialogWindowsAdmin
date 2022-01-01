$(document).ready(function () {

    //TODO удалить после использования/копирования "editMode()"
    let count = 0;
    let navArray = [
        'but_menu_item',
    ]

    $(".edit").one("click", function () {
        count++;
        if (count % 2 === 1) {
            $(this).text("Сохранить");
            cancelBehaviour();
            editMode()

        } else {
            $(this).text("Редактировать");
            standardBehaviour();
        }

    })

    function cancelBehaviour() {
        $('.but_menu a').on('click', function () {
            return false
        })
    }

    function standardBehaviour() {
        $('.but_menu a').off('click');
    }

    function editMode() {

        $.each(navArray, function (index, value) {

            let userClass = value;
            let object = $('.' + userClass)

            $.each(object, function (index, value) {

                let _replace = '<input type="text" class="edit_text">';
                let replace = $.parseHTML(_replace);
                $(replace).val($(value).text())
                $(replace).addClass(userClass)

                $(this).replaceWith($(replace));

            })

        })

    }


})