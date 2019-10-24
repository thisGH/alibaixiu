window.onload = function () {


    //查询文章列表
    $.ajax({
        url: '/posts',
        type: 'get',
        success: function (res) {
            console.log(res);
            var html = template('postsTpl', {
                data: res.records
            });
            $('#postsBody').html(html)
        }
    })
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function (res) {
            console.log(res);
            var html = template('categoriesTpl', {
                data: res
            });
            $('#categoriesBox').html(html);

        }
    })

    $('#filterForm').on('submit', function () {
        var formData = $(this).serialize();
        console.log(formData);
        $.ajax({
            url: '/posts',
            type: 'get',
            data: formData,
            success: function (res) {
                console.log(res);
                var html = template('postsTpl', {
                    data: res.records
                });
                $('#postsBody').html(html)
            }
        })


        return false
    })

}