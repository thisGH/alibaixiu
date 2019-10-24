const {
	User,
	validateLogin,
	getCode
} = require('../../../model/User');
// hash密码
const bcrypt = require('bcrypt');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {

	//验证码校验
	let verify = req.fields.verifyCode;
	console.log(req.fields);
	console.log(req.session.captcha);
	console.log(verify);

	if (!req.session.captcha || req.session.captcha != verify) {
		if (verify) {
			res.status(400).send({
				message: '验证码错误'

			})
			return
		}
		//验证码
		let verifyCode = getCode(req, res);
		console.log(req.session.captcha);
		res.status(400).send({
			verify: verifyCode
		})
		return
	}
	// 数据格式校验
	const {
		error
	} = validateLogin(req.fields);
	// 格式不符合要求
	if (error) return res.status(400).send({
		message: error.message
	})
	// 查找用户
	let user = await User.findOne({
		email: req.fields.email
	});
	// 如果用户不存在 响应
	if (!user) return res.status(400).send({
		message: '邮箱地址或者密码错误'
	});
	// 如果用户存在 验证密码 返回布尔值
	const validPassword = await bcrypt.compare(req.fields.password, user.password);
	// 密码错误 响应
	if (!validPassword) return res.status(400).send({
		message: '邮箱地址或者密码错误'
	});
	// 将用户信息存储在session中
	req.session.userInfo = user;
	// 响应
	res.send(_.pick(user, ['nickName', 'email', 'role', 'avatar', '_id', 'status', 'createTime']));
};