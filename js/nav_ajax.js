function onSuccess() {
    $('main').html('<h2>Страница ДЕПО</h2><a href=\'#\' class=\'start_dialog\'>Открыть окно</a>')
}

$(document).ready(function () {

    $('.but_menu_item').on('click', function (e) {
        e.preventDefault()
        let index = $(this).index()
        console.log(index)
        $.ajax({
            url: 'pages/pages_but_menu/page_depo.php'
        }).done(onSuccess)
    })

})