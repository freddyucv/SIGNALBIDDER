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

  signal.status = none;

  if (!contains(beforeSignal, signal)){
    signalsFirebase.push(signal);
  }

  currentSignals.push(signal);
}

function saveSignals(){
  beforeSignal = currentSignals;
  currentSignals = [];


  var robot_signal_form_data = $("#robot_signal_form").serialize();

  $.ajax({
      type: "POST",
      url: "components/signals-json.php",
      data: robot_signal_form_data,
      async: true,
      cache: false,
      timeout:5000,
      success: function(data){
        console.log('robot', data);
      }
  });

  var singal_form_data = $("#signal_form").serialize();
  $.ajax({
      type: "POST",
      url: "components/manual-signals-json.php",
      data: singal_form_data,
      async: true,
      cache: false,
      timeout:5000,
      success: function(data){
        console.log('manual', data);
      }
  });
/*
  $('#admin_signal_tripwire tbody tr').each(saveSignal);
  $('#manual_signal_tripwire tbody tr').each(saveSignal);
*/
  setTimeout(saveSignals, 3000);
}

$.getScript("https://cdn.firebase.com/js/client/2.3.1/firebase.js",function() {
  console.log('--------------------------------------');
  signalsFirebase = new Firebase('https://signalbidder.firebaseio.com/signals');
  saveSignals();
});
