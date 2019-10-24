window.onload = function () {
    //添加分类
    $('#editBox').on('submit', '#addForm', function () {
        var formData = $(this).serialize();
        $.ajax({
            url: '/categories',
            type: 'post',
            data: formData,
            success: function (res) {
                console.log(res);
                location.reload();
            },
            error:function(err){
                console.log(err.responseText);
                $('#errBox').show().html('<strong>错误！</strong>'+JSON.parse(err.responseText).message)
            }
        })
        return false
    })

    //渲染分类列表categoriesBody
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function (res) {
            console.log(res);

            var html = template('trTpl', {
                data: res
            });
            $('#categoriesBody').html(html)
        }
    })
    //编辑按钮，渲染编辑分类模板
    $('#categoriesBody').on('click', '#editBtn', function () {
        var id = $(this).parents('tr').attr('data-id');
        $('#errBox').hide()

        $.ajax({
            url: '/categories/' + id,
            type: 'get',
            success: function (res) {
                console.log(res);
                var html = template('changeTpl', res);
                $('#editBox').html(html);
            }
        })


    })
    // 提交编辑
    $('#editBox').on('submit', '#changeForm', function () {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/categories/' + id,
            data: formData,
            type: 'put',
            success: function (res) {
                console.log(res);
                location.reload();
            },
            error: function (err) {
                console.log(err);

            }
        })
        return false
    })

    //删除分类
    $('#categoriesBody').on('click', '#delBtn', function () {
        var id = $(this).parents('tr').attr('data-id');

        $.ajax({
            url: '/categories/' + id,
            type: 'DELETE',
            success: function (res) {
                console.log(res);
                location.reload();
            }
        })
    })

    //全选按钮
    $('#checkAll').on('change', function () {
        $('.checkSingle').prop('checked', this.checked);
        this.checked ? $('#delAll').css({
            'display': 'inline-block'
        }) : $('#delAll').css({
            'display': 'none'
        });
    })
    // 单选影响全选
    $('#categoriesBody').on('change', '.checkSingle', function () {
        var checked = $('.checkSingle').filter(':checked').length;

        $('#checkAll').prop('checked', $('.checkSingle').length == checked);
        checked ? $('#delAll').css({
            'display': 'inline-block'
        }) : $('#delAll').css({
            'display': 'none'
        });
    })
    //批量删除按钮
    $('#delAll a').on('click', function () {
        let ids = [];
        $('.checkSingle').filter(':checked').each(function (index, ele) {
            ids.push($(ele).parents('tr').attr('data-id'));
        })
        $.ajax({
            url: '/categories/' + ids.join('-'),
            type: 'DELETE',
            success: function (res) {
                console.log(res);
                location.reload();
            }
        })
        return false
    })









}