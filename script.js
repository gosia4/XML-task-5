let xmlDoc;

document.getElementById("btnLoad").onclick = function () {
    var path = document.getElementById("fileName");
    xmlDoc = loadXMLDoc(path);

}


document.getElementById("btnSave").onclick = function () {
    save();
}
document.getElementById("btnZaaktualizuj").onclick = function () {
    var val = document.getElementById("iRekordGryUpdate").value;
    if(idCheck(document.getElementById("iId").value)) {
        if(!(document.getElementById("iId").value === null || document.getElementById("iId").value === "" )){
        xmlDoc.getElementsByTagName("gra")[val].setAttribute("ID", document.getElementById("gra").value);
		}
        var select = document.getElementById('iGatunek');
        var value = select.options[select.selectedIndex].value;
        xmlDoc.getElementsByTagName("gra")[val].setAttribute("gatunek", value);

        if(!(document.getElementById("iTytul").value === null || document.getElementById("iTytul").value === "" )){
            xmlDoc.getElementsByTagName("tytul")[val].childNodes[0].nodeValue = document.getElementById("iTytul").value;
        }
        if(!(document.getElementById("iProducent").value === null || document.getElementById("iProducent").value === "" )) {
            xmlDoc.getElementsByTagName("producent")[val].childNodes[0].nodeValue = document.getElementById("iProducent").value;
        }
        if(!(document.getElementById("iWydawca").value === null || document.getElementById("iWydawca").value === "" )) {
            xmlDoc.getElementsByTagName("wydawca")[val].childNodes[0].nodeValue = document.getElementById("iWydawca").value;
        }
        if(!(document.getElementById("iWydawca").value === null || document.getElementById("iWydawca").value === "" )) {
            xmlDoc.getElementsByTagName("dystrybutor")[val].childNodes[0].nodeValue = document.getElementById("iDystrybutor").value;
        }
        if(!(document.getElementById("iRokWydania").value === null || document.getElementById("iRokWydania").value === "" )) {
            xmlDoc.getElementsByTagName("rokWydania")[val].childNodes[0].nodeValue = document.getElementById("iRokWydania").value;
        }
        if(!(document.getElementById("iCena").value === null || document.getElementById("iCena").value === "" )) {
            xmlDoc.getElementsByTagName("cena")[val].childNodes[0].nodeValue = document.getElementById("iCena").value;
        }
        select = document.getElementById('iCenaTyp');
        value = select.options[select.selectedIndex].value;
        xmlDoc.getElementsByTagName("cena")[val].getAttributeNode("waluta").nodeValue = value;

        if (document.getElementById("cbCzyWypozyczona").checked)
            xmlDoc.getElementsByTagName("czyWypozyczona")[val].childNodes[0].nodeValue = "TAK";
        else
            xmlDoc.getElementsByTagName("czyWypozyczona")[val].childNodes[0].nodeValue = "NIE";
        //
        // if (document.getElementById("rPEGIkazdy").checked)
        //     xmlDoc.getElementsByTagName("PEGI")[val].childNodes[0].nodeValue = document.getElementById("rPEGIkazdy").value;
        // else if (document.getElementById("rPEGI7+").checked)
        //     xmlDoc.getElementsByTagName("PEGI")[val].childNodes[0].nodeValue = document.getElementById("rPEGI7+").value;
        // else if (document.getElementById("rPEGI12+").checked)
        //     xmlDoc.getElementsByTagName("PEGI")[val].childNodes[0].nodeValue = document.getElementById("rPEGI12+").value;
        // else if (document.getElementById("rPEGI16+").checked)
        //     xmlDoc.getElementsByTagName("PEGI")[val].childNodes[0].nodeValue = document.getElementById("rPEGI16+").value;


        select = document.getElementById('iPEGI');
        value = select.options[select.selectedIndex].value;
        xmlDoc.getElementsByTagName("PEGI")[val].childNodes[0].nodeValue = value;

        select = document.getElementById('iPlatforma');
        value = select.options[select.selectedIndex].value;
        xmlDoc.getElementsByTagName("platforma")[val].childNodes[0].nodeValue = value;

        if(!(document.getElementById("iJezyk").value === null || document.getElementById("iJezyk").value === "" )) {
            xmlDoc.getElementsByTagName("jezyk")[val].childNodes[0].nodeValue = document.getElementById("iJezyk").value;
        }
        updateXML();



    }
    else
        alert("Podane id już istnieje.");

        updateXML();

}
document.getElementById("btnUsun").onclick = function () {
    deleteXML(document.getElementById("iRekordGryUsun").value);
}



