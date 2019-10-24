window.onload = function () {
    //头像
    $('#editBox').on('change','#avatar', function () {
        var formDate = new FormData();
        formDate.append('avatar', this.files[0]);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formDate,
            processData: false,
            contentType: false,
            success: function (res) {
                $('#avatarImg').attr('src', res[0].avatar)
                $('#avatarIpt').val(res[0].avatar)
            }
        })
    })
    //添加用户
    $('#addUserForm').on('submit', function () {
        var formDate = $(this).serialize();
        $.ajax({
            url: '/users',
            type: 'post',
            data: formDate,
            success: function (res) {
                $('#errMsg').css({
                    'display': 'none'
                });
                location.reload();
            },
            error: function (err) {
                console.log(err);
                
                $('#errMsg').css({
                    'display': 'block'
                }).html('<strong>错误！</strong>' + JSON.parse(err.responseText).message)
            }
        })

        return false
    })
    // 渲染用户列表
    $.ajax({
        url: '/users',
        type: 'get',
        success: function (data) {

            var userListTpl = template('userListTpl', {
                data: data
            });
            $('#userBox').html(userListTpl);
        }
    })
    // 用户编辑按钮
    $('#userBox').on('click', '.btn-default', 'userEdit', function () {
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/users/' + id,
            type: 'get',
            success: function (data) {
                var userchangeTpl = template('userchangeTpl', data);
                $('#editBox').html(userchangeTpl)
            }
        })

    })
    //提交修改按钮
    $('#editBox').on('submit', '#changeUserForm', function () {
        var formData = $(this).serialize();
        console.log(formData);
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/users/' + id,
            type: 'put',
            data: formData,
            success: function (res) {
                location.reload();
            }
        })
        return false
    })
    // 全选按钮
    $('#checkAll').on('click', function () {
        $('.singleCheck').prop('checked', this.checked);
        this.checked ? $('.btn-sm').css({
            'display': 'inline-block'
        }) : $('.btn-sm').css({
            'display': 'none'
        })
    })
    // 批量删除按钮
    $('#userTable').on('click', '.singleCheck', function () {
        // 单选影响全选
        $('.singleCheck').each(function (index, item) {
            if (!item.checked) {
                $('#checkAll').prop('checked', false)
                return false
            } else {
                $('#checkAll').prop('checked', true)
            }

        })


        //按钮显示
        $('.singleCheck').each(function (index, item) {
            if (item.checked) {

                $('.btn-sm').css({
                    'display': 'inline-block'
                })
                return false
            } else {
                $('.btn-sm').css({
                    'display': 'none'
                })
            }

        })
    })
    //批量删除
    $('.btn-sm').on('click', function () {
        var ids = new String();
        $('.singleCheck').each(function (index, item) {
            $(item).prop('checked') ? ids += '-' + $(item).parents('tr').attr('data-id') : ids;
        })
        var a = ids.substr(1);
        $.ajax({
            url: '/users/' + a,
            type: 'delete',
            success: function (res) {
                console.log(res);
                location.reload();
            },
            error: function (err) {
                console.log(err);
                location.reload();
            }
        })
        return false
    })
    //单个删除
    $('#userBox').on('click', '#delBtn', function () {
        var id = $(this).parents('tr').attr('data-id');
        if (confirm('确定要删除' + $(this).attr('data-email') + '用户吗？')) {
            $.ajax({
                url: '/users/' + id,
                type: 'delete',
                success: function (res) {
                    console.log(res);
                    location.reload();
                },
                error: function (err) {
                    console.log(err);
                    location.reload();
                }
            })
        }
        return false
    })

}