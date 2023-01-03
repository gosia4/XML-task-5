let xmlDoc;

document.getElementById("btnLoad").onclick = function () {
    var path = document.getElementById("fileName");
    xmlDoc = loadXMLDoc(path);

}

//zapisywanue działa
document.getElementById("btnSave").onclick = function () {
    save();
}

//aktualizacja sposobem gościa z ftimsu, potrzebna do modyfikacji composer
document.getElementById("btnUpdate").onclick = function () {
    var val = document.getElementById("iComposerUpdate").value;
    if(idCheck(document.getElementById("iId").value)) {
        if(!(document.getElementById("iId").value === null || document.getElementById("iId").value === "" )){
        xmlDoc.getElementsByTagName("composer")[val].setAttribute("id", document.getElementById("composer").value);
		}
        var select = document.getElementById('iBorn');
        var value = select.options[select.selectedIndex].value;
        xmlDoc.getElementsByTagName("composer")[val].setAttribute("born", value);

        //if(!(document.getElementById("iPerson").value === null || document.getElementById("iPerson").value === "" )){
            var select = document.getElementById('iGender');
            var value = select.options[select.selectedIndex].value;
            xmlDoc.getElementsByTagName("person")[val].setAttribute("gender", value);
    

        //}
        if(!(document.getElementById("ifirst_name").value === null || document.getElementById("ifirst_name").value === "" )) {
            xmlDoc.getElementsByTagName("first_name")[val].childNodes[0].nodeValue = document.getElementById("ifirst_name").value;
        }
        if(!(document.getElementById("isurname").value === null || document.getElementById("isurname").value === "" )) {
            xmlDoc.getElementsByTagName("surname")[val].childNodes[0].nodeValue = document.getElementById("isurname").value;
        }
        if(!(document.getElementById("inationality").value === null || document.getElementById("inationality").value === "" )) {
            xmlDoc.getElementsByTagName("nationality")[val].childNodes[0].nodeValue = document.getElementById("inationality").value;
        }
        if(!(document.getElementById("ilifespan").value === null || document.getElementById("ilifespan").value === "" )) {
            xmlDoc.getElementsByTagName("lifespan")[val].childNodes[0].nodeValue = document.getElementById("ilifespan").value;
        }
        if(!(document.getElementById("icity").value === null || document.getElementById("icity").value === "" )) {
            xmlDoc.getElementsByTagName("city")[val].childNodes[0].nodeValue = document.getElementById("icity").value;
        }
       
        updateXML();



    }
    else
        alert("Given id exists.");

        updateXML();

}
//usuwamy composer
document.getElementById("btnDeleteComposer").onclick = function () {
    deleteComposer(document.getElementById("iDeleteComposer").value);
}
//usuwamy piece
document.getElementById("btnDeletePiece").onclick = function () {
    deletePiece(document.getElementById("iDeletePiece").value);
}
//usuwamy book
document.getElementById("btnDeleteBook").onclick = function () {
    deleteBook(document.getElementById("iDeleteBook").value);
}
document.getElementById("btnDeletePublisher").onclick = function () {
    deletePublisher(document.getElementById("iDeletePublisher").value);
}

/* document.getElementById("btnAddComposer").onclick = function () {
    addComposer();
    updateXML();
} */



/* document.getElementById("btnDodajGatunek").onclick = function () {
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

    } */


    // var opt = document.createElement(document.getElementById("iNowyGatunekSkrót").value);
    // select.appendChild(opt);
/* }
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
} */
// document.getElementById("btnValidate").onclick = function () {
//     validateXMLAgainstXSD()
// }





