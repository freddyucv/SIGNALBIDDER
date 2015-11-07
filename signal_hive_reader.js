function proccessSignal(){

  $( this ).each(function( index ) {
      switch (index) {
        case 0:
          console.log('id', this.html);
          break;
        case 2:
          console.log('updown', this.children('img').first().src);
          break;
        case 3:
          console.log('expiry', this.html);
          break;
          case 4:
            console.log('asset', this.html);
            break;
        default:

      }
  });
}

$('#admin_signal_tripwire tbody tr').each(proccessSignal);
