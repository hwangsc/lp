/* eiwaf-ui v1.0.0 | CommonUtil | (c)E4NET Ltd, Co. */
function cmf_AjaxStart() {
	var message = cmf_AjaxMessage(utlf_Nvl(this.procType, "Q"));
	this.showLoading = true;
	cmf_AjaxRemainContent(this, message);
}

function cmf_AjaxEnd() {
	$("#eiJsInnerLoading").remove();
}

function cmf_AjaxMessage(svc) {
	var message;
	if      (svc == "Q") { message = "요청"; }
	else if (svc == "R") { message = "조회"; }
	else if (svc == "I") { message = "등록"; }
	else if (svc == "U") { message = "수정"; }
	else if (svc == "D") { message = "삭제"; }
	else if (svc == "P") { message = "인쇄"; }
	else                 { message = svc;    }
	return message;
}

function cmf_AjaxRemainContent(options, message, ceObj) {
	cmf_ShowLoading(message, options.dimmed);
}

function cmf_LoadingFloatObject(message) {
	var jObj = $("#eiJsFloatLoading");
	if (jObj.length == 0) {
		$("<div id='eiJsInnerLoading' style='display:none'><img src='/WebContent/images/common/loading.png' width='80' height='2080' alt=''></div>").appendTo("body");
	}
	$("#eiJsInnerLoading").fadeIn();
	var imgHeight = 80;
	var numImgs = 25;
	var cont = 0;
	var img = $('#eiJsInnerLoading').find('img');
	var animation = setInterval(moveSprite,30);
	function moveSprite(){
		img.css('margin-top', -(cont*imgHeight));
		cont++;
		if(cont == numImgs){
			cont = 0;
		}
	}
	return jObj;
}

function cmf_ShowLoading(message, dimmed) {
	cmf_LoadingFloatObject(message);
}

function cmf_IsDateTerm(startInput, endInput, dPattern) {
	var isInput = uif_IsHTMLInputElement(startInput);
	var sdate, edate;
	if (isInput) {
		sdate = startInput.value;
		edate = endInput.value;
		dPattern = utlf_Nvl(dPattern, Date.OutPattern);
	} else {
		sdate = startInput;
		edate = endInput;
	}
	if (utlf_ParseDate(sdate, dPattern) > utlf_ParseDate(edate, dPattern)) {
		if (isInput) {
			var stitle = utlf_Nvl2(startInput.title, "시작일");
			var etitle = utlf_Nvl2(endInput.title, "종료일");
			uif_AlertMsg(stitle + "이 " + etitle + "보다 큽니다.", endInput);
		} else {
			uif_AlertMsg("시작일이 종료일보다 큽니다.");
		}
		return false;
	}
	return true;
}

var cmfv_IsDoubleSubmit;
function cmf_IsDoubleSubmit(timeout) {
	if (cmfv_IsDoubleSubmit) {
		return true;
	}
	setTimeout(function() { cmfv_IsDoubleSubmit = false; }, utlf_Nvl(timeout, 2000));
	cmfv_IsDoubleSubmit = true;
	return false;
}

function cmf_Iframe(type, title) {
	var name = "eiJsIframe_" + type;
	var jObj = $("#" + name);
	if (jObj.length == 0) {
		var ititle;
		if (type == 'download') {
			ititle = utlf_Nvl2(title, "파일다운로드");
		} else if (type == 'upload') {
			ititle = utlf_Nvl2(title, "파일업로드");
		} else if (type == 'excel') {
			ititle = utlf_Nvl2(title, "엑셀다운로드");
		} else if (type == 'print') {
			ititle = utlf_Nvl2(title, "인쇄");
		} else {
			ititle = utlf_Nvl2(title, "내용없음");
		}
		jObj = $("<iframe id=\"" + name + "\" name=\"" + name + "\" title=\"" + ititle + "\" style=\"display:none;\"></iframe>").appendTo("body");
	}
	return jObj.attr("name");
}

function cmf_LoadContent(url, options) {
	var opts = $.extend({ dataType: "text", cache: false }, options);
	opts.url = url;
	opts.success = function (data) {
		if (this.callbackFn) {
			this.callbackFn.call(this, data);
		} else {
			var jObj = $(this.contentExpr);
			if (jObj.length == 0) {
				jObj = $("<div id='" + this.contentExpr.substring(1) + "' LoadContent='true'></div>").hide().appendTo("body");
			}
			jObj.html(data);
			jObj.show();
		}
	};
	opts.error = function (xhr, textStatus, thrownError) {
		eiwaf_AjaxOptionError.call(this, xhr, textStatus, thrownError);
	};
	return $.ajax(opts);
}

function cmf_LoadContentHide(obj, empty) {
	var dObj = $(obj).closest("[LoadContent='true']").hide();
	if (empty) {
		dObj.empty();
	}
}

function cmf_IsPopupWindow() {
	return $("body").is("[PopupBody=true]");
}

function cmf_MessageEvent(obj, msgEvent) {
	$(obj).click(function(){
		try {
			var url;
			if (!utlf_IsNullOrBlank(msgEvent)) {
				url = msgEvent;
			} else if (!(typeof gvDefaultUrl == "undefined" || utlf_IsNullOrBlank(gvDefaultUrl))) {
				url = gvDefaultUrl;
			} else if (cmf_IsPopupWindow()) {
				url = "javascript:uif_SelfClose();";
			} else {
				url = "javascript:eiwaf_IntroPag();";
			}
			eval(url.startsWith("javascript:") ? url.substring(11) : "svcf_Link(\"" + url + "\")");
		} catch (e) {
			eiwaf_IntroPag();
		}
		return false;
	});
}

function cmf_Title(title, tab1, tab2) {
	document.title = title + (tab1 ? " | " + tab1 + (tab2 ? " | " + tab2 : "") : "") + " | L.POINT";
}

function cmf_TitleTab(tab1, tab2) {
	if (typeof gvPageTitle != "undefined") {
		cmf_Title(gvPageTitle, tab1, tab2);
	} else {
		cmf_Title(tab1, tab2);
	}
}