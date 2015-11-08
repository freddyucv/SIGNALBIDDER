var signalsFirebase;

function saveSignal(){
    var signal = {};

    $( this ).children('td').each(function( index ) {

    switch (index) {
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

  console.log('signal', signal);
  signalsFirebase.push(signal);
}

function saveSignals(){
  $('#admin_signal_tripwire tbody tr').each(saveSignal);
  $('#manual_signal_tripwire tbody tr').each(saveSignal);
}

console.log('---------------------------------');

$.getScript("https://cdn.firebase.com/js/client/2.3.1/firebase.js",function() {
  console.log('##################################');
  signalsFirebase = new Firebase('https://signalbidder.firebaseio.com/signals');
  saveSignals();
});
