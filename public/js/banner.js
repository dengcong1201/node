$(function(){
  // alert(1);
  $('#bannerAdd').click(function(){
    $.post('/banner/add',{
      bannerName:$('#inputEmail3').val(),
      bannerUrl:$('#inputPassword3').val()
    },function(res){
      console.log(res);
      if(res.code === 0){
        //成功
      }else{
        //ps:很多时候，真正的错误信息不会给用户去看
        console.log(res.msg);
        alert('网络异常，请稍后重试');
      }
          //手动调用关闭的方法
      $('#myModal').modal('hide');
    })
    // alert('ajax提交');


  })
})