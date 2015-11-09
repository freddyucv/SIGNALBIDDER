var signalsFirebase;

var currentSignals = [];
var beforeSignals;

function contains(signals, signal){

  for (var i = 0; i < signals.length; i++){
    if (signals[i].signal === signal.signal &&
          signals[i].asset === signal.asset &&
          signals[i].price === signal.price){
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
      case 5:
        signal.price = $( this ).html();
        break;
      default:
    }
  });

  signal.status = 'none';

  if (!contains(beforeSignal, signal)){
    signalsFirebase.push(signal);
  }

  currentSignals.push(signal);
}

function saveSignals(){
  beforeSignal = currentSignals;
  currentSignals = [];

  $.ajax({
      type: "GET",
      url: "components/signals-json.php",
      cache: false,
      success: function(data){
        console.log('-------------------robot ' + data);
        console.log('-------------------#temp_robot_signals ' + $('#temp_robot_signals').size());

        $('#temp_robot_signals').append(data);

        console.log('-------------------#temp_robot_signals table tbody tr ' + $('#temp_robot_signals table tbody tr').size());
        $('#temp_robot_signals table tbody tr').each(saveSignal);
      }
  });

  $.ajax({
      type: "GET",
      url: "components/manual-signals-json.php",
      cache: false,
      success: function(data){
        console.log('manual ' + data);
        $('#temp_manual_signal').append(data);
        $('#temp_manual_signal table tbody tr').each(saveSignal);
      }
  });

  setTimeout(saveSignals, 3000);
}

$('body').append('<div id="temp_robot_signals" style="display:none"></div>');
$('body').append('<div id="temp_manual_signals" style="display:none"></div>');

$.getScript("https://cdn.firebase.com/js/client/2.3.1/firebase.js",function() {
  console.log('--------------------------------------');
  signalsFirebase = new Firebase('https://signalbidder.firebaseio.com/signals');
  saveSignals();
});
