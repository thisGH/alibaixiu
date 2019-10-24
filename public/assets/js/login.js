window.onload = function () {

    $('#logForm').on('submit', function () {
        var formData = $(this).serialize();
        $.ajax({
            url: '/login',
            type: 'post',
            data: formData,
            success: function (res) {
                location.href = '/admin/users.html'
            },
            error:function(err){
                
                var msg =JSON.parse( err.responseText);
                console.log(msg);

                if(msg.verify){
                    $('#emailErr').html(msg.verify.img+'<input id="verify" type="text" class="form-control" placeholder="验证码" autofocus name="verifyCode">').show();
                    return
                }
                $('#emailErr').html('<strong>错误！</strong>' +JSON.parse( err.responseText).message).show();
            }
        })
        return false
    })

    $('#email').on('blur', function () {
        var email = $(this).val();
        $.ajax({
            url: '/users/findByEmail',
            type: 'get',
            data: 'email=' + email,
            success: function (res) {
                console.log(res);
                
                $('#emailErr').hide();
                $('#avatar').attr('src', res.avatar).show();
                
            },
            error: function (err) {
                $('#emailErr').html('<strong>错误！</strong>' + JSON.parse( err.responseText).message).show();
                $('#avatar').hide()
            }
        })
    })











}