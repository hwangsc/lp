/**
 * EIWAF(E4NET Integration Web App Framework) UI.
 * This notice must be untouched at all times.
 * Copyright (c){@link http://www.e4net.net E4NET} Ltd, Co.
 * All rights are reserved.
 *
 * @author E4NET
 * @version 1.0.0
 */
//컨텍스트 메뉴 기능 막기
//$(document).bind('contextmenu', function (e) { return false; });
//개인정보 마스킹('*') 사용 여부
var eiwafv_SetUseAsterisk = true;
//char 인코딩(UTF-8, 기타)
var eiwafv_VarCharByteType = "ANSI";
//form method(post, get)
var eiwafv_VarFormMethod = "post";
//ajax timeout
var eiwafv_VarAjaxTimeout = 30000;
//focusin 날짜 포멧
var eiwafv_VarDateInPattern = "yyyyMMdd";
//focusout 날짜 포멧
var eiwafv_VarDateOutPattern = "yyyy.MM.dd";
var eiwafv_MsgErrorTitle = "죄송합니다";
var eiwafv_MsgSystemException = "시스템 장애가 발생했습니다.\n\n문제가 계속 발생하면 관리자에게 문의하시기 바랍니다.";
var eiwafv_MsgAjaxError = "현재 통신량이 많아 업무처리가 지연되고 있습니다.\n\n잠시 후 다시 사용하여 주십시오.\n\n문제가 계속 발생하면 관리자에게 문의하시기 바랍니다.";
var eiwafv_MsgOnlyNumber = "숫자만 입력이 가능합니다.";
var eiwafv_MsgInvalidFormat = "입력가능한 형식이 아닙니다.";
var eiwafv_MsgOverflowInput = "입력가능한 길이를 초과하였습니다.";
var eiwafv_MsgInvalidDate = "유효하지 않은 날짜/시간입니다.";
var eiwafv_MsgNullOrEmpty1 = "(을)를 입력해 주세요.";
var eiwafv_MsgNullOrEmpty2 = "(을)를 선택해 주세요.";

//브라우져 체크
var eiwafv_UserAgentL = navigator.userAgent.toLowerCase();
var eiwafv_Browser;
if (/trident/.test(eiwafv_UserAgentL) || /msie/.test(eiwafv_UserAgentL)) {
	eiwafv_Browser = "msie";
} else if (/chrome/.test(eiwafv_UserAgentL)) {
	eiwafv_Browser = "chrome";
} else if (/mozilla/.test(eiwafv_UserAgentL) && !/webkit/.test(eiwafv_UserAgentL)) {
	eiwafv_Browser = "mozilla";
} else if (/opera/.test(eiwafv_UserAgentL)) {
	eiwafv_Browser = "opera";
} else {
	eiwafv_Browser = "webkit";
}

//alert 메시지 처리
var eiwaf_AlertTitleMsg = function (title, message, focusObj) {
		alert(utlf_Nvl(title, "") + message + " ");
		uif_Focus(focusObj);
	};
//ajax 실패 처리(-1 보다 작은 코드 값)
var eiwaf_AjaxFailHandler = function (status, data) {
		uif_AlertTitleMsg("응답", status.message);
		if (status.code == -200) {
			eiwaf_IntroPag();
		} else {

		}
	};
//ajax 예외 처리(textStatus: "success", "notmodified", "error", "timeout", "parsererror", "dataerror")
var eiwaf_AjaxOptionError = function (xhr, textStatus, thrownError) {
		uif_AlertTitleMsg(eiwafv_MsgErrorTitle, eiwafv_MsgAjaxError + " (" + textStatus + ")");
	};
//HTML을 DOM으로 메모리 적재하고 실행하는 함수
function eiwaf_InitDocumentReady(status) {
	$('form').eiwafLoadFormEvent();
	status.message = utlf_Br2nl(status.message);
	eiwaf_DocumentReady(status);
}
//eiwaf_DocumentReady 인터페이스(override) 함수
function eiwaf_DocumentReady(status) {

}
//사이트 intro 또는 로그인 화면으로 이동하는 함수
function eiwaf_IntroPagInternal(url) {
	var link = utlf_Nvl2(url, "/");
	try {
		var wObj = window.opener;
		if (wObj && window.self.name) {
			if (url) {
				wObj.top.location.href = link;
			}
			uif_SelfClose();
		} else {
			window.top.location.href = link;
		}
	} catch (e) {
		window.location.href = link;
	}
}
//eiwaf_IntroPag 인터페이스(override) 함수
function eiwaf_IntroPag(url) {
	eiwaf_IntroPagInternal(url);
}

document.write("<script type=\"text/javascript\" src=\"/WebContent/js/eiwaf/eiwaf.core.js\" charset=\"utf-8\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"/WebContent/js/eiwaf/eiwaf.tag." + eiwafv_Browser + ".js\" charset=\"utf-8\"></scr"+"ipt>");
document.write("<script type=\"text/javascript\" src=\"/WebContent/js/eiwaf/eiwaf.plugin.js\" charset=\"utf-8\"></scr"+"ipt>");