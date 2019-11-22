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
                    '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title + note.modifyTime +'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n' +
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
	console.log("查询普通笔记内容");
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
                '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i> '+note.title + note.modifyTime +'<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button>\n' +
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
	var body = um.getContent();
	alert(body);
	alert("更新普通笔记");
}

/***
 * 删除普通笔记
 */
function deleteNormalNote(){
	alert("删除普通笔记");
}

/***
 * 移动笔记
 */
function moveNote(){
	alert("移动笔记");
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
	alert("查询回收站笔记列表");
}

/***
 * 查看回收站笔记内容
 */
function getRecycleNoteDetail() {
	console.log("查看回收站笔记内容");
}

/***
 * 删除回收站笔记
 */
function deleteRecycleNote(){
	alert("删除回收站笔记");
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