/* wm.comn.js | 모바일웹 공통 | (c)LPoint Ltd, Co. */

var hpf_Hostname = window.location.hostname;
var hpf_lpointUrl;
if (hpf_Hostname == "m.lpoint.com") {
	hpf_lpointUrl = "https://member.lpoint.com";
} else if (hpf_Hostname == "devlw.lpoint.com") {
	hpf_lpointUrl = "https://testmember.lpoint.com";
} else {
	hpf_lpointUrl = "https://testmember.lpoint.com";
}


function wmf_CertCall(certGb, desc, fnName) {
	var params = "desc=" + encodeURIComponent(utlf_Nvl(desc, "")) + "&callback=" + utlf_Nvl(fnName, "");
	if (certGb == 'H') {
		svcf_Link("/view/interface/siren.jsp", params, "siren_popup");
	} else if (certGb == 'I') {
		svcf_Link("/view/interface/ipin.jsp", params, "ipin_popup");
	} else if (certGb == 'C') {
		svcf_Link("/view/interface/card.jsp", params, "card_popup");
	} else {
		alert("인증구분코드를 확인하세요.");
	}
}

function wmf_CertCallDev(certGb, desc, fnName, hsCtfRef) {
	var params = "desc=" + encodeURIComponent(utlf_Nvl(desc, "")) + "&callback=" + utlf_Nvl(fnName, "");
	if (certGb == 'H') {
		if(hsCtfRef =='SS'){
			svcf_Link("/view/interface/siren.jsp", params, "siren_popup");
		}else{
			svcf_Link("/view/interface/kmcis.jsp", params, "siren_popup");
		}
	} else if (certGb == 'I') {
		svcf_Link("/view/interface/ipin.jsp", params, "ipin_popup");
	} else if (certGb == 'C') {
		svcf_Link("/view/interface/card.jsp", params, "card_popup");
	} else {
		alert("인증구분코드를 확인하세요.");
	}
}

function wmf_CertCheck(code, msg) {
	if (code == 0) {
		return true;
	}
	if (code != -1) {
		msg = "본인인증에 실패했습니다.";
	}
	alert(msg);
	return false;
}

function wmf_SnsLink(type, link) {
	var url = "";
	if (type == "fb") {
		url = "http://www.facebook.com/sharer/sharer.php?u=";
	} else if(type == "ks") {
		url = "http://story.kakao.com/share?url=";
	} else if(type == "url") {
		if ( eiwafv_Browser == "msie" ) {
			window.clipboardData.setData("Text", link);
			alert("URL이 클립보드에 복사되었습니다. CTRL+V를 이용해 URL을 붙여넣을 수 있습니다.");
		} else {
			window.prompt("다음 URL을 CTRL+C를 이용해 복사하고 ENTER 키를 눌러주세요.", link);
		}
	}
	if ( type == "fb" || type == "ks" ) {
		window.open(url + encodeURIComponent(link), '_snsPopup', 'width=828, height=450');
	}
}

function wmf_MessageEvent(msgEvent) {
	try {
		var url;
		if (!utlf_IsNullOrBlank(msgEvent)) {
			url = msgEvent;
		} else if (!(typeof gvDefaultUrl == "undefined" || utlf_IsNullOrBlank(gvDefaultUrl))) {
			url = gvDefaultUrl;
		} else {
			url = "svcf_Link(\""/"\")";
		}
		eval(url.startsWith("javascript:") ? url.substring(11) : "svcf_Link(\"" + url + "\")");
	} catch (e) {
		svcf_Link("/");
	}
}

var wmfv_IsDoubleSubmit;
function wmf_IsDoubleSubmit(timeout) {
	if (wmfv_IsDoubleSubmit) {
		return true;
	}
	setTimeout(function() { wmfv_IsDoubleSubmit = false; }, utlf_Nvl(timeout, 2000));
	wmfv_IsDoubleSubmit = true;
	return false;
}

function wmfv_Bacground(clsName) {
	$("#wrap").addClass(clsName);
}

function wmf_FormatZip(str) {
	if (!utlf_IsNull(str)) {
		return str.substring(0, 3) + "-" + str.substring(3, 6);
	}
	return str;
}

//회원통합 로그아웃
function wmf_Logout(reUrl) {
	window.location.href= hpf_lpointUrl + "/door/sso/logout.jsp?sid=MEMBERSMBL&returnurl=";
//	window.location.href= hpf_lpointUrl + "/door/sso/logout.jsp?sid=MLPOINT&returnurl=";
}
