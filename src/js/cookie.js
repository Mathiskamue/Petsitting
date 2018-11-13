window.addEventListener("load", function() {


let vfooter = document.getElementById(fusszeile);
let apDiv = document.createElement("div");
let apH1 = document.createElement("h1");
let apP   = document.createElement("p");

let apBut = document.createElement("button");

    apBut.setAttribute('id','center');

    let apHead = document.createTextNode("Diese Webseite verwendet Cookies");
    let apMain = document.createTextNode("Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website zu analysieren. Außerdem geben wir Informationen zu Ihrer Verwendung unserer Website an unsere Partner für soziale Medien, Werbung und Analysen weiter. Unsere Partner führen diese Informationen möglicherweise mit weiteren Daten zusammen, die Sie ihnen bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung der Dienste gesammelt haben. Sie geben Einwilligung zu unseren Cookies, wenn Sie unsere Webseite weiterhin nutzen.");

    apDiv.style.backgroundColor = "red";
    apDiv.style.border="thick solid black";
    apDiv.style.textAlign="center";
    // apDiv.style.position="fixed";
    apBut.style.cursor="pointer";

    document.body.appendChild(apDiv);
    apDiv.appendChild(apH1);
    apH1.appendChild(apHead);
    apDiv.appendChild(apMain);
    apDiv.appendChild(apP);
    apP.appendChild(apBut);


    window.akt;
    document.getElementById("center").addEventListener("click",()=>{
    akt = true;

    if (akt === true){
        document.body.removeChild(apDiv);
    }
    console.log(akt);
    });

});
