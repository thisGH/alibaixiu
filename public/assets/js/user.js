window.onload = function () {
    //头像
    $('#avatar').on('change', function () {
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

}