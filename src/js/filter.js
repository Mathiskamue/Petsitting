window.addEventListener("load", function() {
  //Buttons
  let filtern = document.getElementById("filtern");
  let zuruecksetzen = document.getElementById("zuruecksetzen")


  let eintrag = document.getElementById("eintrag");
  let filteransicht = document.getElementById("filteransicht");

  //Templates
  let tentry = document.getElementById("tentry").innerHTML;

  //Filterwerkzeuge
  //Checkboxen
  let hund = document.getElementById("hund");
  let katze = document.getElementById("katze");
  let vogel = document.getElementById("vogel");
  let hase = document.getElementById("hase");
  let schildkroete = document.getElementById("schildkroete");
  let sonstiges = document.getElementById("sonstiges");
  //Datumfeld
  let datumsuche = document.getElementById("datumsuche");
  //Ortfeld
  let ortsuche = document.getElementById("ortsuche");

  //suchergebnisse
  let suchergebnisse = document.getElementById("suchergebnisse");

  //auf normale Seitenansicht zurücksetzen
  zuruecksetzen.addEventListener("click", function() {
    document.location.reload(true);
  });


  filtern.addEventListener("click", async function() {
    //1.Schritt: Schauen, wo etwas eingetragen wurde bei Filter und dies vermerken
    //Datum und Ort in einem Boolean
    //Verschiedene Tierarten in einem Array abspeichern, da man auch 2 oder mehr Tierarten auf einmal auswählen kann
    eintrag.style.display = "none";
    filteransicht.style.display = "block";
    document.getElementById("gefiltert").innerHTML = "";
    let ort = false;
    let datum = false;
    let tiere = [];
    //Wenn Checkbox ausgewählt, dann wird die Tierart hinzugefügt zum Array
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
    //Mit dieser Funktion werden die gefundenen Ergebnisse herausgesucht und angezeigt
    //es werden das tiere[], ort und datum der Funktion addElement übergeben
    await addElement(tiere, ort, datum);
    
  });

  async function addElement(tiere, ort, datum) {
    //2.Schritt: Je nachdem, was ausgewählt wurde kommt man in unterschiedliche Funktionen, um alles abzudecken
    if (tiere.length != 0) {
      //Wenn in dem Tier[] etwas vorhanden ist, kommt man hier hinein --> Der User hat eine oder mehr Checkboxen ausgewählt
      let ergebnisse = 0;
      for (let i = 0; i < tiere.length; i++) {
        //Hier übergibt man immer einen Wert aus dem Array, um genau mit einer Tierart alle Suchergebnisse zu finden, als return-Wert bekommt man, wie viele Ergebnisse man in diesem Zyklus bekommen hat
        ergebnisse += await finden(tiere[i], ort, datum);
      }
      suchergebnis(ergebnisse);
    } else if (ort == true) {
      //Der User hat keine Checkbox ausgewählt, aber mindestens Ort, vielleicht auch ein Datum
      findenOrtDatum(ort, datum);

    } else if (datum == true) {
      //der User hat nur ein Datum ausgewählt
      findenDatum();
    }
    //Wenn der User nichts ausgewählt hat, steht dort lediglich, dass 0 Ergebnisse gefunden wurden
  }


  async function finden(tier, ort, datum) {
    //Variable, in der ERgebniss-Anzahl gespeichert wird
    let ergebnisse = 0;
    //Wenn das tier nicht Sonstiges entspricht, kommt man in diese Abfragen
    if (tier != "Sonstiges") {
      //Wenn außerdem noch zu der Tierart ein Datum und ein Ort angegeben sind kommt man in diese Abfrage

      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //GRUNDLEGEND IST DER AUFBAU IN DER IF-ABFRAGE IMMER GLEICH! DESHALB WERDE ICH ES BEISPIELHAFT AN DIESEM FALL ERKLÄREN
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      if (datum == true && ort == true) {
        //variable für Datenbankreferenz
        let ref = firebase.database().ref("eintrag");
        //auf Datenbank zugreifen
        let snapshot = await ref.once("value");
        //Herausfinden, wie viele Elemente es gibt, abgespeichert in der Datenbank in highest
        let zahl = snapshot.child("highest").val();
        //variable Zaehler erstellen, mit der man durch die gesamte Datenbank durchgeht
        let zaehler = 1;
        //Äußere Schleife, da man das gesamte Element später an einen Container mit Bootstrap anhängt und 2 Elemente in einer Reihe stehen
        while (zaehler <= zahl) {
          //einen dummy erstellen vom typ div
          let dummy = document.createElement("div");
          //dem Inneren des Dummys das Template eines Eintrags geben
          dummy.innerHTML = tentry;
          //Zahl 1 Variable erstellen, in der später abgespeichert wird, der wievielte Eintrag es ist, um danach noch die ID ändern zu können
          let zahl1;
          //Zahl 2 Variable erstellen, in der später abgespeichert wird, der wievielte Eintrag es ist, um danach noch die ID ändern zu können
          let zahl2;
          //Wenn es keinen zweiten Eintrag in einer Zeile geben sollte, muss das erstellte Template Element unsichtbar gemacht werden
          //Hierzu wird diese Variable erstellt
          let keinzweitereintrag = false;
          //Hinzugefügt gibt an, ob es ein Ergebnis gibt
          let hinzugefuegt = false;
          //Innere While-Schleife für das Herausfinden, ob es für den ersten Eintrag ein Ergebnis gibt
          while (zaehler <= zahl) {
            //Einzige sich ändernde Bedingung innerhalb aller Funktionen
            //Hier wird überprüft ob das in der Datenbank gefundene Element die gleiche Art hat wie ausgewählt und es gleichzeitig den gleichen angegebenen Wohnort besitzt und außerdem das angegebene Datum entweder dem angegeben Von oder Bis Eintrag entspricht
            if (snapshot.child(zaehler).child("art").val() == tier && snapshot.child(zaehler).child("wohnort").val() == ortsuche.value && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {
              //Wenn dem der Fall wäre, dann ruft man eine Funktion namens eintrag1 auf, unten ist diese Auskommentiert
              eintrag1(zaehler, dummy);
              //zahl1 wird gleich dem Zähler gesetzt
              zahl1 = zaehler;
              //Es wird angezeigt dass mindestens ein Element gefunden wurde bisher, indem hinzugefuegt auf true gesetzt wurde
              hinzugefuegt = true;
              //das ergebnis wird eins Aufgerechnet
              ergebnisse++;
              //Man springt aus der inneren while Schleife raus, da man nun das Ergebnis gefunden hat
              break;
            } else {
              //wenn die If Bedingung oben nicht erfüllt ist, wird einfach der Zähler hochgezählt und das nächste Element wird verglichen
              zaehler++;
            }
          }
          //Erste While schleife ist abgeschlossen und entweder wurde kein Ergebnis gefunden und man ist schon am Ende der Einträge angekommen oder man kann noch für einen zweiten Eintrag prüfen
          //Um nicht gleich wieder den gleichen Eintrag zu bekommen wird der Zaehler um 1 hochgezählt
          zaehler++;
          //Zweite While Schleife für den zweiten Eintrag
          while (zaehler <= zahl) {
            //Wieder wird die gleiche Bedingung wie oben geprüft
            if (snapshot.child(zaehler).child("art").val() == tier && snapshot.child(zaehler).child("wohnort").val() == ortsuche.value && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {
              //Wenn ein Eintrag gefunden wurde, der die Kriterien erfüllt, dann kommt man wieder hier hinein
              //Dieses Mal wechselt man in Funktion Eintrag2, die Eintrag1 nahezu identisch ist
              eintrag2(zaehler, dummy);
              //zahl2 wird gleich dem Zähler gesetzt
              zahl2 = zaehler;
              //Ergebnis wird aufgerechnet
              ergebnisse++;
              //Zaehler wird aufgerechnet
              zaehler++;
              //wieder springt man aus der inneren Schleife raus
              break;
            }
            //Wenn das Ende erreicht ist und die obere Bedingung nicht zutrifft, man aber beim letzten Ergebnis angekommen ist,
            //wird der keinzweitereintrag auf true gesetzt, da es keinen zweiten Eintrag in dieser Zeile gibt
            else if (zaehler == zahl) {
              keinzweitereintrag = true;
              zaehler++;
            } else {
              //wenn noch nicht das Ende erreicht wurde, dieser Eintrag aber nicht oben in If beschriebenen Kriterien entspricht wird der Zaehler wieder um 1 erhöht
              zaehler++;
            }
          }
          //Ende des Durchgehens durch die Datenbank
          //Nun wird geprüft, ob es 1 oder 2 Ergebnisse gibt
          if (hinzugefuegt == true) {
            //hier werden mehrere Paramter übergeben, um die Funktion die gefunden Einträge anzeigen zu lassen
            idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
          }
        }
      }
      //Wenn nur ein Datum dazu angegeben ist, kommt man in diese Abfrage
      else if (datum == true) {
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
            if (snapshot.child(zaehler).child("art").val() == tier && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {
              eintrag1(zaehler, dummy);
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
            if (snapshot.child(zaehler).child("art").val() == tier && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {
              eintrag2(zaehler, dummy);
              zahl2 = zaehler;
              ergebnisse++;
              zaehler++;
              break;
            } else if (zaehler == zahl) {
              keinzweitereintrag = true;
              zaehler++;
            } else {
              zaehler++;
            }
          }
          if (hinzugefuegt == true) {
            idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
          }
        }
      }
      //Wenn nur ein Ort dazu angegeben ist, kommt man in diese Abfrage
      else if (ort == true) {
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
            if (snapshot.child(zaehler).child("art").val() == tier && snapshot.child(zaehler).child("wohnort").val() == ortsuche.value) {
              eintrag1(zaehler, dummy);
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
            if (snapshot.child(zaehler).child("art").val() == tier && snapshot.child(zaehler).child("wohnort").val() == ortsuche.value) {
              eintrag2(zaehler, dummy);
              zahl2 = zaehler;
              ergebnisse++;
              zaehler++;
              break;
            } else if (zaehler == zahl) {
              keinzweitereintrag = true;
              zaehler++;
            } else {
              zaehler++;
            }
          }
          if (hinzugefuegt == true) {
            idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
          }
        }
      }
      //Wenn weder Ort, noch Datum angegeben sind und nur eine Tier-Checkbox ausgewählt wurde, kommt man in diese Abfrage
      else {
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
            if (snapshot.child(zaehler).child("art").val() == tier) {
              eintrag1(zaehler, dummy);
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
            if (snapshot.child(zaehler).child("art").val() == tier) {
              eintrag2(zaehler, dummy);
              zahl2 = zaehler;
              ergebnisse++;
              zaehler++;
              break;
            } else if (zaehler == zahl) {
              keinzweitereintrag = true;
              zaehler++;
            } else {
              zaehler++;
            }
          }
          if (hinzugefuegt == true) {
            idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
          }
        }
      }

    }
    //Wenn das Tier=sonstiges, dann kommt man in diese Schleife, da man eine etwas andere Abfrage machen muss
    else {
      //Wenn außerdem noch zu Sonstiges ein Datum und ein Ort angegeben sind kommt man in diese Abfrage
      if (datum == true && ort == true) {
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
            if (snapshot.child(zaehler).child("art").val() != "Hund" && snapshot.child(zaehler).child("art").val() != "Katze" && snapshot.child(zaehler).child("art").val() != "Vogel" && snapshot.child(zaehler).child("art").val() != "Hase" && snapshot.child(zaehler).child("art").val() != "Schildkröte" && snapshot.child(zaehler).child("wohnort").val() == ortsuche.value && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {
              eintrag1(zaehler, dummy);
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
            if (snapshot.child(zaehler).child("art").val() != "Hund" && snapshot.child(zaehler).child("art").val() != "Katze" && snapshot.child(zaehler).child("art").val() != "Vogel" && snapshot.child(zaehler).child("art").val() != "Hase" && snapshot.child(zaehler).child("art").val() != "Schildkröte" && snapshot.child(zaehler).child("wohnort").val() == ortsuche.value && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {
              eintrag2(zaehler, dummy);
              zahl2 = zaehler;
              ergebnisse++;
              zaehler++;
              break;
            } else if (zaehler == zahl) {
              keinzweitereintrag = true;
              zaehler++;
            } else {
              zaehler++;
            }
          }
          if (hinzugefuegt == true) {
            idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
          }
        }
      }
      //Wenn nur ein Datum dazu angegeben ist, kommt man in diese Abfrage
      else if (datum == true) {
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
            if (snapshot.child(zaehler).child("art").val() != "Hund" && snapshot.child(zaehler).child("art").val() != "Katze" && snapshot.child(zaehler).child("art").val() != "Vogel" && snapshot.child(zaehler).child("art").val() != "Hase" && snapshot.child(zaehler).child("art").val() != "Schildkröte" && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {
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
            if (snapshot.child(zaehler).child("art").val() != "Hund" && snapshot.child(zaehler).child("art").val() != "Katze" && snapshot.child(zaehler).child("art").val() != "Vogel" && snapshot.child(zaehler).child("art").val() != "Hase" && snapshot.child(zaehler).child("art").val() != "Schildkröte" && (snapshot.child(zaehler).child("zeitraum").child("Von").val() == datumsuche.value || snapshot.child(zaehler).child("zeitraum").child("Bis").val() == datumsuche.value)) {

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
            } else if (zaehler == zahl) {
              keinzweitereintrag = true;
              zaehler++;
            } else {
              zaehler++;
            }
          }
          if (hinzugefuegt == true) {
            idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
          }
        }
      }
      //Wenn nur ein Ort dazu angegeben ist, kommt man in diese Abfrage
      else if (ort == true) {
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
            if (snapshot.child(zaehler).child("art").val() != "Hund" && snapshot.child(zaehler).child("art").val() != "Katze" && snapshot.child(zaehler).child("art").val() != "Vogel" && snapshot.child(zaehler).child("art").val() != "Hase" && snapshot.child(zaehler).child("art").val() != "Schildkröte" && snapshot.child(zaehler).child("wohnort").val() == ortsuche.value) {
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
            if (snapshot.child(zaehler).child("art").val() != "Hund" && snapshot.child(zaehler).child("art").val() != "Katze" && snapshot.child(zaehler).child("art").val() != "Vogel" && snapshot.child(zaehler).child("art").val() != "Hase" && snapshot.child(zaehler).child("art").val() != "Schildkröte" && snapshot.child(zaehler).child("wohnort").val() == ortsuche.value) {

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
            } else if (zaehler == zahl) {
              keinzweitereintrag = true;
              zaehler++;
            } else {
              zaehler++;
            }
          }
          if (hinzugefuegt == true) {
          idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
          }
        }
      }
      //Wenn weder Ort, noch Datum angegeben sind und nur Sonstiges ausgewählt wurde, kommt man in diese Abfrage
      else {
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
            if (snapshot.child(zaehler).child("art").val() != "Hund" && snapshot.child(zaehler).child("art").val() != "Katze" && snapshot.child(zaehler).child("art").val() != "Vogel" && snapshot.child(zaehler).child("art").val() != "Hase" && snapshot.child(zaehler).child("art").val() != "Schildkröte") {
              eintrag1(zaehler, dummy);
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
            if (snapshot.child(zaehler).child("art").val() != "Hund" && snapshot.child(zaehler).child("art").val() != "Katze" && snapshot.child(zaehler).child("art").val() != "Vogel" && snapshot.child(zaehler).child("art").val() != "Hase" && snapshot.child(zaehler).child("art").val() != "Schildkröte") {
              eintrag2(zaehler, dummy);
              zahl2 = zaehler;
              ergebnisse++;
              zaehler++;
              break;
            } else if (zaehler == zahl) {
              keinzweitereintrag = true;
              zaehler++;
            } else {
              zaehler++;
            }
          }
          if (hinzugefuegt == true) {
            idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
          }
        }
      }

    }
    //die Anzahl der Ergebnisse in diesem Zyklus wird zurückgegeben
    return ergebnisse;
  }
  async function findenOrtDatum(ort, datum) {
    let ergebnisse = 0;
    //Wenn zu dem Ort zudem noch ein Datum übergeben wird, kommt man in diese Abfrage
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
            eintrag1(zaehler, dummy);
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
            eintrag2(zaehler, dummy);
            zahl2 = zaehler;
            ergebnisse++;
            zaehler++;
            break;
          } else if (zaehler == zahl) {
            keinzweitereintrag = true;
            zaehler++;
          } else {
            zaehler++;
          }
        }
        if (hinzugefuegt == true) {
          idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
        }
      }
    }
    //Wenn nur ein Ort übergeben wird, kommt man in diese Abfrage
    else {
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
            eintrag1(zaehler, dummy);
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
            eintrag2(zaehler, dummy);
            zahl2 = zaehler;
            ergebnisse++;
            zaehler++;
            break;
          } else if (zaehler == zahl) {
            keinzweitereintrag = true;
            zaehler++;
          } else {
            zaehler++;
          }
        }
        if (hinzugefuegt == true) {
          idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
        }
      }
    }
    suchergebnis(ergebnisse);
  }
  async function findenDatum() {
    //Wenn nur ein Datum angegeben ist
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
          eintrag1(zaehler, dummy);
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
          eintrag2(zaehler, dummy);
          zahl2 = zaehler;
          ergebnisse++;
          zaehler++;
          break;
        } else if (zaehler == zahl) {
          keinzweitereintrag = true;
          zaehler++;
        } else {
          zaehler++;
        }
      }
      if (hinzugefuegt == true) {
        idchanger(keinzweitereintrag, dummy, zahl1, zahl2);
      }

    }
    suchergebnis(ergebnisse);
  }


  async function eintrag1(zaehler, dummy) {
    //speichert im dummy die Einträge aus der Datenbank für den ersten von den zwei Einträgen ab
    let ref = firebase.database().ref("eintrag");
    //Datenbankreferenz aufbauen
    let snapshot = await ref.once("value");
    //Werte auslesen und ersetzen der Dummy-Werte
    dummy.innerHTML = dummy.innerHTML.replace("$Name1$", snapshot.child(zaehler).child("name").val());
    dummy.innerHTML = dummy.innerHTML.replace("$Art1$", snapshot.child(zaehler).child("art").val());
    dummy.innerHTML = dummy.innerHTML.replace("$Rasse1$", snapshot.child(zaehler).child("rasse").val());
    dummy.innerHTML = dummy.innerHTML.replace("$Wohnort1$", snapshot.child(zaehler).child("wohnort").val());
    dummy.innerHTML = dummy.innerHTML.replace("$Email1$", snapshot.child(zaehler).child("email").val());
    dummy.innerHTML = dummy.innerHTML.replace("$vom1$", snapshot.child(zaehler).child("zeitraum").child("Von").val());
    dummy.innerHTML = dummy.innerHTML.replace("$bis1$", snapshot.child(zaehler).child("zeitraum").child("Bis").val());
    dummy.innerHTML = dummy.innerHTML.replace("$kommentar1$", snapshot.child(zaehler).child("kommentar").val());
    dummy.innerHTML = dummy.innerHTML.replace("$ID1$", snapshot.child(zaehler).child("ID").val());
  }
  async function eintrag2(zaehler, dummy) {
    //genau wie bei eintrag2, nur dieses Mal ersetzen des zweiten Eintrags der Dummy-Werte mit den Datenbank-Werten
    let ref = firebase.database().ref("eintrag");
    let snapshot = await ref.once("value");
    dummy.innerHTML = dummy.innerHTML.replace("$Name2$", snapshot.child(zaehler).child("name").val());
    dummy.innerHTML = dummy.innerHTML.replace("$Art2$", snapshot.child(zaehler).child("art").val());
    dummy.innerHTML = dummy.innerHTML.replace("$Rasse2$", snapshot.child(zaehler).child("rasse").val());
    dummy.innerHTML = dummy.innerHTML.replace("$Wohnort2$", snapshot.child(zaehler).child("wohnort").val());
    dummy.innerHTML = dummy.innerHTML.replace("$Email2$", snapshot.child(zaehler).child("email").val());
    dummy.innerHTML = dummy.innerHTML.replace("$vom2$", snapshot.child(zaehler).child("zeitraum").child("Von").val());
    dummy.innerHTML = dummy.innerHTML.replace("$bis2$", snapshot.child(zaehler).child("zeitraum").child("Bis").val());
    dummy.innerHTML = dummy.innerHTML.replace("$kommentar2$", snapshot.child(zaehler).child("kommentar").val());
    dummy.innerHTML = dummy.innerHTML.replace("$ID2$", snapshot.child(zaehler).child("ID").val());
  }
  async function idchanger(keinzweitereintrag, dummy, zahl1, zahl2) {
    //Datenbankreferenz aufbauen
    let ref = firebase.database().ref("eintrag");
    let snapshot = await ref.once("value");
    //an die richtige Stelle im HTMl den dummy anhängen mit den veränderten Werten
    let noentry = document.getElementById("gefiltert");
    noentry.appendChild(dummy);
    //IDs der einzelnen Werte ändern, damit jedes Element eine eigene eindeutige ID bekommt, die sich aus der ID des Eintrags und einen Zusatzwort zusammensetzt
    //Wird nicht wirklich gebraucht, aber wenn man vielleicht dieses Programm noch erweitern will, ist es eine nützliche und hilfreiche Absicherung
    //Außerdem wird damit gewährleistet dass nicht doppelte IDs vorkommen
    document.getElementById("eintrag1").id = snapshot.child(zahl1).child("ID").val() + "entry";
    document.getElementById("name1").id = snapshot.child(zahl1).child("ID").val() + "name";
    document.getElementById("art1").id = snapshot.child(zahl1).child("ID").val() + "art";
    document.getElementById("rasse1").id = snapshot.child(zahl1).child("ID").val() + "rasse";
    document.getElementById("wohnort1").id = snapshot.child(zahl1).child("ID").val() + "wohnort";
    document.getElementById("email1").id = snapshot.child(zahl1).child("ID").val() + "email";
    document.getElementById("zeitraum1").id = snapshot.child(zahl1).child("ID").val() + "zeitraum";
    document.getElementById("kommentar1").id = snapshot.child(zahl1).child("ID").val() + "kommentar";
    document.getElementById("loesch1").id = snapshot.child(zahl1).child("ID").val();
    //Wenn es einen zweiten Eintrag gibt, auch hier die IDs der Werte ändern
    if (keinzweitereintrag == false) {
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
    //Wenn es keinen zweiten Eintrag gibt, dann bekommt das Element die zusätzliche Klasse leer angehängt
    //in pets.css:
    //.leer{
    //  display: none;
    // }
    //damit kein Template angezeigt wird
    if (keinzweitereintrag==true) {
      document.getElementById("eintrag2").classList.add("leer");
      document.getElementById("eintrag2").id = "";
    }
  }
  function suchergebnis(ergebnisse) {
    //Damit die Anzahl der Suchergebnisse dargestellt wird auf der Website
    //Zugriff auf "Es wurden "Zahl" Ergebnisse gefunden"
    //Zahl wird ersetzt durch die neue Zahl, wie viele Ergebnisse gefunden wurden
    suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace(/[0-9]+/, ergebnisse);
    if (ergebnisse == 1) {
      //Damit es korrektes Deutsch ist, wird hier aus wurden wurde und aus Ergebnisse Ergebnis
      //"Es wurde 1 Ergebnis gefunden"
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("wurden", "wurde");
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("Ergebnisse", "Ergebnis");
    } else {
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("wurde ", "wurden ");
      suchergebnisse.innerHTML = suchergebnisse.innerHTML.replace("Ergebnis ", "Ergebnisse ");
    }
  }


});
