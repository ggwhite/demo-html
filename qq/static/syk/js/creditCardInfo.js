function init(){
	$("#loader").hide();
	var expiredMonth = document.getElementById('cardExpiredMonth');
	var expiredYear = document.getElementById('cardExpiredYear');
	var dt = new Date();
	var thisYear = dt.getFullYear();
	var thisMonth = dt.getMonth() + 1;
	for(i = 1; i <= 12; i++){
		var new_option;
		if ( i < 10 ) {
			new_option = new Option("0" + i,"0" + i);
		}else{
			new_option = new Option(i,i);
		}
	
		expiredMonth.options.add(new_option);
	}
	
	for(i = 0; i < 10; i++){
	var new_option;
	var year = (thisYear + i) % 100;
	if ( year < 10 ) {
		new_option = new Option("0" + year, "0" + year);
	}else{
		new_option = new Option(year,year);
	}
	expiredYear.options.add(new_option);
	}
}

function shiftCardNo() {
	var cardType = document.getElementById("creditCardType").value;
	if (cardType === "ae"){
		document.getElementById("ae01").style.display="inline";
		document.getElementById("ae02").style.display="inline";
		document.getElementById("ae03").style.display="inline";
		document.getElementById("cvv2").maxLength = 4;
		document.getElementById("sn01").style.display="none";
		document.getElementById("sn02").style.display="none"; 
		document.getElementById("sn03").style.display="none"; 
		document.getElementById("sn04").style.display="none"; 
	}else{
		document.getElementById("ae01").style.display="none";
		document.getElementById("ae02").style.display="none";
		document.getElementById("ae03").style.display="none";
		document.getElementById("cvv2").maxLength = 3;
		document.getElementById("sn01").style.display="inline";
		document.getElementById("sn02").style.display="inline";
		document.getElementById("sn03").style.display="inline";
		document.getElementById("sn04").style.display="inline";
  }
}

function Setfocus() { 
	if (document.getElementById("sn01").value.length == 4) {
		document.getElementById("sn02").focus();
	}
    if (document.getElementById("sn02").value.length == 4) {
    	document.getElementById("sn03").focus();
    }
    if (document.getElementById("sn03").value.length == 4) {
   		document.getElementById("sn04").focus();
    }
}

function SetfocusAe() { 
	if (document.getElementById("ae01").value.length == 4) {
		document.getElementById("ae02").focus();
	}
    if (document.getElementById("ae02").value.length == 6) {
    	document.getElementById("ae03").focus();
    }
}

function FormCheck() { 
	var errorMsg = "";

	var cardType = document.getElementById("creditCardType").value;
	if (cardType == ""){
		errorMsg = errorMsg + "卡別未選\n";
	}

	var cardNo;
	var normalNo = "";
	if(cardType == 'ae'){
		var ae01 = document.getElementById("ae01").value;
		var ae02 = document.getElementById("ae02").value;
		var ae03 = document.getElementById("ae03").value;

		if ( ae01 != "" && IsNumeric(ae01)){
			normalNo = ae01;
		}
		if ( ae02 != "" && IsNumeric(ae02)){
			normalNo = normalNo + ae02;
		}
		if ( ae03 != "" && IsNumeric(ae03)){
			normalNo = normalNo + ae03;
		}

		if(normalNo == "" || normalNo.length != 15){
			errorMsg = errorMsg + "卡號有誤\n";
		}else{
			cardNo = normalNo;
		}
	}else{
		var sn01 = document.getElementById("sn01").value;
		var sn02 = document.getElementById("sn02").value;
		var sn03 = document.getElementById("sn03").value;
		var sn04 = document.getElementById("sn04").value;

		if ( sn01 != "" && IsNumeric(sn01)){
			normalNo = sn01;
		}
		if ( sn02 != "" && IsNumeric(sn02)){
			normalNo = normalNo + sn02;
		}
		if ( sn03 != "" && IsNumeric(sn03)){
			normalNo = normalNo + sn03;
		}
		if ( sn04 != "" && IsNumeric(sn04)){
			normalNo = normalNo + sn04;
		}
		if(normalNo.length != 16){
			errorMsg = errorMsg + "卡號有誤\n";
		}else{
			cardNo = normalNo;
		}
	}
	document.getElementById("cardNo").value = cardNo;

	var cardExpiredYear = document.getElementById("cardExpiredYear").value; 
	if ( cardExpiredYear == ""){
		errorMsg = errorMsg + "到期年份有誤\n";
	}

	var dt = new Date();
	var thisYear = dt.getFullYear() % 100;
	var thisMonth = dt.getMonth() + 1;
	var month;
	var cardExpiredMonth = document.getElementById('cardExpiredMonth').value;
	if(thisYear == parseInt(cardExpiredYear)){
		if(thisMonth > parseInt(cardExpiredMonth)){
			errorMsg = errorMsg + "到期月份有誤\n";
		}
	}

	document.getElementById("expDate").value = cardExpiredYear + month;

	var cvv2 = document.getElementById("cvv2").value;
	if (cvv2 == "" || cvv2.length == 0){
		errorMsg = errorMsg + "信用卡檢核碼未填\n";
	}
	if(cardType == 'ae'){
		if (cvv2.length != 4){
			errorMsg = errorMsg + "信用卡檢核碼有誤\n";
		}
	}else{
		if (cvv2.length != 3){
			errorMsg = errorMsg + "信用卡檢核碼有誤\n";
		}
	}

	if(errorMsg != ""){
		return false;
	}
	
	return true;

}

function IsNumeric(n) { 
      return !isNaN(parseFloat(n)) && isFinite(n); 
}