var lastScroll = 0;
var loadFinished = true;
$(window).scroll(function(event){
	var $header = $("#header").outerHeight();
	var st = $(this).scrollTop();
	if (loadFinished && st > $header) {
		loadFinished = false;
	} else if (st > $header-$header/2) {
		$('body').css('paddingTop',$header);
		$('body').addClass('pinning');
		if (st > lastScroll){
			$('body').addClass('hidden');
		} else {
			$('body').removeClass('hidden');
		}
		lastScroll = st;
	} else if (st < 2) {
		$('body').removeClass('pinning').removeAttr('style');
		loadFinished = true;
	}
	var bottom_height = ($('#bottom').outerHeight() != null) ? $(document).height() - $('#bottom').outerHeight() : $(document).height() - $('#bottom1').outerHeight();
	if($(window).scrollTop() + $(window).height() > bottom_height){
		$('body').addClass('end');
		$('body, #bottom1').removeClass('hidden');
		loadFinished = true;
	}else{
		$('body').removeClass('end');
	}
});

// landscape 대체 콘텐츠
function readDeviceOrientation() {
	if (window.orientation === 90 || window.orientation === -90) {
		$('head').append('<style>*{display:none} html, body{overflow:hidden;display:block;height:100%} .lsc_txt{position:absolute;left:0;top:50%;overflow:hidden;display:block;width:100%;margin-top:-10px;text-align:center;color:#009BFA;font-weight:normal} .lsc_img{position:absolute;left:0;bottom:0;overflow:hidden;display:block;width:100%;text-align:center} .lsc_img img{display:inline-block}</style>');
		$('<div class="lsc_txt">L.POINT 모바일 웹은 세로 화면에 최적화되어 있습니다.</div><div class="lsc_img"><img src="/images/error/img_landscape.png" width="108" height="92" alt=""></div>').appendTo('body');
	}
	else {
		$('head style').remove()
		$(".lsc_txt, .lsc_img").remove();
	}
}

$(function(){
	// landscape 대체 콘텐츠
	$(window).on("load orientationchange",function(){
		readDeviceOrientation();
	});
	/*
		Google Analytics : 트래킹 영역 내 data-ga-label 속성이 있을경우 실행
		- (필수값) data-ga-cate : 이벤트 카테고리
		- (필수값) data-ga-labe : 이벤트 라벨
	*/
	$('[data-ga-label]').on('click',function(event){
		var cate = $(this).attr('data-ga-cate');
		var label = $(this).attr('data-ga-label');
		if(cate != undefined && label != undefined){
			//ga('send','event',cate,'클릭',label);
		}
	});

	//메뉴
	$('#header .menu').on('click',function(event){
		event.stopPropagation();
		// 메뉴 활성화 시 스크롤(콘텐츠) 고정
		var currentTop = $('body').scrollTop()-parseInt($('body').css('paddingTop'));
		$('#wrap').attr('data-scroll',currentTop);
		$('#wrap').css({
			'position':'fixed',
			'top':-currentTop,
			'left':0,
			'right':0
		})
		$('body').addClass('menu_active');
		$('#panel .panel_bx').addClass('mnshow');
		$('body').append('<div class="dimmed __80"></div>');

		// 메뉴 닫을 시 스크롤(콘텐츠) 활성화
		$('.dimmed').fadeIn(300).on('click',function(){
			$(this).fadeOut(function(){
				$(this).remove();
			});
			$('body').removeClass('menu_active');
			$('#panel .panel_bx').removeClass('mnshow');
			$('#wrap').removeAttr('style');
			$('body').scrollTop($('#wrap').attr('data-scroll')).find('#wrap').removeAttr('data-scroll');
			var st = $(window).scrollTop();
			if(st > $('#header').outerHeight()){
				$('body').addClass('pinning');
			}
		});
	});

	//161229 추가 input, textarea 클릭시 커서 위치 설정
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

	// 레이어 닫을때 스크립트 수정
	$(".lpop .btn_close, .lpop .btn_cancel").on("click", function() {
		$(".lpop").fadeOut("fast");
		$('.dimm').removeAttr('style');
		$('.dimm').removeClass('dimm').scrollTop($('body').attr('data-scroll')).removeAttr('data-scroll');
		$('body').unbind('touchmove');
	});

	//버튼 프레스 효과
	$('button').bind('touchstart',function(event){
		if($(this).prop('disabled')){ return false; } //disabled 시 비활성화
		$(this).addClass('active');
	});
	$('button').bind('touchend',function(event){
		if($(this).prop('disabled')){ return false; } //disabled 시 비활성화
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
	// 170125 수정 인풋 클릭시 커서 맨 처음으로 이동
	$('input[type=text], input[type=number], input[type=password], input[type=tel]').one('click', function () {
		$(this).selectRange(0,0);
	});
	// 인풋 창 키 다운 시 value 값 삭제
	$('.form_area input').one('keydown', function () {
		$(this).val('').addClass('on');
	});
	//인풋 입력 시 가이드 텍스트 위치 이동
	$('.form_area input').bind('focus', function () {
		$(this).parents('.ip_bx').addClass('on');
	});
	// 170125 추가
	$('.form_area input').bind('blur', function () {
		$('#bottom').removeAttr('style');//170203 수정
	});

	//161221 수정 셀렉트 선택 시 가이드 텍스트 위치 이동
	$(document).on('focus', '.list', function () {
		$(this).parents('.ip_bx, .ip_bx2').addClass('on');
	});
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
