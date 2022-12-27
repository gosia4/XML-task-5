let xmlDoc;

document.getElementById("btnLoad").onclick = function () {
    var path = document.getElementById("fileName");
    xmlDoc = loadXMLDoc(path);

}



function loadXMLDoc(path) {
    var xhr = new XMLHttpRequest();

    let url = URL.createObjectURL(path.files[0]);

    xhr.open('GET', url, true);

    xhr.timeout = 2000; // time in milliseconds
    xhr.onload = function () {
        // Request finished. Do processing here.

        var i;
        xmlDoc = this.responseXML;
        var table =
        `<tr><th>id</th><th>Date of birth</th><th>firstName</th><th>Surname</th>
        <th>Nationality</th><th>Lifespan</th></tr>`;
        var x = xmlDoc.getElementsByTagName("composer");
        /* var piece = xmlDoc.getElementsByTagName("piece");
        var piecetable = `<tr><th>nr</th><th>Title</th><th>Tonation</th><th>Level</th>
        <th>Instruments</th><th>PublisherNo</th><th>Price</th></tr>`;
         */

        // Start to fetch the data by using TagName
        for (i = 0; i < x.length; i++) {
            table += "<tr><td>" +
                x[i].getAttribute("id") + "</td><td>" +
                x[i].getAttribute("born") + "</td><td>" +
                x[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("surname")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("lifespan")[0].childNodes[0].nodeValue + "</td><td>" /* +
                x[i].getElementsByTagName("name")[0]
                .childNodes[0].childNodes[0].nodeValue + "</td><td>" */;
               
                /* for (j = 0; j < piece.length; j++){
                    piecetable+= "<tr><td>" +
                    piece[i].getAttribute("nr") + "</td><td>" +
                    piece[i].getElementsByTagName("name")[0]
                    .childNodes[0].nodeValue + "</td><td>" +
                    piece[i].getElementsByTagName("tonation")[0]
                    .childNodes[0].nodeValue + "</td><td>" +
                    piece[i].getElementsByTagName("level")[0]
                    .childNodes[0].nodeValue + "</td><td>" +
                    piece[i].getElementsByTagName("instruments")[0]
                    .childNodes[0].nodeValue + "</td><td>";
                } */
        }
        document.getElementById("fileContent").innerHTML = table;

    };

    xhr.ontimeout = function (e) {
        // XMLHttpRequest timed out. Do something here. Or not :)
    };

    xhr.send(null);
    return xmlDoc;


}

function zapisz() {
    //Serialize
    const serializer = new XMLSerializer();
    var toSave = serializer.serializeToString(xmlDoc);

    //Utwórz nowy plik
    const blob = new Blob([toSave], { type: "text/xml" });
    const url = URL.createObjectURL(blob);

    //Utwórz i kliknij fałszywy tymczasowy link
    const fakeLink = document.createElement("a");
    fakeLink.href = url;
    fakeLink.download = 'zmieniony.xml';
    fakeLink.click();
}
function updateXML() {
    var i;
    var table =
        `<tr><th>id</th><th>Date of birth</th><th>firstName</th><th>Surname</th>
        <th>Nationality</th><th>Lifespan</th></tr>`;
    var x = xmlDoc.getElementsByTagName("composer");
   /*  var piece = xmlDoc.getElementsByTagName("piece");
        var piecetable = `<tr><th>nr</th><th>Title</th><th>Tonation</th><th>Level</th>
        <th>Instruments</th><th>PublisherNo</th><th>Price</th></tr>`;
      */   
    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            x[i].getAttribute("id") + "</td><td>" +
            x[i].getAttribute("born") + "</td><td>" +
            x[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("surname")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("lifespan")[0].childNodes[0].nodeValue + "</td><td>";
                /* for (j = 0; j < piece.length; j++){
                    piecetable+= "<tr><td>" +
                    piece[i].getAttribute("nr") + "</td><td>" +
                    piece[i].getElementsByTagName("name")[0]
                    .childNodes[0].nodeValue + "</td><td>" +
                    piece[i].getElementsByTagName("tonation")[0]
                    .childNodes[0].nodeValue + "</td><td>" +
                    piece[i].getElementsByTagName("level")[0]
                    .childNodes[0].nodeValue + "</td><td>" +
                    piece[i].getElementsByTagName("instruments")[0]
                    .childNodes[0].nodeValue + "</td><td>";

                } */
    }
    document.getElementById("aTrescPliku").innerHTML = table;
}
function deleteXML(position){
    var x = xmlDoc.getElementsByTagName("composer")[position];
    x.parentNode.removeChild(x);
    updateXML();
}
function dodajXML(){

    oldNode=xmlDoc.getElementsByTagName('composer')[0];
    var count = xmlDoc.getElementsByTagName("composer").length;
    newNode=oldNode.cloneNode(true);
    var x = xmlDoc.getElementsByTagName("composer");

    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        if (parseInt(x[i].getAttribute("id")) === count)
            count++;
    }

    newNode.setAttribute("id", count);
    xmlDoc.documentElement.getElementsByTagName("composers")[0].appendChild(newNode);

}
function zmien(){


}
function idCheck(id){
    var x = xmlDoc.getElementsByTagName("composer");
    var result = true;
    // Start to fetch the data by using TagName
    for (var i = 0; i < x.length; i++) {
        if(x[i].getAttribute("id") === id)
            result = false;
    }
    return result;
}
function check(nazwaAtrybutu, porownywany) {
    var x = xmlDoc.getElementsByTagName("composer");
    for (i = 0; i < x.length; i++) {
            if(x[i].getAttribute(nazwaAtrybutu) === porownywany) {
                alert("Najpierw usuń dany atrybut z rekordów tabeli by usunąć tę kategorię ogólną.")
                return false;
            }
    }
    return true;
}

function checkElement(nazwaElementu, porownywany) {

    var x = xmlDoc.getElementsByTagName("composer");
    for (i = 0; i < x.length; i++) {
        if(x[i].getElementsByTagName(nazwaElementu)[0].childNodes[0].nodeValue === porownywany) {
            alert("Najpierw usuń dany element z rekordów tabeli by usunąć tę kategorię ogólną.")
            return false;
        }
    }
    return true;
}
