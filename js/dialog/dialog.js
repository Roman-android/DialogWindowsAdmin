import Car from './Car.js';
import Animals from "./Animal.js";

$(document).ready(function () {

    let
        _cover_block = '<a class="cover"></a>',
        cover_block = $(_cover_block),
        count = 0

    let edit_array = {
        ".but_menu": "nav_main",
        ".action_menu": "nav_action",
        ".content_table": "product",
        "aside": "aside",
    }

    let current_dialog,
        item_click_counter = 0,
        dialog_increment = 100;

    $.each(edit_array, function (index, value) {
        $(index).css('position', 'relative')
        actionOnCover($(index), value)
    })

    $(".edit").on("click", function () {
        count++;
        if (count % 2 === 1) {
            $(this).text("Сохранить");

            let car = new Car('Test')
            car.output()
        } else {
            $(this).text("Редактировать");

            let animal = new Animals('Лошадь')
            animal.output()
        }

    })

    function actionOnCover(obj, value) {
        obj.on({
            mouseenter: function () {
                $(this).append(cover_block);
                cover_block.attr('href', '/' + value)
            }, mouseleave: function () {
                cover_block.detach()
            }
        })

    }

    cover_block.on('click', function (e) {
        e.preventDefault()

        if (!$('.dialog_active').length) {
            showDialog()
        }

    })

    function showDialog() {

        /* $.ajax({
             url: 'php/dialogs/dialog.php',
             data: {text: 'Текст'},
             method: 'post'
         })
             .done(html => getHtml(html))
             .fail(function () {
                 alert("error");
             })
             .always(function () {
                 /!*alert( "complete" );*!/
             });*/

        $.post(
            'php/dialogs/dialog.php',
            {text: 'Текст'}
        ).done(html => getHtml(html))
            .fail(function () {
                    alert("error")
                }
            )


    }

    function getHtml(html) {

        item_click_counter++
        console.log('item_click_counter = ' + item_click_counter)

        let top_margin_dialog = (item_click_counter * dialog_increment) - dialog_increment
        let left_margin_dialog = (item_click_counter * dialog_increment) - dialog_increment
        console.log('top_margin_dialog = ' + top_margin_dialog)

        $('body').append($(html));


        let dialog_edit = $('.dialog_edit')
        dialog_edit
            .addClass('dialog_active')


        if (dialog_edit.prev().hasClass('dialog_active')) {
            dialog_edit.prev().removeClass('dialog_active')
        }

        current_dialog = $('.dialog_active')
        current_dialog
            .css({
                'top': top_margin_dialog,
                'left': left_margin_dialog
            })

        current_dialog.show()
    }

    $(document).on('click', '.dialog_active .dialog_item', function () {
        console.log($(this).text())
        showDialog()
    })

    $(document).on('click', '.dialog_active button[type="button"]', function (e) {
        e.preventDefault()
        $('.dialog_active').detach()
        $('.dialog_edit:last').addClass('dialog_active')
        item_click_counter--

        console.log("Нажата кнопка Отмена")
    })

    $(document).on('submit', '.dialog_active .dialog_form', function () {
        console.log("Нажата кнопка Сохранить")

        return false
    })

})