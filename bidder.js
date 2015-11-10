var group = $('.group > span:nth-child(1) > select:nth-child(3)');
var	asset = $('#body > div > form > table > thead > tr > th.type.arrow.step.gray > span > select');
var set = {};

var times = {};
times['2m'] = 3;
times['5m'] = 4;
times['10m'] = 6;
times['15m'] = 7;
times['30m'] = 8;
times['End of the Next Hour'] = 9; //need a review: 9 means 1 hour on B.O.
times['2h'] = 10;
times['4h'] = 11;
times['end'] = 11;

function getTimeVal(hiveTime){
	var t = times[hiveTime];
	if(typeof t === 'undefined'){
  	  return -1;
	} else {
		return t;
	};
}

function prepareGroupSelect(value){			
	if (value <= 3){
		group.val(value);
		group.change();
		setTimeout(function(){ extractAssets(value)} ,200); //to load asset's select
	}
}

function extractAssets(value){
	asset.find('option').each(function() {
		set[$(this).text()] = {gid: value, aid: $(this).val()}
	})	
	extractAssetsSets(value + 1);
}

function getBOAsset(hiveAsset){
	var asst = set[hiveAsset];
	if(typeof a === 'undefined'){
  	  return -1;
	} else {
		return asst;
	};
}

function submitTrade(sel,act){
	$('#action').val(act);
	sel.click();	
};

function selectItem(sel,val){
	sel.val(val);
	sel.change();
};

function setTrade(ast,tim,direction) {
	time = $('.duration > span:nth-child(1) > select:nth-child(3)');
	ammount = $('.amount > span:nth-child(1) > select:nth-child(3)');
	up = $('#body > div > form > table > tbody > tr > td > div > div.submit > div:nth-child(1) > input[type="submit"]');
	down = $('#body > div > form > table > tbody > tr > td > div > div.submit > div:nth-child(3) > input[type="submit"]');

	asst = getBOAsset(ast);
	t = getTimeVal(tim);
	if (t == -1) || (asst == -1){
		return -1;
	} else {
		select_item(group,set[ast].gid);
		select_item(asset,set[ast].aid);
		select_item(time,t);
	}
	//select_item(ammount,ammount,val());
	
	if (direction.localeCompare('up') == 0){ 
		submit_trade(up,'call');
	} else { 
		submit_trade(down,'put');
	};
};

$.getScript("https://cdn.firebase.com/js/client/2.2.1/firebase.js",function() {
  var firebaseRef = new Firebase('https://signalbidder.firebaseio.com/signals');
	firebaseRef.on('child_added', function(snapshot) {
    	message = snapshot.val();
    	key = snapshot.key();    	    	
    	if (setTrade(message.asset,message.expiry,message.direction) == -1){
    		//Set status to not trade
    	};
	});
});