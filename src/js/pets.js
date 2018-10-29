window.addEventListener("load", function() {
    //MODAL
    let close = document.getElementById("close");
    let hmodal = document.getElementById("hmodal");
    let hinzu = document.getElementById("hinzu");

    //Template
    let tentry = document.getElementById("tentry").innerHTML;
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

    let tester = document.getElementById("tester");
    tester.addEventListener("click",function(){
        let ref = firebase.database().ref("eintrag");
        ref.once("value")
            .then(function(snapshot) {
                let zahl = snapshot.child("highest").val();
                for(let i = 1; i<zahl;i++){
                    let dummy = document.createElement("div");
                    dummy.innerHTML = tentry;
                    dummy.innerHTML = dummy.innerHTML.replace("$Name1$",snapshot.child(i).child("name").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$Art1$",snapshot.child(i).child("art").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$Rasse1$",snapshot.child(i).child("rasse").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$Wohnort1$",snapshot.child(i).child("wohnort").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$Email1$", snapshot.child(i).child("email").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$vom1$", snapshot.child(i).child("zeitraum").child("Von").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$bis1$", snapshot.child(i).child("zeitraum").child("Bis").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$kommentar1$", snapshot.child(i).child("kommentar").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$ID1$", snapshot.child(i).child("ID").val());

                    dummy.innerHTML = dummy.innerHTML.replace("$Name2$",snapshot.child(i+1).child("name").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$Art2$",snapshot.child(i+1).child("art").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$Rasse2$",snapshot.child(i+1).child("rasse").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$Wohnort2$",snapshot.child(i+1).child("wohnort").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$Email2$", snapshot.child(i+1).child("email").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$vom2$", snapshot.child(i+1).child("zeitraum").child("Von").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$bis2$", snapshot.child(i+1).child("zeitraum").child("Bis").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$kommentar2$", snapshot.child(i+1).child("kommentar").val());
                    dummy.innerHTML = dummy.innerHTML.replace("$ID2$", snapshot.child(i+1).child("ID").val());

                    document.getElementById("eintrag").appendChild(dummy);

                    i++;
                }


           });



        //let dummy = document.createElement("div");
        //dummy.innerHTML = tentry;
        //dummy.innerHTML = dummy.innerHTML.replace("$Name1$", "Überschrift");
        //document.getElementById("eintrag").appendChild(dummy);

    });


    //OPEN-CLOSE-MODAL
    hinzu.addEventListener("click", function () {
        hmodal.style.display = "block";
    });


    close.addEventListener("click", function () {
        hmodal.style.display = "none";
    });

    window.addEventListener("click", function() {
        if (event.target == hmodal) {
            hmodal.style.display = "none";
        }
    });


    //in Datenbank übergeben
    submitBtn.addEventListener("click", function() {
        name.style.border = '1px solid #BEBEBE';
        art.style.border = '1px solid #BEBEBE';
        wohn.style.border = '1px solid #BEBEBE';
        vom.style.border = '1px solid #BEBEBE';
        bis.style.border = '1px solid #BEBEBE';
        password.style.border = '1px solid #BEBEBE';
        email.style.border = '1px solid #BEBEBE';

        let fehler = 0;
        if(name.value==""){
            name.style.border = '1px solid red';
            fehler += 1;
        }
        if(art.value==""){
            art.style.border = '1px solid red';
            fehler += 1;
        }
        if(wohn.value==""){
            wohn.style.border = '1px solid red';
            fehler += 1;
        }
        if(vom.value==""){
            vom.style.border = '1px solid red';
            fehler += 1;
        }
        if(bis.value==""){
            bis.style.border = '1px solid red';
            fehler += 1;
        }
        if(password.value==""){
            password.style.border = '1px solid red';
            fehler += 1;
        }
        if(email.value==""){
            email.style.border = '1px solid red';
            fehler += 1;
        }
        if(fehler==0){
            let ref = firebase.database().ref("eintrag");
            ref.once("value")
               .then(function(snapshot) {
                   let zahl = snapshot.child("highest").val();
                   zahl += 1;
                   let heute = new Date();
                   let id = heute.getDate() + "" +  heute.getMonth() + heute.getFullYear() + heute.getHours() + heute.getMinutes() + heute.getTime();
                   ref.child(zahl).set({
                       ID: id,
                       name: name.value,
                       art: art.value,
                       rasse: rasse.value,
                       wohnort: wohn.value,
                       email: email.value,
                       passwort: password.value,
                       kommentar: comment.value,
                       zeitraum:{
                           Von: vom.value,
                           Bis: bis.value,
                       },
                    });
                    ref.child("highest").set(zahl);
               });
               hmodal.style.display = "none";

        }
        else {
            alert('Bitte füllen Sie alle Pflichtfelder aus!');
        }
    });
});
