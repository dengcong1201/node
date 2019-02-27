const exprss = require('express');
const UserModel = require('../models/userModels');
const router = exprss.Router();

//注册  /user/register
router.post('/register',(req,res) =>{
  //1、得到数据,前端传递过来的参数名跟表中的字段名相同

  //2、实例化用户对象
  let user = new UserModel(req.body);

  //3、save方法
  user.save().then(() =>{
    res.json({
      code:0,
      msg:'注册成功'
    })
  }).catch(error => {
    res.json({
      code:-1,
      msg:error.message
    })
  })
})

//登录 /user/login
router.post('/login',(req,res) => {
  //1、得到前端传递的用户名与密码
  let userName = req.body.userName;
  let password = req.body.password;

  //2、数据库查询用户
  UserModel.findOne({
    userName,
    password
  }).then(data => {
    console.log(data);
    //判断，如果存在data有值得， 不存在，data为null
    if(!data){
      res.json({
        code:-1,
        msg: '用户名或密码错误'
      })
    }else{
      res.json({
        code:0,
        msg: '登录成功',
        data:{
          id:data._id,
          nickName:data.nickName,
          isAdmin :data.isAdmin
        }
      })
    }
  }).catch(error =>{
    res.json({
      code: -1,
      msg:error.message
    })
  })
})

module.exports = router;