document.getElementById("btnAddPiece").onclick = function () {
    addComposer();
    updateXML();
}



document.getElementById("btnDodajGatunek").onclick = function () {
    if(document.getElementById("iNowyGatunek").value  === null || document.getElementById("iNowyGatunek").value === ""
    || document.getElementById("iNowyGatunekSkrót").value  === null || document.getElementById("iNowyGatunekSkrót").value === "") {
        alert("Wypełnij wszystkie wymagane pola: Nazwa Gatunku, Skrót Gatunku");
    }
    else {
        select = document.getElementById("iGatunek");
        select2 = document.getElementById("sGatunekUsun");
        select.add(new Option(document.getElementById("iNowyGatunekSkrót").value));
        select2.add(new Option(document.getElementById("iNowyGatunekSkrót").value));


        oldNode=xmlDoc.getElementsByTagName('gatunek')[0];
        newNode=oldNode.cloneNode(true);
        newNode.setAttribute("typ", document.getElementById("iNowyGatunekSkrót").value);
        newNode.textContent = document.getElementById("iNowyGatunek").value
        xmlDoc.documentElement.getElementsByTagName("gatunki")[0].appendChild(newNode);

    }


    // var opt = document.createElement(document.getElementById("iNowyGatunekSkrót").value);
    // select.appendChild(opt);
}
document.getElementById("btnDodajPlatforme").onclick = function () {
    if(document.getElementById("iNowaPlatforma").value  === null || document.getElementById("iNowaPlatforma").value === "") {
        alert("Wypełnij wszystkie wymagane pola: Nazwa Platformy");
    }
    else {
        document.getElementById("iPlatforma").add(new Option(document.getElementById("iNowaPlatforma").value));
        document.getElementById("iPlatformaUsun").add(new Option(document.getElementById("iNowaPlatforma").value));

    }
}
document.getElementById("btnDodajPEGI").onclick = function () {
    if(document.getElementById("iNowePEGI").value  === null || document.getElementById("iNowePEGI").value === "") {
        alert("Wypełnij wszystkie wymagane pola: Cyfra PEGI");
    }
    else {
        var value = document.getElementById("iNowePEGI").value + "+";
        document.getElementById("iPEGI").add(new Option(value));
        document.getElementById("iPEGIUsun").add(new Option(value));
    }
}
document.getElementById("btnUsuńGatunek").onclick = function () {
    if(check("gatunek",document.getElementById("sGatunekUsun").value)) {
        var tmp;
        var x = xmlDoc.getElementsByTagName("gatunek");
        for (i = 0; i < x.length; i++) {
            if(x[i].getAttribute("typ") === document.getElementById("sGatunekUsun").value){
                x[i].parentNode.removeChild(x[i]);
                tmp = i;
            }
        }
        document.getElementById("iGatunek").remove(tmp);
        document.getElementById("sGatunekUsun").remove(document.getElementById("sGatunekUsun").selectedIndex);
    }
}
document.getElementById("btnUsunPlatfroma").onclick = function () {
    if(checkElement("platforma", document.getElementById("iPlatformaUsun").value)) {
        var v = document.getElementById("iPlatformaUsun").selectedIndex;
        document.getElementById("iPlatformaUsun").remove(v);
        document.getElementById("iPlatforma").remove(v);
    }
}
document.getElementById("btnUsunPEGI").onclick = function () {
    if(checkElement("PEGI", document.getElementById("iPEGIUsun").value)) {
        var v = document.getElementById("iPEGIUsun").selectedIndex;
        document.getElementById("iPEGIUsun").remove(v);
        document.getElementById("iPEGI").remove(v);
    }
}
document.getElementById("btnModyfikacjaGatunku").onclick = function () {
    if(document.getElementById("iZmienianyGatunekSkrót").val === null || document.getElementById("iZmienianyGatunekSkrót").value === ""
    || document.getElementById("iZmienianyGatunek").val === null || document.getElementById("iZmienianyGatunek").value === "") {
        alert("Wypełnij wszystkie wymagane pola: Zmieniany Gatunek oraz Zmieniany Gatunek Skrót");
    }
    else {
        //Zmienianie wartości gatunków w rekordach
        var value = document.getElementById("iZmienianyGatunekSkrót").value;
        var value2 = document.getElementById("iZmienianyGatunek").value;
        var porownywany = document.getElementById("iGatunek").value;
        var x = xmlDoc.getElementsByTagName("gra");
        for (i = 0; i < x.length; i++) {
            if(x[i].getAttribute("gatunek") === porownywany) {
                x[i].setAttribute("gatunek", value);
            }
        }
        //Us gatunku
            var tmp;
            var x = xmlDoc.getElementsByTagName("gatunek");
            for (i = 0; i < x.length; i++) {
                if (x[i].getAttribute("typ") === document.getElementById("iGatunek").value) {
                    x[i].parentNode.removeChild(x[i]);
                    tmp = i;
                }
            }
            document.getElementById("iGatunek").remove(tmp);
            document.getElementById("sGatunekUsun").remove(document.getElementById("sGatunekUsun").selectedIndex);

        //Dod gatunku
        select = document.getElementById("iGatunek");
        select2 = document.getElementById("sGatunekUsun");
        select.add(new Option(document.getElementById("iZmienianyGatunekSkrót").value));
        select2.add(new Option(document.getElementById("iZmienianyGatunekSkrót").value));


        oldNode=xmlDoc.getElementsByTagName('gatunek')[0];
        newNode=oldNode.cloneNode(true);
        newNode.setAttribute("typ", document.getElementById("iZmienianyGatunekSkrót").value);
        newNode.textContent = document.getElementById("iZmienianyGatunek").value
        xmlDoc.documentElement.getElementsByTagName("gatunki")[0].appendChild(newNode);


        updateXML();
    }
}
// document.getElementById("btnValidate").onclick = function () {
//     validateXMLAgainstXSD()
// }