//załadowanie xml na stronę
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
        `<tr><th>Composer's id</th><th>Date of birth</th><th>gender</th><th>firstName</th><th>Surname</th>
        <th>Nationality</th><th>Lifespan</th><th>City</th></tr>`;
        var x = xmlDoc.getElementsByTagName("composer");
        var y = xmlDoc.getElementsByTagName("composers");

       //var pub=xmlDoc.getElementsByTagName("publisher").getElementsById("id");

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
                x[i].getElementsByTagName("person")[0].getAttribute("gender")+ "</td><td>"+
                x[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue + "</td><td>" +/* 
                x[i].getElementsByTagName("first_name")[1].childNodes[0].nodeValue + "</td><td>" + */
                x[i].getElementsByTagName("surname")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("lifespan")[0].childNodes[0].nodeValue + "</td><td>"+
                x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue +"</td></tr>" /* +
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
         
     /* for (j = 0; j < y[0].childNodes[0].getElementsByTagName("publisher").length; j++){ publishertable+="<tr><td>" +y[0].childNodes[0].getElementsByTagName("publisher") +
     "</td><td>" +y[0].getElementsByTagName("namePublisher")[0+j].childNodes[0].nodeValue +"</td></tr>";}
 */
//tu próba nie robienia na piechotę, na podstawie id publishera.
//jest publisher w każdym piece i w każdym book, ale jako atrybut mają nr.
//publisher który jest dzieckiem elementu root ma atrybut id.
         /* for (j = 0; j < 6; j++){ publishertable+="<tr><td>" +pub[j] +
         //"</td><td>" +y[j].getElementsByTagName("namePublisher")[j].childNodes[0].nodeValue 
         +"</td></tr>";} */

//policzone na piechotę, ale przez to nie działa usuwanie publishera
         for (j = 0; j < 6; j++){ publishertable+="<tr><td>" +
         y[0].getElementsByTagName("publisher")[36+j].getAttribute("id") +
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
//zapisanie pliku
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
//miał wyświetlić na stronie, jeśli się coś usunie, modyfikuje albo dodaje, nie robi tego. Ale to jest istotne.
function updateXML() {
    var i, j;
    //xmlDoc = this.responseXML;
    var table =
        `<tr><th>Composer's id</th><th>Date of birth</th><th>gender</th><th>firstName</th><th>Surname</th>
        <th>Nationality</th><th>Lifespan</th><th>City</th></tr>`;
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
            x[i].getElementsByTagName("person")[0].getAttribute("gender")+ "</td><td>"+
            x[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue + "</td><td>" +/* 
            x[i].getElementsByTagName("first_name")[1].childNodes[0].nodeValue + "</td><td>" + */
            x[i].getElementsByTagName("surname")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue + "</td><td>" +
            x[i].getElementsByTagName("lifespan")[0].childNodes[0].nodeValue + "</td><td>"+
            x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue +"</td></tr>";
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


     /* for (j = 0; j < y[0].childNodes[0].getElementsByTagName("publisher").length; j++){ publishertable+="<tr><td>" +y[0].childNodes[0].getElementsByTagName("publisher") +
     "</td><td>" +y[0].getElementsByTagName("namePublisher")[0+j].childNodes[0].nodeValue +"</td></tr>";}
 */
    document.getElementById("afileContent").innerHTML = table;
    document.getElementById("afileContent2").innerHTML = piecetable;
    document.getElementById("afileContent3").innerHTML = booktable;
    document.getElementById("afileContent4").innerHTML = publishertable;

}
//usuwanie composer
function deleteComposer(position){
    var x = xmlDoc.getElementsByTagName("composer")[position-1];
    x.parentNode.removeChild(x);
    updateXML();
}
//pieces usuwanie działa
function deletePiece(position){
    var x = xmlDoc.getElementsByTagName("piece")[position-1];
    x.parentNode.removeChild(x);
    updateXML();
}
function deleteBook(position){
    var x = xmlDoc.getElementsByTagName("book")[position-1];
    x.parentNode.removeChild(x);
    updateXML();
}
//usuwanie publisher nie działa, źle zrobiona pętlę w loadXML
function deletePublisher(position){
    var x = xmlDoc.getElementsByTagName("publisher").getAttribute("id")[position-1];
    x.parentNode.removeChild(x);
    updateXML();
}



//modyfying composers, Towim sposobem

document.getElementById("modify_button_composer").onclick = function () {
    load_new_data_composer();
    updateXML();
}

// zwraca array referencji do atrybutów argumentu, elementów będących jego dziećmi i atrybutów tych elementów 
function get_editable_composer_childen(composer) {
    let stuff = [];
    stuff.push(composer.attributes[0])
    stuff.push(composer.attributes[1])
    for (let i = 0; i < composer.children.length; i++) {
        const element = composer.children[i];
        if(element.innerHTML){
            stuff.push(element);
        }
        if(element.attributes.length > 0){
            stuff.push(element.attributes[0]);
        }
    }
    return stuff;
}

// zwraca array referencji do podelementów "new_values" w htmlu, które nie są tekstem ani <br>
// (czyli inputy i selecty)
// output pasuje koresomnduje jeden do jednego z get_editable_game_childen()
function get_new_velues_childen_composer(){
    let stuff = [];
    for (let i = 0; i < document.getElementById("new_values_composer").childNodes.length; i++) {
        const element = document.getElementById("new_values_composer").childNodes[i];
        if (element.nodeType == 1 && element.nodeName != "BR"){
            stuff.push(element);
        }
    }
    return stuff;
}

// ładuje dane z sekcji "Data modification" do xml_doc, jeżeli coś zostało wpisane (to ostatnie nie działa dla selectów)
//ładuje composera
function load_new_data_composer(){ 
    var modify_id_composer = document.getElementById("modify_id_composer").value;
    if (!modify_id_composer) return; 

    for (let i = 0;; i++) {

        const xml_element = get_editable_composer_childen(xml_doc.getElementsByTagName("composer")[modify_id_composer-1])[i]
        const new_element = get_new_velues_childen_composer()[i]

        if(!new_element) break;

        if(new_element.value) {
            xml_element.textContent = new_element.value
        }
    }
}







//modyfying pieces, nie działa
//a tu pieces
document.getElementById("modify_button_pieces").onclick = function () {
    load_new_data_pieces();
    updateXML();
}

// zwraca array referencji do atrybutów argumentu, elementów będących jego dziećmi i atrybutów tych elementów 
function get_editable_piece_childen(piece) {
    let stuff = [];
    stuff.push(piece.attributes[0])
    stuff.push(piece.attributes[1])
    for (let i = 0; i < piece.children.length; i++) {
        const element = piece.children[i];
        if(element.innerHTML){
            stuff.push(element);
        }
        if(element.attributes.length > 0){
            stuff.push(element.attributes[0]);
        }
    }
    return stuff;
}

// zwraca array referencji do podelementów "new_values" w htmlu, które nie są tekstem ani <br>
// (czyli inputy i selecty)
// output pasuje koresomnduje jeden do jednego z get_editable_game_childen()
function get_new_velues_childen_pieces(){
    let stuff = [];
    for (let i = 0; i < document.getElementById("new_valuesa_pieces").childNodes.length; i++) {
        const element = document.getElementById("new_values_pieces").childNodes[i];
        if (element.nodeType == 1 && element.nodeName != "BR"){
            stuff.push(element);
        }
    }
    return stuff;
}

// ładuje dane z sekcji "Data modification" do xml_doc, jeżeli coś zostało wpisane (to ostatnie nie działa dla selectów)
function load_new_data_pieces(){ 
    var modify_id = document.getElementById("modify_id_pieces").value;
    if (!modify_id) return; 

    for (let i = 0;; i++) {

        const xml_element = get_editable_piece_childen(xml_doc.getElementsByTagName("pieces:piece")[modify_id_pieces-1])[i]
        const new_element = get_new_velues_childen_pieces()[i]

        if(!new_element) break;

        if(new_element.value) {
            xml_element.textContent = new_element.value
        }
    }
}


















//dodawanie nie działa, teoretycznie miał dodawać pierwszego composera na koniec tabeli
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
