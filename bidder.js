function determineGroup(desc){
	return null;
};

function submitTrade(sel,act){
	$('#action').val(act);
	sel.click();	
};

function selectItem(sel,val){
	sel.val(val);
	sel.change();
};

function setTrade(grp,ast,tim,amm,direction) {
	group = $('.group > span:nth-child(1) > select:nth-child(3)');
	asset = $('#body > div > form > table > thead > tr > th.type.arrow.step.gray > span > select');
	time = $('.duration > span:nth-child(1) > select:nth-child(3)');
	ammount = $('.amount > span:nth-child(1) > select:nth-child(3)');
	up = $('#body > div > form > table > tbody > tr > td > div > div.submit > div:nth-child(1) > input[type="submit"]');
	down = $('#body > div > form > table > tbody > tr > td > div > div.submit > div:nth-child(3) > input[type="submit"]');

	select_item(group,1);
	select_item(asset,2);
	select_item(time,2);
	select_item(ammount,100);
	
	if (direction.localeCompare('up') == 0){ 
		submit_trade(up,'call');
	} else { 
		submit_trade(down,'put');
	};
};

var message;

$.getScript("https://cdn.firebase.com/js/client/2.2.1/firebase.js",function() {
  console.log('##################################');
  var myDataRef = new Firebase('https://signalbidder.firebaseio.com/signals');
	myDataRef.on('child_added', function(snapshot) {
    	message = snapshot.val();
    	key = snapshot.key();
    	//console.error();
    	console.error(key + ' : ' + message.asset + ',' +  message.direction + ',' +  message.expiry + ',' +  message.time);
		//displayChatMessage(1,2,2,100,message.direction);
	});
});





