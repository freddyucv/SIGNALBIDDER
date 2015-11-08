var signalsFirebase;

var currentSignals = [];
var beforeSignals;

function contains(signals, signal){
  
  for (var i = 0; i < signals.length; i++){
    if (signals[i].signal === signal.signal && signals[i].asset === signal.asset){
        return true;
    }
  }

  return false;
}

function saveSignal(){
    var signal = {};

    $( this ).children('td').each(function( index ) {

    switch (index) {
      case 1:
        signal.signal = $( this ).find('a').html();
        break;
      case 2:
        var upSRC = "./Signal Hive Dashboard_files/call_signal.png";
        var imgSRC = $( this ).children('img').first().attr('src');
        signal.direction = imgSRC == upSRC ? 'up' : 'down';
        break;
      case 3:
        signal.expiry = $( this ).html();
        break;
      case 4:
        signal.time = $( this ).html();
        break;
      case 5:
        signal.asset = $( this ).html();
        break;
      default:
    }
  });

  if (!contains(beforeSignal, signal)){
    console.log('post signal', signal);
    signalsFirebase.push(signal);
  }

  currentSignals.push(signal);
}

function saveSignals(){
  console.log('111++++++++++++++++++++++++++++++++++++++++', currentSignals);
  beforeSignal = currentSignals;
  currentSignals = [];

  console.log('2222++++++++++++++++++++++++++++++++++++++++', JSON.stringify(beforeSignal));

  $('#admin_signal_tripwire tbody tr').each(saveSignal);
  $('#manual_signal_tripwire tbody tr').each(saveSignal);

  setTimeout(saveSignals, 1000);
}

console.log('---------------------------------');

$.getScript("https://cdn.firebase.com/js/client/2.3.1/firebase.js",function() {
  console.log('##################################');
  signalsFirebase = new Firebase('https://signalbidder.firebaseio.com/signals');
  saveSignals();
});
