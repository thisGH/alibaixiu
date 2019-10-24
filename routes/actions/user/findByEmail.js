// 用户模块
const {
    User
    
} = require('../../../model/User');
module.exports = async (req, res) => {
    // 获取用户id
    const email = req.query.email;
    // 查询用户信息
    const user = await User.findOne({
        email: email
    }).select('-password');



    // 响应返回头像
    if (user) {
        res.send({
            avatar: user.avatar
        })
    } else {
        res.status(400).send({
			message: '邮箱未注册'
		});
    }
}