const express = require('express');
const multer = require('module');
const path = require('path');
const fs =require('fs');



//调用multer得到一个upload对象
//upload对象 他有很多方法
//upload.single('input-name-value')  单个文件上传，返回的是一个中间件函数
//upload.array('input-name-value',maxCount)   多个文件上传，返回的是一个中间件函数
//upload.fields([{name:'input-name-value',maxCount:1},{ame:'input-name-value',maxCount:2}])  多个文件上传，返回的是一个中间件函数
const upload = multer({
  dest:'c:/tmp', //设置文件存放目录
})


const app = express();

//单个文件上传操作
app.post('/upload',upload.single('avatar'),(req,res) => {
  // res.send(req.file);
  // res.send(req.body);
  let nawFileName = new Date().getTime() + '_' + req.file.originalname;
  let newFilPath = path.resolve(__dirname,'./public/uploads/' + nawFileName);

  try{
    let data = fs.readFileSync(req.file.path);
    fs.writeFileSync(newFilPath,data);
    fs.unlinkSync(req.file.path);
    //TODO
  }catch (error){
    res.json({
      code:-1,
      msg:error.message
    })
  }

 
})

app.listen(3000);