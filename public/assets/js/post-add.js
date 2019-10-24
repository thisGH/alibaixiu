window.onload = function () {
    // 选择图片
    $('#feature').on('change', function () {

        var formData = new FormData();

        formData.append('avatar', this.files[0]);
        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            success: function (res) {
                console.log(res);
                $('#feature').siblings('input').val(res[0].avatar).siblings('img').attr('src', res[0].avatar).show();
            },
            error: function (err) {
                console.log(err);
            },
            //告诉$.ajax方法不要解析请求参数
            processData: false,
            //告诉$.ajax方法不要设置请求参数的类型，
            contentType: false
        })
    })


    //文章保存
    $('#articleForm').on('submit', function (e) {
        var d = new Date();
        var n = d.toLocaleDateString().replace(/\//g,'-');
        !$('#created').val() && $('#created').val(n);
        var formData = $(this).serialize();

        console.log(formData);
        $.ajax({
            url: '/posts',
            type: 'post',
            data: formData,
            success: function (res) {
                console.log(res);
                location.href = '/admin/posts.html'
            },
            error: function (err) {
                console.log(err);
            }
        })
        return false
    })

    //渲染分类
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function (res) {
            console.log(res);
            var html = template('categoriesTpl', {
                data: res
            });
            $('#category').html(html);
        }
    })
}