function loadXMLDoc(path) {
    var xhr = new XMLHttpRequest();

    let url = URL.createObjectURL(path.files[0]);

    xhr.open('GET', url, true);

    xhr.timeout = 2000; // time in milliseconds
    xhr.onload = function () {
        // Request finished. Do processing here.

        var i, j;
        xmlDoc = this.responseXML;
        var table =
        `<tr><th>Composer's id</th><th>Date of birth</th><th>firstName</th><th>Surname</th>
        <th>Nationality</th><th>Lifespan</th></tr>`;
        var x = xmlDoc.getElementsByTagName("composer");
        var y = xmlDoc.getElementsByTagName("composers");
          var piece = xmlDoc.getElementsByTagName("piece");
          var book = xmlDoc.getElementsByTagName("book");
        var piecetable = `<tr><th>Piece's no</th><th>Title</th><th>Tonation</th><th>Level</th>
        <th>Instruments</th><th>PublisherNo</th><th>Price</th><th>Currency</th></tr>`;
         var booktable=`<tr><th>Book's no</th><th>Title</th><th>Amount of pages</th><th>ISBN</th>
         <th>PublisherNo</th><th>Price</th><th>Currency</th></tr>`;
         var publishertable=`<tr><th>Publisher's id</th><th>Name</th></tr>`;
        
        // Start to fetch the data by using TagName
        for (i = 0; i < x.length; i++) {
            table += "<tr><td>" +
                x[i].getAttribute("id") + "</td><td>" +
                x[i].getAttribute("born") + "</td><td>" +
                x[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("surname")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("lifespan")[0].childNodes[0].nodeValue + "</td></tr>" /* +
                x[i].getElementsByTagName("name")[j].childNodes[0].nodeValue + "</td><td>" */ 
                /* +
                x[i].getElementsByTagName("composer")[0].childNodes[6].childNodes[0].childNodes[0].nodeValue + "</td><td>" */
                /* +x[i].getElementsByTagName("name")[0].childNodes[0].childNodes[0].nodeValue + "</td><td>" */;
               
                  
                
        }
        for (j = 0; j < piece.length; j++){
            piecetable+= "<tr><td>" +
            piece[j].getAttribute("nr") + "</td><td>" +
            piece[j].getElementsByTagName("name")[0]
            .childNodes[0].nodeValue + "</td><td>" +
            piece[j].getElementsByTagName("tonation")[0]
            .childNodes[0].nodeValue + "</td><td>" +
            piece[j].getElementsByTagName("level")[0]
            .childNodes[0].nodeValue + "</td><td>" +
            piece[j].getElementsByTagName("instruments")[0]
            .childNodes[0].nodeValue + "</td><td>"+
            piece[j].getElementsByTagName("publisher")[0]
            .getAttribute("nr") + "</td><td>"+
            piece[j].getElementsByTagName("price")[0]
            .childNodes[0].nodeValue + "</td><td>"+
            piece[j].getElementsByTagName("price")[0].getAttribute("cur")+ "</td></tr>";
         } 
         for (j = 0; j < book.length; j++){
            booktable+= "<tr><td>" +
            book[j].getAttribute("no") + "</td><td>" +
            book[j].getElementsByTagName("content")[0]
            .childNodes[0].nodeValue + "</td><td>" +
            book[j].getElementsByTagName("amount_of_pages")[0]
            .childNodes[0].nodeValue + "</td><td>" +
            book[j].getElementsByTagName("ISBN")[0]
            .childNodes[0].nodeValue + "</td><td>" +
            book[j].getElementsByTagName("publisher")[0]
            .getAttribute("nr") + "</td><td>"+
            book[j].getElementsByTagName("price")[0]
            .childNodes[0].nodeValue + "</td><td>"+
            book[j].getElementsByTagName("price")[0].getAttribute("cur")+ "</td></tr>";
         } 
         for (j = 0; j < 6; j++){ publishertable+="<tr><td>" +y[0].getElementsByTagName("publisher")[36+j].getAttribute("id") +
         "</td><td>" +y[0].getElementsByTagName("namePublisher")[0+j].childNodes[0].nodeValue +"</td></tr>";}


//liczenie na piechotę bez pętli for:
         /* publishertable+="<tr><td>" +y[0].getElementsByTagName("publisher")[36].getAttribute("id") +
         "</td><td>" +y[0].getElementsByTagName("namePublisher")[0].childNodes[0].nodeValue +"</td></tr>"+"<tr><td>"+
         y[0].getElementsByTagName("publisher")[37].getAttribute("id") +
         "</td><td>" +y[0].getElementsByTagName("namePublisher")[1].childNodes[0].nodeValue +"</td></tr>"+"<tr><td>"+
         y[0].getElementsByTagName("publisher")[38].getAttribute("id") +
         "</td><td>" +y[0].getElementsByTagName("namePublisher")[2].childNodes[0].nodeValue+"</td></tr>" +"<tr><td>"+
         y[0].getElementsByTagName("publisher")[39].getAttribute("id") +
         "</td><td>" +y[0].getElementsByTagName("namePublisher")[3].childNodes[0].nodeValue+"</td></tr>" +"<tr><td>"+
         y[0].getElementsByTagName("publisher")[40].getAttribute("id") +
         "</td><td>" +y[0].getElementsByTagName("namePublisher")[4].childNodes[0].nodeValue +"</td></tr>"+"<tr><td>"+
         y[0].getElementsByTagName("publisher")[41].getAttribute("id") +
         "</td><td>" +y[0].getElementsByTagName("namePublisher")[5].childNodes[0].nodeValue +"</td></tr>"; */
       
        document.getElementById("fileContent").innerHTML = table;
        document.getElementById("fileContent2").innerHTML = piecetable;
        document.getElementById("fileContent3").innerHTML = booktable;
        document.getElementById("fileContent4").innerHTML = publishertable;
    };

    xhr.ontimeout = function (e) {
        // XMLHttpRequest timed out. Do something here. Or not :)
    };

    xhr.send(null);
    return xmlDoc;


}

function save() {
    //Serialize
    const serializer = new XMLSerializer();
    var toSave = serializer.serializeToString(xmlDoc);

    //Utwórz nowy plik
    const blob = new Blob([toSave], { type: "text/xml" });
    const url = URL.createObjectURL(blob);

    //Utwórz i kliknij fałszywy tymczasowy link
    const fakeLink = document.createElement("a");
    fakeLink.href = url;
    fakeLink.download = 'changed.xml';
    fakeLink.click();
}
function updateXML() {
    var i, j;
    xmlDoc = this.responseXML;
    var table =
    `<tr><th>Composer's id</th><th>Date of birth</th><th>firstName</th><th>Surname</th>
    <th>Nationality</th><th>Lifespan</th></tr>`;
    var x = xmlDoc.getElementsByTagName("composer");
    var y = xmlDoc.getElementsByTagName("composers");
      var piece = xmlDoc.getElementsByTagName("piece");
      var book = xmlDoc.getElementsByTagName("book");
    var piecetable = `<tr><th>Piece's no</th><th>Title</th><th>Tonation</th><th>Level</th>
    <th>Instruments</th><th>PublisherNo</th><th>Price</th><th>Currency</th></tr>`;
     var booktable=`<tr><th>Book's no</th><th>Title</th><th>Amount of pages</th><th>ISBN</th>
     <th>PublisherNo</th><th>Price</th><th>Currency</th></tr>`;
     var publishertable=`<tr><th>Publisher's id</th><th>Name</th></tr>`;
    
    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            x[i].getAttribute("id") + "</td><td>" +
            x[i].getAttribute("born") + "</td><td>" +
            x[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("surname")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("lifespan")[0].childNodes[0].nodeValue + "</td></tr>" /* +
            x[i].getElementsByTagName("name")[j].childNodes[0].nodeValue + "</td><td>" */ 
            /* +
            x[i].getElementsByTagName("composer")[0].childNodes[6].childNodes[0].childNodes[0].nodeValue + "</td><td>" */
            /* +x[i].getElementsByTagName("name")[0].childNodes[0].childNodes[0].nodeValue + "</td><td>" */;
           
              
            
    }
    for (j = 0; j < piece.length; j++){
        piecetable+= "<tr><td>" +
        piece[j].getAttribute("nr") + "</td><td>" +
        piece[j].getElementsByTagName("name")[0]
        .childNodes[0].nodeValue + "</td><td>" +
        piece[j].getElementsByTagName("tonation")[0]
        .childNodes[0].nodeValue + "</td><td>" +
        piece[j].getElementsByTagName("level")[0]
        .childNodes[0].nodeValue + "</td><td>" +
        piece[j].getElementsByTagName("instruments")[0]
        .childNodes[0].nodeValue + "</td><td>"+
        piece[j].getElementsByTagName("publisher")[0]
        .getAttribute("nr") + "</td><td>"+
        piece[j].getElementsByTagName("price")[0]
        .childNodes[0].nodeValue + "</td><td>"+
        piece[j].getElementsByTagName("price")[0].getAttribute("cur")+ "</td></tr>";
     } 
     for (j = 0; j < book.length; j++){
        booktable+= "<tr><td>" +
        book[j].getAttribute("no") + "</td><td>" +
        book[j].getElementsByTagName("content")[0]
        .childNodes[0].nodeValue + "</td><td>" +
        book[j].getElementsByTagName("amount_of_pages")[0]
        .childNodes[0].nodeValue + "</td><td>" +
        book[j].getElementsByTagName("ISBN")[0]
        .childNodes[0].nodeValue + "</td><td>" +
        book[j].getElementsByTagName("publisher")[0]
        .getAttribute("nr") + "</td><td>"+
        book[j].getElementsByTagName("price")[0]
        .childNodes[0].nodeValue + "</td><td>"+
        book[j].getElementsByTagName("price")[0].getAttribute("cur")+ "</td></tr>";
     } 
     for (j = 0; j < 6; j++){ publishertable+="<tr><td>" +y[0].getElementsByTagName("publisher")[36+j].getAttribute("id") +
     "</td><td>" +y[0].getElementsByTagName("namePublisher")[0+j].childNodes[0].nodeValue +"</td></tr>";}

    document.getElementById("afileContent").innerHTML = table;
    document.getElementById("afileContent").innerHTML = piecetable;
    document.getElementById("afileContent").innerHTML = booktable;
    document.getElementById("afileContent").innerHTML = publishertable;

}
function deleteXML(position){
    var x = xmlDoc.getElementsByTagName("composer")[position];
    x.parentNode.removeChild(x);
    updateXML();
}
function addComposer(){

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
