async function loeschfunc(clicked_id) {
  let password = prompt("Bitte geben Sie ihr Passwort ein:");
  let ref = firebase.database().ref("eintrag");
  ref.once("value")
    .then(function(snapshot) {
      let zahl = snapshot.child("highest").val()
      for (let i = 1; i < zahl; i++) {
        if (clicked_id == snapshot.child(i).child("ID").val()) {
          if (password == snapshot.child(i).child("passwort").val()) {
            for (var j = i; j < zahl; j++) {

              ref.child(j).set({
                ID: snapshot.child(j + 1).child("ID").val(),
                name: snapshot.child(j + 1).child("name").val(),
                art: snapshot.child(j + 1).child("art").val(),
                rasse: snapshot.child(j + 1).child("rasse").val(),
                wohnort: snapshot.child(j + 1).child("wohnort").val(),
                email: snapshot.child(j + 1).child("email").val(),
                passwort: snapshot.child(j + 1).child("passwort").val(),
                kommentar: snapshot.child(j + 1).child("kommentar").val(),
                zeitraum: {
                  Von: snapshot.child(j + 1).child("zeitraum").child("Von").val(),
                  Bis: snapshot.child(j + 1).child("zeitraum").child("Bis").val(),
                },
              });

            }

            ref.child(zahl).remove();
            ref.child("highest").set(zahl - 1);


          } else {
            alert('Passwort falsch, bitte achten Sie auf Groß-und Kleinschreibung!');
          }
          break;
        }
      }

    });


}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
