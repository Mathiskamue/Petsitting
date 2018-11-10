window.addEventListener("load", function() {
  //Buttons
  let filtern = document.getElementById("filtern");
  let zuruecksetzen = document.getElementById("zuruecksetzen")


  let eintrag = document.getElementById("eintrag");
  let filteransicht = document.getElementById("filteransicht");

  //Templates
  let tentry = document.getElementById("tentry").innerHTML;
  let tnoentry = document.getElementById("tnoentry").innerHTML;

  //Filterwerkzeuge
  let hund = document.getElementById("hund");
  let katze = document.getElementById("katze");
  let vogel = document.getElementById("vogel");
  let hase = document.getElementById("hase");
  let schildkroete = document.getElementById("schildkroete");
  let sonstiges = document.getElementById("sonstiges");
  let datumsuche = document.getElementById("datumsuche");
  let ortsuche = document.getElementById("ortsuche");

  //suchergebnisse
  let suchergebnisse = document.getElementById("suchergebnisse");



  filtern.addEventListener("click", function() {
    eintrag.style.display = "none";
    filteransicht.style.display = "block";
    let ort = false;
    let datum = false;
    let tiere = [];
    if (hund.checked) {
      tiere.push("Hund");
    }
    if (katze.checked) {
      tiere.push("Katze");
    }
    if (vogel.checked) {
      tiere.push("Vogel");
    }
    if (hase.checked) {
      tiere.push("Hase");
    }
    if (schildkroete.checked) {
      tiere.push("Schildkroete");
    }
    if (sonstiges.checked) {
      tiere.push("Sonstiges");
    }
    if (ortsuche.value != "") {
      ort = true;
    }
    if (datumsuche.value != "") {
      datum = true;
    }
    addElement(tiere, ort, datum);



  });

  function addElement(tiere, ort, datum) {
    if (tiere.length != 0) {
      for (let i = 1; i <= tiere.length; i++) {

      }
    } else if (ort == true) {
      findenOrtDatum(ort, datum);

    } else if (datum == true) {
      findenDatum();
    }

  }


  function finden(tier, ort, datum) {

  }
  async function findenOrtDatum(ort, datum) {
    let ergebnisse = 0;
    if (datum == true) {
      let ref = firebase.database().ref("eintrag");
      let snapshot = await ref.once("value");
      let zahl = snapshot.child("highest").val();
      let zaehler = 1;
      while (zaehler <= zahl) {
        let dummy = document.createElement("div");
        dummy.innerHTML = tentry;
        let zahl1;
        let zahl2;
        let keinzweitereintrag = false;
        let hinzugefuegt = false;
        while (zaehler <= zahl) {
          if (snapshot.child(zaehler).child("wohnort").val() == ortsuche.value && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {
              dummy.innerHTML = dummy.innerHTML.replace("$Name1$", snapshot.child(zaehler).child("name").val());
              dummy.innerHTML = dummy.innerHTML.replace("$Art1$", snapshot.child(zaehler).child("art").val());
              dummy.innerHTML = dummy.innerHTML.replace("$Rasse1$", snapshot.child(zaehler).child("rasse").val());
              dummy.innerHTML = dummy.innerHTML.replace("$Wohnort1$", snapshot.child(zaehler).child("wohnort").val());
              dummy.innerHTML = dummy.innerHTML.replace("$Email1$", snapshot.child(zaehler).child("email").val());
              dummy.innerHTML = dummy.innerHTML.replace("$vom1$", snapshot.child(zaehler).child("zeitraum").child("Von").val());
              dummy.innerHTML = dummy.innerHTML.replace("$bis1$", snapshot.child(zaehler).child("zeitraum").child("Bis").val());
              dummy.innerHTML = dummy.innerHTML.replace("$kommentar1$", snapshot.child(zaehler).child("kommentar").val());
              dummy.innerHTML = dummy.innerHTML.replace("$ID1$", snapshot.child(zaehler).child("ID").val());
              zahl1 = zaehler;
              hinzugefuegt = true;
              ergebnisse++;
              break;
          } else {
            zaehler++;
          }
        }
        zaehler++;
        while (zaehler <= zahl) {
          if (snapshot.child(zaehler).child("wohnort").val() == ortsuche.value && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {

            dummy.innerHTML = dummy.innerHTML.replace("$Name2$", snapshot.child(zaehler).child("name").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Art2$", snapshot.child(zaehler).child("art").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Rasse2$", snapshot.child(zaehler).child("rasse").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Wohnort2$", snapshot.child(zaehler).child("wohnort").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Email2$", snapshot.child(zaehler).child("email").val());
            dummy.innerHTML = dummy.innerHTML.replace("$vom2$", snapshot.child(zaehler).child("zeitraum").child("Von").val());
            dummy.innerHTML = dummy.innerHTML.replace("$bis2$", snapshot.child(zaehler).child("zeitraum").child("Bis").val());
            dummy.innerHTML = dummy.innerHTML.replace("$kommentar2$", snapshot.child(zaehler).child("kommentar").val());
            dummy.innerHTML = dummy.innerHTML.replace("$ID2$", snapshot.child(zaehler).child("ID").val());
            zahl2 = zaehler;
            ergebnisse++;
            zaehler++;
            break;
          }
          else if(zaehler == zahl){
            keinzweitereintrag=true;
            zaehler++;
          }
           else {
            zaehler++;
          }
        }
        if (hinzugefuegt == true) {
          let noentry =document.getElementById("gefiltert");
          noentry.appendChild(dummy);

          document.getElementById("eintrag1").id = snapshot.child(zahl1).child("ID").val() + "entry";
          document.getElementById("name1").id = snapshot.child(zahl1).child("ID").val() + "name";
          document.getElementById("art1").id = snapshot.child(zahl1).child("ID").val() + "art";
          document.getElementById("rasse1").id = snapshot.child(zahl1).child("ID").val() + "rasse";
          document.getElementById("wohnort1").id = snapshot.child(zahl1).child("ID").val() + "wohnort";
          document.getElementById("email1").id = snapshot.child(zahl1).child("ID").val() + "email";
          document.getElementById("zeitraum1").id = snapshot.child(zahl1).child("ID").val() + "zeitraum";
          document.getElementById("kommentar1").id = snapshot.child(zahl1).child("ID").val() + "kommentar";
          document.getElementById("loesch1").id = snapshot.child(zahl1).child("ID").val();

          if(keinzweitereintrag== false){
            document.getElementById("eintrag2").id = snapshot.child(zahl2).child("ID").val() + "entry";
            document.getElementById("name2").id = snapshot.child(zahl2).child("ID").val() + "name";
            document.getElementById("art2").id = snapshot.child(zahl2).child("ID").val() + "art";
            document.getElementById("rasse2").id = snapshot.child(zahl2).child("ID").val() + "rasse";
            document.getElementById("wohnort2").id = snapshot.child(zahl2).child("ID").val() + "wohnort";
            document.getElementById("email2").id = snapshot.child(zahl2).child("ID").val() + "email";
            document.getElementById("zeitraum2").id = snapshot.child(zahl2).child("ID").val() + "zeitraum";
            document.getElementById("kommentar2").id = snapshot.child(zahl2).child("ID").val() + "kommentar";
            document.getElementById("loesch2").id = snapshot.child(zahl2).child("ID").val();
          }
          if(keinzweitereintrag==true){
            document.getElementById("eintrag2").style.display = "none";
          }





        }

      }

    } else {

      let ref = firebase.database().ref("eintrag");
      let snapshot = await ref.once("value");
      let zahl = snapshot.child("highest").val();
      let zaehler = 1;
      while (zaehler <= zahl) {
        let dummy = document.createElement("div");
        dummy.innerHTML = tentry;
        let zahl1;
        let zahl2;
        let keinzweitereintrag = false;
        let hinzugefuegt = false;
        while (zaehler <= zahl) {
          if (snapshot.child(zaehler).child("wohnort").val() == ortsuche.value) {

            dummy.innerHTML = dummy.innerHTML.replace("$Name1$", snapshot.child(zaehler).child("name").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Art1$", snapshot.child(zaehler).child("art").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Rasse1$", snapshot.child(zaehler).child("rasse").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Wohnort1$", snapshot.child(zaehler).child("wohnort").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Email1$", snapshot.child(zaehler).child("email").val());
            dummy.innerHTML = dummy.innerHTML.replace("$vom1$", snapshot.child(zaehler).child("zeitraum").child("Von").val());
            dummy.innerHTML = dummy.innerHTML.replace("$bis1$", snapshot.child(zaehler).child("zeitraum").child("Bis").val());
            dummy.innerHTML = dummy.innerHTML.replace("$kommentar1$", snapshot.child(zaehler).child("kommentar").val());
            dummy.innerHTML = dummy.innerHTML.replace("$ID1$", snapshot.child(zaehler).child("ID").val());
            zahl1 = zaehler;
            hinzugefuegt = true;
            ergebnisse++;
            break;
          } else {
            zaehler++;
          }
        }
        zaehler++;
        while (zaehler <= zahl) {
          if (snapshot.child(zaehler).child("wohnort").val() == ortsuche.value) {

            dummy.innerHTML = dummy.innerHTML.replace("$Name2$", snapshot.child(zaehler).child("name").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Art2$", snapshot.child(zaehler).child("art").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Rasse2$", snapshot.child(zaehler).child("rasse").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Wohnort2$", snapshot.child(zaehler).child("wohnort").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Email2$", snapshot.child(zaehler).child("email").val());
            dummy.innerHTML = dummy.innerHTML.replace("$vom2$", snapshot.child(zaehler).child("zeitraum").child("Von").val());
            dummy.innerHTML = dummy.innerHTML.replace("$bis2$", snapshot.child(zaehler).child("zeitraum").child("Bis").val());
            dummy.innerHTML = dummy.innerHTML.replace("$kommentar2$", snapshot.child(zaehler).child("kommentar").val());
            dummy.innerHTML = dummy.innerHTML.replace("$ID2$", snapshot.child(zaehler).child("ID").val());
            zahl2 = zaehler;
            ergebnisse++;
            zaehler++;
            break;
          }
          else if(zaehler == zahl){
            keinzweitereintrag=true;
            zaehler++;
          }
           else {
            zaehler++;
          }
        }
        if (hinzugefuegt == true) {
          let noentry =document.getElementById("gefiltert");
          noentry.appendChild(dummy);

          document.getElementById("eintrag1").id = snapshot.child(zahl1).child("ID").val() + "entry";
          document.getElementById("name1").id = snapshot.child(zahl1).child("ID").val() + "name";
          document.getElementById("art1").id = snapshot.child(zahl1).child("ID").val() + "art";
          document.getElementById("rasse1").id = snapshot.child(zahl1).child("ID").val() + "rasse";
          document.getElementById("wohnort1").id = snapshot.child(zahl1).child("ID").val() + "wohnort";
          document.getElementById("email1").id = snapshot.child(zahl1).child("ID").val() + "email";
          document.getElementById("zeitraum1").id = snapshot.child(zahl1).child("ID").val() + "zeitraum";
          document.getElementById("kommentar1").id = snapshot.child(zahl1).child("ID").val() + "kommentar";
          document.getElementById("loesch1").id = snapshot.child(zahl1).child("ID").val();

          if(keinzweitereintrag== false){
            document.getElementById("eintrag2").id = snapshot.child(zahl2).child("ID").val() + "entry";
            document.getElementById("name2").id = snapshot.child(zahl2).child("ID").val() + "name";
            document.getElementById("art2").id = snapshot.child(zahl2).child("ID").val() + "art";
            document.getElementById("rasse2").id = snapshot.child(zahl2).child("ID").val() + "rasse";
            document.getElementById("wohnort2").id = snapshot.child(zahl2).child("ID").val() + "wohnort";
            document.getElementById("email2").id = snapshot.child(zahl2).child("ID").val() + "email";
            document.getElementById("zeitraum2").id = snapshot.child(zahl2).child("ID").val() + "zeitraum";
            document.getElementById("kommentar2").id = snapshot.child(zahl2).child("ID").val() + "kommentar";
            document.getElementById("loesch2").id = snapshot.child(zahl2).child("ID").val();
          }
          if(keinzweitereintrag==true){
            document.getElementById("eintrag2").style.display = "none";
          }





        }

      }
    }
    suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("$Zahl$", ergebnisse);
    suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace(/[0-9]+/, ergebnisse);
    if(ergebnisse==1){
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("wurden", "wurde");
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("Ergebnisse", "Ergebnis");
    }else{
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("wurde ", "wurden ");
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("Ergebnis ", "Ergebnisse ");
    }
  }

  async function findenDatum() {
    let ergebnisse = 0;
    let ref = firebase.database().ref("eintrag");
    let snapshot = await ref.once("value");
    let zahl = snapshot.child("highest").val();
    let zaehler = 1;
    while (zaehler <= zahl) {
      let dummy = document.createElement("div");
      dummy.innerHTML = tentry;
      let zahl1;
      let zahl2;
      let keinzweitereintrag = false;
      let hinzugefuegt = false;
      while (zaehler <= zahl) {
        if (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value) {
            dummy.innerHTML = dummy.innerHTML.replace("$Name1$", snapshot.child(zaehler).child("name").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Art1$", snapshot.child(zaehler).child("art").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Rasse1$", snapshot.child(zaehler).child("rasse").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Wohnort1$", snapshot.child(zaehler).child("wohnort").val());
            dummy.innerHTML = dummy.innerHTML.replace("$Email1$", snapshot.child(zaehler).child("email").val());
            dummy.innerHTML = dummy.innerHTML.replace("$vom1$", snapshot.child(zaehler).child("zeitraum").child("Von").val());
            dummy.innerHTML = dummy.innerHTML.replace("$bis1$", snapshot.child(zaehler).child("zeitraum").child("Bis").val());
            dummy.innerHTML = dummy.innerHTML.replace("$kommentar1$", snapshot.child(zaehler).child("kommentar").val());
            dummy.innerHTML = dummy.innerHTML.replace("$ID1$", snapshot.child(zaehler).child("ID").val());
            zahl1 = zaehler;
            hinzugefuegt = true;
            ergebnisse++;
            break;
        } else {
          zaehler++;
        }
      }
      zaehler++;
      while (zaehler <= zahl) {
        if (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value) {

          dummy.innerHTML = dummy.innerHTML.replace("$Name2$", snapshot.child(zaehler).child("name").val());
          dummy.innerHTML = dummy.innerHTML.replace("$Art2$", snapshot.child(zaehler).child("art").val());
          dummy.innerHTML = dummy.innerHTML.replace("$Rasse2$", snapshot.child(zaehler).child("rasse").val());
          dummy.innerHTML = dummy.innerHTML.replace("$Wohnort2$", snapshot.child(zaehler).child("wohnort").val());
          dummy.innerHTML = dummy.innerHTML.replace("$Email2$", snapshot.child(zaehler).child("email").val());
          dummy.innerHTML = dummy.innerHTML.replace("$vom2$", snapshot.child(zaehler).child("zeitraum").child("Von").val());
          dummy.innerHTML = dummy.innerHTML.replace("$bis2$", snapshot.child(zaehler).child("zeitraum").child("Bis").val());
          dummy.innerHTML = dummy.innerHTML.replace("$kommentar2$", snapshot.child(zaehler).child("kommentar").val());
          dummy.innerHTML = dummy.innerHTML.replace("$ID2$", snapshot.child(zaehler).child("ID").val());
          zahl2 = zaehler;
          ergebnisse++;
          zaehler++;
          break;
        }
        else if(zaehler == zahl){
          keinzweitereintrag=true;
          zaehler++;
        }
         else {
          zaehler++;
        }
      }
      if (hinzugefuegt == true) {
        let noentry =document.getElementById("gefiltert");
        noentry.appendChild(dummy);

        document.getElementById("eintrag1").id = snapshot.child(zahl1).child("ID").val() + "entry";
        document.getElementById("name1").id = snapshot.child(zahl1).child("ID").val() + "name";
        document.getElementById("art1").id = snapshot.child(zahl1).child("ID").val() + "art";
        document.getElementById("rasse1").id = snapshot.child(zahl1).child("ID").val() + "rasse";
        document.getElementById("wohnort1").id = snapshot.child(zahl1).child("ID").val() + "wohnort";
        document.getElementById("email1").id = snapshot.child(zahl1).child("ID").val() + "email";
        document.getElementById("zeitraum1").id = snapshot.child(zahl1).child("ID").val() + "zeitraum";
        document.getElementById("kommentar1").id = snapshot.child(zahl1).child("ID").val() + "kommentar";
        document.getElementById("loesch1").id = snapshot.child(zahl1).child("ID").val();

        if(keinzweitereintrag== false){
          document.getElementById("eintrag2").id = snapshot.child(zahl2).child("ID").val() + "entry";
          document.getElementById("name2").id = snapshot.child(zahl2).child("ID").val() + "name";
          document.getElementById("art2").id = snapshot.child(zahl2).child("ID").val() + "art";
          document.getElementById("rasse2").id = snapshot.child(zahl2).child("ID").val() + "rasse";
          document.getElementById("wohnort2").id = snapshot.child(zahl2).child("ID").val() + "wohnort";
          document.getElementById("email2").id = snapshot.child(zahl2).child("ID").val() + "email";
          document.getElementById("zeitraum2").id = snapshot.child(zahl2).child("ID").val() + "zeitraum";
          document.getElementById("kommentar2").id = snapshot.child(zahl2).child("ID").val() + "kommentar";
          document.getElementById("loesch2").id = snapshot.child(zahl2).child("ID").val();
        }
        if(keinzweitereintrag==true){
          document.getElementById("eintrag2").style.display = "none";
        }





      }

    }
    suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("$Zahl$", ergebnisse);
    suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace(/[0-9]+/, ergebnisse);
    if(ergebnisse==1){
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("wurden", "wurde");
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("Ergebnisse", "Ergebnis");
    }else{
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("wurde ", "wurden ");
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("Ergebnis ", "Ergebnisse ");
    }
  }


  zuruecksetzen.addEventListener("click", function() {
    document.location.reload(true);
  });



});
