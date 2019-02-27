(function(){
  var User = function(){
    // this.userName = '';
    // this.password = '';
    this.dom = {
      submitBtn : $('#btn'),
      userNameInput : $('input[type=text]'),
      passwordInput : $('input[type=password]')
    }
  }

  

  User.prototype.bindDOM = function(){
    var that = this;
    this.dom.submitBtn.click(function(){
      that.handleLogin();
    })
  }
  /**
   * 登录方法，调用ajax
   */
  User.prototype.handleLogin = function(){
    $.post('/user/login',{
      userName: this.dom.userNameInput.val(),
      password:this.dom.passwordInput.val()
    },function(res){
      if(res.code === 0){
        //登录成功
        layer.msg('登录成功');
        //跳转到首页
        window.location.href = '/';
      }else{
        //登录失败
        layer.msg(res.msg);
      }
    })
  }

  //最后
  var user = new User();
  user.bindDOM();
})();