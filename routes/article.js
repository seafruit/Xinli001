/**
 * Created by PM on 2016/4/29.
 */
var express = require('express');
var router = express.Router();
var parsers = require('../modules/parsers');


var getList = require('../modules/article/getList');
var getDetail = require('../modules/article/getDetail');
var getTags = require('../modules/article/getTag');
var getBanner = require('../modules/article/getBanner');
var getComment = require('../modules/article/getComment');

router.use('/getList',function(req,res){

    var s = (req.query.sort== null) ? "":req.query.sort;
    var f = (req.query.flag == null) ? "":req.query.flag;
    var p = (req.query.page == null) ? 1:req.query.page;
    var t = (req.query.tag == null) ? "":req.query.tag;

    var paramObj = {
        slug:s,
        flag:f,
        page:p,
        tag:t
    };
    getList(paramObj,function(result){
        parsers.resultProc(req,result,res);
    });
});
router.use('/getDetail/:id',function(req,res){
    console.log('vbrbvhd');
    var id = req.params.id;
    getDetail(id,function(result){
        parsers.resultProc(req,result,res);
    })
});
router.use('/getTags',function (req,res){
    var slug = (req.query.sort == null)?"":req.query.sort;
    getTags(slug,function(result){
        parsers.resultProc(req,result,res);
    })
});
router.use('/getBanner',function (req,res){
    getBanner(function(result){
        parsers.resultProc(req,result,res);
    });
});
router.use('/getComment',function (req,res){
    var param = {
        id:req.query.id,
        page:req.query.page
    };
    //console.log(req.query.id)
    getComment(param,function(result){
        parsers.resultProc(req,result,res);
    });
});
module.exports = router;