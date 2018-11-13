//Wenn man einen Eintrag löschen will und auf Eintag löschen klickt
async function loeschfunc(clicked_id) {
  //Abfrage des Passworts
  let password = prompt("Bitte geben Sie ihr Passwort ein:");
  //Datenbankreferenz aufbauen
  let ref = firebase.database().ref("eintrag");
  let snapshot = await ref.once("value");
  //Die Anzahl der Einträge herausfinden
  let zahl = snapshot.child("highest").val()
  //Wenn nur ein Eintrag vorhanden ist
  if(zahl == 1){
      //prüfung, ob eingetragenes passwort dem Passwort aus der Datenbank des Eintrags entspricht
      if (password == snapshot.child(zahl).child("passwort").val()) {
        //Wenn das der Fall ist, dann wird dieser Eintrag gelöscht
        //1 Sekunde warten, dann lädt Seite neu mit aktualsiertem Eintragsverzeichnis
        ref.child(zahl).remove();
        ref.child("highest").set(zahl - 1);
        await sleep(1000);
        document.location.reload(true);
      }
      else {
        //Wenn eingegebenes Passwort nicht dem in der Datenbank entspricht
        alert('Passwort falsch, bitte achten Sie auf Groß-und Kleinschreibung!');
      }
  }
  //Wenn mehr als ein Eintrag vorhanden ist, diesen erst finden
  else if(clicked_id == snapshot.child(zahl).child("ID").val()){
    //Wenn der angeklickte Eintrag der letzte Eintrag in der Datenbank ist, wird genauso vorgegangen, wie oben
    if (password == snapshot.child(zahl).child("passwort").val()) {
      ref.child(zahl).remove();
      ref.child("highest").set(zahl - 1);
      await sleep(1000);
      document.location.reload(true);
    }
    else {
      alert('Passwort falsch, bitte achten Sie auf Groß-und Kleinschreibung!');
    }
  }
  else{
    //wenn es nicht der letzte Eintrag in der Datenbank ist, dann muss man diesen suchen
    for (let i = 1; i < zahl; i++) {
      if (clicked_id == snapshot.child(i).child("ID").val()) {
        //Wenn man diesen gefunden hat wird das Passwort geprüft
        if (password == snapshot.child(i).child("passwort").val()) {
          //Wenn das Passwort richtig ist, dann wird der Eintrag durch den nächsthöheren Eintrag ersetzt
          //Wenn Eintrag 2 von 6 Einträgen gelöscht wird:
          //3 wird zu 2; 4 zu 3; 5 zu 4; 6 zu 5 und der 6. gelöscht
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
          //letzten Eintrag löschen
          ref.child(zahl).remove();
          ref.child("highest").set(zahl - 1);
          await sleep(1000);
          document.location.reload(true);


        }
        else {
          //Wenn Passwort nicht korrekt ist
          alert('Passwort falsch, bitte achten Sie auf Groß-und Kleinschreibung!');
        }
        break;
      }
    }
  }



}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
