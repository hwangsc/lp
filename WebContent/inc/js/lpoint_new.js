$(function(){
	/* 170204 삭제 
	// 170203 웹폰트 안드로이드에서만 사용하기 위한 스크립트 추가
	var uagent = navigator.userAgent.toLowerCase(); //유저에이전트 문자열을 얻어 소문자로 변환
	//모바일 user-agent 판단
	var ret1 = uagent.search('android', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson');
	if(ret1 > -1){
		$('head').append('<link rel="stylesheet" type="text/css" href="../common/css/font.css">');
	}
	//
	*/
	
	//161216 추가 input, textarea 클릭시 커서 위치 설정
	$.fn.selectRange = function(start, end) {
		return this.each(function() {
			if(this.setSelectionRange) {
				this.focus();
				this.setSelectionRange(start, end);
			}
			else if(this.createTextRange) {
				var range = this.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
		});
	};	
	//버튼 프레스 효과
	$('button').bind('touchstart',function(event){
		$(this).addClass('active');
	});
	$('button').bind('touchend',function(event){
		$(this).removeClass('active');
	});
	// 161216 추가 textarea 클릭시 커서 맨 처음으로 이동
	$('.form_area2 textarea').one('click',function () {
		$(this).selectRange(0,0);
	});
	// textarea 키 다운 시 value 값 삭제	
	$('.form_area2 textarea').one('keydown', function () {
		$(this).val('').addClass('on');
	});
	// 170203 수정 인풋 클릭시 커서 맨 처음으로 이동
	$('input[type=text], input[type=number], input[type=password], input[type=tel], input[type=email]').one('click', function () {
		$(this).selectRange(0,0);
	});
	// 인풋 창 키 다운 시 value 값 삭제
	$('.form_area input').one('keydown', function () {
		$(this).val('').addClass('on');
	});
	//인풋 입력 시 가이드 텍스트 위치 이동
	$('.form_area input').bind('focus', function () {
		$(this).parents('.ip_bx').addClass('on');
		$('#bottom').css({position: 'absolute', top: $(document).outerHeight(true)-90 + 'px', bottom:'auto'}); //170203 수정 
	});
	// 170125 추가
	$('.form_area input').bind('blur', function () {
		$('#bottom').removeAttr('style');//170203 수정 
	});
	// 161221 삭제 
//	$('.list').change(function() {
//		var selected = $(this).find('option:selected').text();
//		$(this).prev($('.btn_filter')).children($('em')).text(selected);
//	});

	//161221 수정 셀렉트 선택 시 가이드 텍스트 위치 이동
	$(document).on('focus', '.list', function () {
		$(this).parents('.ip_bx, .ip_bx2').addClass('on');
	});	
	// 161221 삭제 셀렉트 선택 시 텍스트 변경
//	$(document).on('change', '.list', function () {
//		var selected = $(this).find('option:selected').text();
//		$(this).prev($('.btn_filter')).children($('em')).text(selected);
//	});

	// 170124-2 추가 input 입력글 지울시
	$('input').keydown(function(e) {
		if(e.keyCode == 8 || e.keyCode == 46){
			if ($(this).val().length === 0) {
				$(this).removeClass('on');
			}
		}
		else {
			$(this).addClass('on');
		}
	});
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-59563316-5', 'auto');
ga('send', 'pageview');