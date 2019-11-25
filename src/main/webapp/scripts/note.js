/**
 * 时间格式
 */

function dateFtt(date,fmt)
{ //author: meizz
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

/***
 * 加载普通笔记
 */
function getNormalNoteList(){
    var li=$('#first_side_right .contacts-list li .checked').parent();
    var nb =li.data('notebook');
    var notebookId =nb.id;
    $.ajax({
        url:"/note.do",
        method:"get",
        data:{notebookId:notebookId},
        success:function (data) {
            $('#second_side_right .contacts-list').html("");
            for(var i =0; i<data.length;i++){
                var note =data[i];

                $('#second_side_right .contacts-list').append('<li class="online">\n' +
                    '<a > \n' +
                    '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title +'&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+dateFtt(new Date( note.modifyTime),"yyyy-MM-dd hh:mm:ss")+')</span>'+'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n' +
                    '</a>\n' +
                    '<div class="note_menu" tabindex=\'-1\'>\n' +
                    '<dl>\n' +
                    '<dt><button type="button" class="btn btn-default btn-xs btn_move" title=\'移动至...\'><i class="fa fa-random"></i></button></dt>\n' +
                    '<dt><button type="button" class="btn btn-default btn-xs btn_share" title=\'分享\'><i class="fa fa-sitemap"></i></button></dt>\n' +
                    '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title=\'删除\'><i class="fa fa-times"></i></button></dt>\n' +
                    '</dl>\n' +
                    '</div>\n' +
                    '</li>');
                $('#second_side_right .contacts-list li:last').data("note",note);
                //选中第一个
                $('#second_side_right .contacts-list li:first').click();
            }
        }
    });

}

/***
 * 查询普通笔记内容
 */
function getNoteDetail(){
  var note=	$('#second_side_right .contacts-list li .checked').parent().data('note');
  $('#input_note_title').val(note.title);
  um.setContent(note.body == null ? "" : note.body);
}
/***
 * 创建普通笔记
 */
function createNormalNote(){
    var li=$('#first_side_right .contacts-list li .checked').parent();
    var nb =li.data('notebook');
    var notebookId =nb.id;
    var title =$('#input_note').val().trim();
    $.ajax({
		url:"/note.do",
		method:"post",
		data:{notebookId:notebookId, title: title},
		success:function (note) {
			//新建完成时关闭弹窗
			$('.cancle').click();
			//新建笔记
            $('#second_side_right .contacts-list').prepend('<li class="online">\n' +
                '<a > \n' +
                '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title +'&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+dateFtt(new Date( note.modifyTime),"yyyy-MM-dd hh:mm:ss")+')</span>'+'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n' +
                '</a>\n' +
                '<div class="note_menu" tabindex=\'-1\'>\n' +
                '<dl>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_move" title=\'移动至...\'><i class="fa fa-random"></i></button></dt>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_share" title=\'分享\'><i class="fa fa-sitemap"></i></button></dt>\n' +
                '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title=\'删除\'><i class="fa fa-times"></i></button></dt>\n' +
                '</dl>\n' +
                '</div>\n' +
                '</li>');
            //绑定数据
            $('#second_side_right .contacts-list li:first').data("note",note);

        }
	})

}

/***
 * 更新普通笔记
 */
function updateNormalNote(){
    var note=	$('#second_side_right .contacts-list li .checked').parent().data('note');
    var noteId = note.id;
   var title =  $('#input_note_title').val().trim();
	var body = um.getContent();
  $.ajax({
	  url:"note.do",
	  method:"put",
	  data:{id:noteId,title:title,body:body},
	  success:function (data) {
	  	alert("修改成功");
		  note.modifyTime =data.modifyTime;
		  note.title =title;
		  note.body=body;
          $('#second_side_right .contacts-list li .checked').parent().data('note',note);
          $('#second_side_right .contacts-list li .checked').html('<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title +'&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+dateFtt(new Date( note.modifyTime),"yyyy-MM-dd hh:mm:ss")+')</span>'+'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n');
      }
  })
}


/***
 * 删除普通笔记
 */
function deleteNormalNote(){
    var note=	$('#second_side_right .contacts-list li .checked').parent().data('note');
    var noteId = note.id;
    //回收站id
    var notebookId =    $('#rollback_button').data("notebook").id;
    $.ajax({
        url:"note/move.do",
        method:"put",
        data:{id:noteId,notebookId:notebookId},
        success:function (data) {
            if (data=='fail'){
                Location.href="login.html";
                return;
            }
            $('#second_side_right .contacts-list li .checked').parent().remove();
            //删除完成时关闭弹窗
            $('.cancle').click();
            $('#second_side_right .contacts-list li:first').click();
        }
    });
}

/***
 * 移动笔记
 */

function moveNote(li,notebookId){
  var noteId =li.data('note').id;
    $.ajax({
        url:"note/move.do",
        method:"put",
        data:{id:noteId,notebookId:notebookId},
        success:function (data) {
            if (data=='fail'){
                Location.href="login.html";
                return;
            }
            var parent =li.parent();
            li.remove();
            $('.cancle').click();
            //选中第一个
            parent.children('li:first').click();
        }
    })

}

/***
 * 分享笔记
 */
function createShareNote(){
	$("footer div strong").text("分享成功").parent().fadeIn(100);
	setTimeout(function(){
		$("footer div").fadeOut(500);
	}, 1500);
}

/***
 * 查询回收站笔记列表
 */
function getRecycleNoteList(){
  var nb =  $('#rollback_button').data("notebook");
    var notebookId =nb.id;
    $.ajax({
        url:"/note.do",
        method:"get",
        data:{notebookId:notebookId},
        success:function (data) {
            $('#four_side_right .contacts-list').html("");
            for(var i =0; i<data.length;i++){
                var note =data[i];
                $('#four_side_right .contacts-list').append('<li class="disable"><a ><i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title +'&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 10px;">('+dateFtt(new Date( note.modifyTime),"yyyy-MM-dd hh:mm:ss")+')</span>'+' <button type="button" class="btn btn-default btn-xs btn_position btn_delete"><i class="fa fa-times"></i></button><button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay"><i class="fa fa-reply"></i></button></a></li>');
                $('#four_side_right .contacts-list li:last').data("note",note);
                //选中第一个
                $('#four_side_right .contacts-list li:first').click();
            }
        }
    });
}

/***
 * 查看回收站笔记内容
 */
function getRecycleNoteDetail() {
     var note =   $('#four_side_right .contacts-list li .checked').parent().data('note');
     $('#noput_note_title').html(note.title);
     $('#note_body').html(note.body);
}

/***
 * 删除回收站笔记
 */
function deleteRecycleNote(){
    var li =   $('#four_side_right .contacts-list li .checked').parent();
    var noteId =li.data('note').id;
    $.ajax({
        url:"/note.do",
        method:"delete",
        data:{id:noteId},
        success:function (data) {
            if (data=='fail'){
                Location.href="login.html";
                return;
            }
            li.remove();
            //模拟点击
            $('#four_side_right .contacts-list li:first').click();
            $('.cancle').click();
        }

    })
}

/***
 * 搜索分享笔记列表
 */
function getShareNoteList(){
	alert("搜索分享笔记列表");
}

/***
 * 查询分享笔记内容
 */
function getShareNoteDetail(){
	alert("查询分享笔记内容");
}

/***
 * 收藏分享笔记
 */
function likeShareNote(shareId,dom){
	alert("收藏分享笔记");
}

/***
 * 加载收藏笔记
 */
function getLikeNoteList(likeNoteId){
	alert("加载收藏笔记");
}

/***
 * 查看收藏笔记内容
 */
function getLikeNoteDetail(noteId) {
	console.log("查看收藏笔记内容");
}

/***
 * 删除收藏笔记
 */
function deleteLikeNote(noteId,dom){
	alert("删除收藏笔记");
}

/***
 * 加载本用户参加活动笔记列表
 */
function getNoteActivityList(noteBookId){
	alert("加载本用户参加活动笔记列表");
}

/***
 * 查询参加活动的笔记内容
 */
function getActivityNoteDetail(noteId) {
	console.log("查询参加活动的笔记内容");
}