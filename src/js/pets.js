window.addEventListener("load", function() {
  //MODAL
  let close = document.getElementById("close");
  let hmodal = document.getElementById("hmodal");
  let hinzu = document.getElementById("hinzu");

  //Template
  let tentry = document.getElementById("tentry").innerHTML;
  let tnoentry = document.getElementById("tnoentry").innerHTML;
  //Feld
  let name = document.getElementById("name");
  let art = document.getElementById("art");
  let rasse = document.getElementById("rasse");
  let wohn = document.getElementById("wohn");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let vom = document.getElementById("vom");
  let bis = document.getElementById("bis");
  let comment = document.getElementById("comment");
  let submitBtn = document.getElementById("submitBtn");






  //Beim Laden der Seite
  //Alle Einträge aus Firebase werden damit angezeigt
  //Referenz auf Firebase wird aufgebaut
  let ref = firebase.database().ref("eintrag");
  ref.once("value")
    .then(function(snapshot) {
      let zahl = snapshot.child("highest").val();
      //Prüfen, ob es Einträge gibt
      if (zahl!=0){
        //Wenn die Zahl eine gerade Zahl ist
        if (zahl % 2 == 0) {
          for (let i = 1; i < zahl; i++) {
            //zwei Einträge werden immer auf einmal ausgelesen und dargestellt mithilfe von Bootstrap
            //div-dummy wird erstellt
            let dummy = document.createElement("div");
            dummy.innerHTML = tentry;
            //Werte aus erstem Eintrag werden durch Datenbank-Werte ersetzt
            dummy.innerHTML = dummy.innerHTML.replace("$Name1$", snapshot.child(i).child("name").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Art1$", snapshot.child(i).child("art").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Rasse1$", snapshot.child(i).child("rasse").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Wohnort1$", snapshot.child(i).child("wohnort").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Email1$", snapshot.child(i).child("email").val());
            dummy.innerHTML = dummy.innerHTML.replace("$vom1$", snapshot.child(i).child("zeitraum").child("Von").val());
            dummy.innerHTML = dummy.innerHTML.replace("$bis1$", snapshot.child(i).child("zeitraum").child("Bis").val());
            dummy.innerHTML = dummy.innerHTML.replace("$kommentar1$", snapshot.child(i).child("kommentar").val());
            dummy.innerHTML = dummy.innerHTML.replace("$ID1$", snapshot.child(i).child("ID").val());
            //Werte aus zweitem Eintrag werden durch Datenbank-werte ersetzt
            dummy.innerHTML = dummy.innerHTML.replace("$Name2$", snapshot.child(i + 1).child("name").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Art2$", snapshot.child(i + 1).child("art").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Rasse2$", snapshot.child(i + 1).child("rasse").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Wohnort2$", snapshot.child(i + 1).child("wohnort").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Email2$", snapshot.child(i + 1).child("email").val());
            dummy.innerHTML = dummy.innerHTML.replace("$vom2$", snapshot.child(i + 1).child("zeitraum").child("Von").val());
            dummy.innerHTML = dummy.innerHTML.replace("$bis2$", snapshot.child(i + 1).child("zeitraum").child("Bis").val());
            dummy.innerHTML = dummy.innerHTML.replace("$kommentar2$", snapshot.child(i + 1).child("kommentar").val());
            dummy.innerHTML = dummy.innerHTML.replace("$ID2$", snapshot.child(i + 1).child("ID").val());
            //Der dummy wird an der richtigen Stelle im HTML von pets angehängt
            document.getElementById("eintrag").appendChild(dummy);
            //Die IDs werden noch überarbeitet, damit jeder Wert seine eigene, eindeutige ID besitzt
            //1. Damit keine doppelten ids
            //2. Für Weiterarbeiten mit diesem Projekt eine gute Grundlage
            document.getElementById("eintrag1").id = snapshot.child(i).child("ID").val() + "entry";
            document.getElementById("name1").id = snapshot.child(i).child("ID").val() + "name";
            document.getElementById("art1").id = snapshot.child(i).child("ID").val() + "art";
            document.getElementById("rasse1").id = snapshot.child(i).child("ID").val() + "rasse";
            document.getElementById("wohnort1").id = snapshot.child(i).child("ID").val() + "wohnort";
            document.getElementById("email1").id = snapshot.child(i).child("ID").val() + "email";
            document.getElementById("zeitraum1").id = snapshot.child(i).child("ID").val() + "zeitraum";
            document.getElementById("kommentar1").id = snapshot.child(i).child("ID").val() + "kommentar";
            document.getElementById("loesch1").id = snapshot.child(i).child("ID").val();

            document.getElementById("eintrag2").id = snapshot.child(i + 1).child("ID").val() + "entry";
            document.getElementById("name2").id = snapshot.child(i + 1).child("ID").val() + "name";
            document.getElementById("art2").id = snapshot.child(i + 1).child("ID").val() + "art";
            document.getElementById("rasse2").id = snapshot.child(i + 1).child("ID").val() + "rasse";
            document.getElementById("wohnort2").id = snapshot.child(i + 1).child("ID").val() + "wohnort";
            document.getElementById("email2").id = snapshot.child(i + 1).child("ID").val() + "email";
            document.getElementById("zeitraum2").id = snapshot.child(i + 1).child("ID").val() + "zeitraum";
            document.getElementById("kommentar2").id = snapshot.child(i + 1).child("ID").val() + "kommentar";
            document.getElementById("loesch2").id = snapshot.child(i + 1).child("ID").val();


            i++;
          }
        } else {
          //Wenn es eine ungerade Zahl an Einträgen gibt
          //fast gleiches Vorgehen, wie oben
          //nur, dass der Eintrag 1 vor dem letzten Eintrag aus der Datenbank anhält
          for (let i = 1; i < (zahl - 1); i++) {
            let dummy = document.createElement("div");
            dummy.innerHTML = tentry;
            dummy.innerHTML = dummy.innerHTML.replace("$Name1$", snapshot.child(i).child("name").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Art1$", snapshot.child(i).child("art").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Rasse1$", snapshot.child(i).child("rasse").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Wohnort1$", snapshot.child(i).child("wohnort").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Email1$", snapshot.child(i).child("email").val());
            dummy.innerHTML = dummy.innerHTML.replace("$vom1$", snapshot.child(i).child("zeitraum").child("Von").val());
            dummy.innerHTML = dummy.innerHTML.replace("$bis1$", snapshot.child(i).child("zeitraum").child("Bis").val());
            dummy.innerHTML = dummy.innerHTML.replace("$kommentar1$", snapshot.child(i).child("kommentar").val());
            dummy.innerHTML = dummy.innerHTML.replace("$ID1$", snapshot.child(i).child("ID").val());

            dummy.innerHTML = dummy.innerHTML.replace("$Name2$", snapshot.child(i + 1).child("name").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Art2$", snapshot.child(i + 1).child("art").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Rasse2$", snapshot.child(i + 1).child("rasse").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Wohnort2$", snapshot.child(i + 1).child("wohnort").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Email2$", snapshot.child(i + 1).child("email").val());
            dummy.innerHTML = dummy.innerHTML.replace("$vom2$", snapshot.child(i + 1).child("zeitraum").child("Von").val());
            dummy.innerHTML = dummy.innerHTML.replace("$bis2$", snapshot.child(i + 1).child("zeitraum").child("Bis").val());
            dummy.innerHTML = dummy.innerHTML.replace("$kommentar2$", snapshot.child(i + 1).child("kommentar").val());
            dummy.innerHTML = dummy.innerHTML.replace("$ID2$", snapshot.child(i + 1).child("ID").val());

            document.getElementById("eintrag").appendChild(dummy);

            document.getElementById("eintrag1").id = snapshot.child(i).child("ID").val() + "entry";
            document.getElementById("name1").id = snapshot.child(i).child("ID").val() + "name";
            document.getElementById("art1").id = snapshot.child(i).child("ID").val() + "art";
            document.getElementById("rasse1").id = snapshot.child(i).child("ID").val() + "rasse";
            document.getElementById("wohnort1").id = snapshot.child(i).child("ID").val() + "wohnort";
            document.getElementById("email1").id = snapshot.child(i).child("ID").val() + "email";
            document.getElementById("zeitraum1").id = snapshot.child(i).child("ID").val() + "zeitraum";
            document.getElementById("kommentar1").id = snapshot.child(i).child("ID").val() + "kommentar";
            document.getElementById("loesch1").id = snapshot.child(i).child("ID").val();

            document.getElementById("eintrag2").id = snapshot.child(i + 1).child("ID").val() + "entry";
            document.getElementById("name2").id = snapshot.child(i + 1).child("ID").val() + "name";
            document.getElementById("art2").id = snapshot.child(i + 1).child("ID").val() + "art";
            document.getElementById("rasse2").id = snapshot.child(i + 1).child("ID").val() + "rasse";
            document.getElementById("wohnort2").id = snapshot.child(i + 1).child("ID").val() + "wohnort";
            document.getElementById("email2").id = snapshot.child(i + 1).child("ID").val() + "email";
            document.getElementById("zeitraum2").id = snapshot.child(i + 1).child("ID").val() + "zeitraum";
            document.getElementById("kommentar2").id = snapshot.child(i + 1).child("ID").val() + "kommentar";
            document.getElementById("loesch2").id = snapshot.child(i + 1).child("ID").val();


            i++;
          }
          //der letzte Datenbankeintrag wird hiermit hinzugefügt
          let dummy = document.createElement("div");
          dummy.innerHTML = tentry;
          dummy.innerHTML = dummy.innerHTML.replace("$Name1$", snapshot.child(zahl).child("name").val());
          dummy.innerHTML = dummy.innerHTML.replace("$Art1$", snapshot.child(zahl).child("art").val());
          dummy.innerHTML = dummy.innerHTML.replace("$Rasse1$", snapshot.child(zahl).child("rasse").val());
          dummy.innerHTML = dummy.innerHTML.replace("$Wohnort1$", snapshot.child(zahl).child("wohnort").val());
          dummy.innerHTML = dummy.innerHTML.replace("$Email1$", snapshot.child(zahl).child("email").val());
          dummy.innerHTML = dummy.innerHTML.replace("$vom1$", snapshot.child(zahl).child("zeitraum").child("Von").val());
          dummy.innerHTML = dummy.innerHTML.replace("$bis1$", snapshot.child(zahl).child("zeitraum").child("Bis").val());
          dummy.innerHTML = dummy.innerHTML.replace("$kommentar1$", snapshot.child(zahl).child("kommentar").val());
          dummy.innerHTML = dummy.innerHTML.replace("$ID1$", snapshot.child(zahl).child("ID").val());


          document.getElementById("eintrag").appendChild(dummy);

          document.getElementById("eintrag1").id = snapshot.child(zahl).child("ID").val() + "entry";
          document.getElementById("name1").id = snapshot.child(zahl).child("ID").val() + "name";
          document.getElementById("art1").id = snapshot.child(zahl).child("ID").val() + "art";
          document.getElementById("rasse1").id = snapshot.child(zahl).child("ID").val() + "rasse";
          document.getElementById("wohnort1").id = snapshot.child(zahl).child("ID").val() + "wohnort";
          document.getElementById("email1").id = snapshot.child(zahl).child("ID").val() + "email";
          document.getElementById("zeitraum1").id = snapshot.child(zahl).child("ID").val() + "zeitraum";
          document.getElementById("kommentar1").id = snapshot.child(zahl).child("ID").val() + "kommentar";
          document.getElementById("loesch1").id = snapshot.child(zahl).child("ID").val();

          //der zweite Eintrag wird unsichtbar gemacht
          document.getElementById("eintrag2").id = "ungerade";
          document.getElementById("name2").id = "name";
          document.getElementById("art2").id = "art";
          document.getElementById("rasse2").id = "rasse";
          document.getElementById("wohnort2").id = "wohnort";
          document.getElementById("email2").id = "email";
          document.getElementById("zeitraum2").id = "zeitraum";
          document.getElementById("kommentar2").id = "kommentar";
          document.getElementById("loesch2").id = "gehtnicht";
          document.getElementById("ungerade").style.display = "none";
        }
      }
      else{
        //falls es keine Einträge geben sollte, wird dies auch auf der Website angezeigt
        let dummy = document.createElement("div");
        dummy.innerHTML = tnoentry;
        let noentry =document.getElementById("noentrydiv");
        noentry.appendChild(dummy);
        noentry.style.display ="block";

      }

    });





  //OPEN-CLOSE-MODAL
  //zum öffnen und schließen
  hinzu.addEventListener("click", function() {
    //öffnen
    hmodal.style.display = "block";
  });


  close.addEventListener("click", function() {
    //schließen
    hmodal.style.display = "none";
    //um die in das Formular eingetragenen Elemente zu resetten
    reset(1);
  });

  window.addEventListener("click", function() {
    //schließen
    if (event.target == hmodal) {
      hmodal.style.display = "none";
      //um die in das Formular eingetragenen Elemente zu resetten
      reset(1);
    }

  });



  //in Datenbank übergeben
  submitBtn.addEventListener("click", async function() {
    //reset der Feldumrandungen
    reset(0);
    //schauen, ob alle Pflichtfelder ausgefüllt sind
    let fehler = 0;
    if (name.value == "") {
      //rote Umrandung bei jedem Pflichtfeld, welches nicht ausgefüllt wurde
      name.style.border = '1px solid red';
      fehler += 1;
    }
    if (art.value == "") {
      art.style.border = '1px solid red';
      fehler += 1;
    }
    if (wohn.value == "") {
      wohn.style.border = '1px solid red';
      fehler += 1;
    }
    if (vom.value == "") {
      vom.style.border = '1px solid red';
      fehler += 1;
    }
    if (bis.value == "") {
      bis.style.border = '1px solid red';
      fehler += 1;
    }
    if (password.value == "") {
      password.style.border = '1px solid red';
      fehler += 1;
    }
    if (email.value == "") {
      email.style.border = '1px solid red';
      fehler += 1;
    }
    //wenn alle Felder ausgefüllt sind, die bnenötigt werden, Übergabe an Datenbank
    if (fehler == 0) {
      let ref = firebase.database().ref("eintrag");
      ref.once("value")
        .then(function(snapshot) {
          let zahl = snapshot.child("highest").val();
          zahl += 1;
          let heute = new Date();
          let id = heute.getDate() + "" + heute.getMonth() + heute.getFullYear() + heute.getHours() + heute.getMinutes() + heute.getTime();
          ref.child(zahl).set({
            ID: id,
            name: name.value,
            art: art.value,
            rasse: rasse.value,
            wohnort: wohn.value,
            email: email.value,
            passwort: password.value,
            kommentar: comment.value,
            zeitraum: {
              Von: vom.value,
              Bis: bis.value,
            },
          });
          ref.child("highest").set(zahl);
        });
      //Modal schließen
      hmodal.style.display = "none";
      //1 Sekunde warten
      await sleep(1000);
      //Formular neu laden
      document.location.reload(true);
    } else {
      //Wenn nicht alle Pflichtfelder ausgefüllt sind, alert mit bitte füllen sie alle Pflichtfelder aus
      alert('Bitte füllen Sie alle Pflichtfelder aus!');
    }
  });

  function reset(fall){
    //Rote Border wieder auf normale Border zurücksetzen
    if(name.style.border == '1px solid red'){
      name.style.border = '1px solid #BEBEBE';
    }
    if(art.style.border == '1px solid red'){
      art.style.border = '1px solid #BEBEBE';
    }
    if(wohn.style.border == '1px solid red'){
      wohn.style.border = '1px solid #BEBEBE';
    }
    if(vom.style.border == '1px solid red'){
      vom.style.border = '1px solid #BEBEBE';
    }
    if(bis.style.border == '1px solid red'){
      bis.style.border = '1px solid #BEBEBE';
    }
    if(password.style.border == '1px solid red'){
      password.style.border = '1px solid #BEBEBE';
    }
    if(email.style.border == '1px solid red'){
      email.style.border = '1px solid #BEBEBE';
    }

    if(fall == 1){
    //wenn das Modal geschlossen wird zusätzlich alle Einträge in den Feldern löschen
      name.value = "";
      art.value = "";
      wohn.value = "";
      vom.value ="";
      bis.value="",
      password.value="";
      email.value="";
      comment.value="";
      rasse.value="";

    }


  }

  //gefunden auf Stackoverflow
  //https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
