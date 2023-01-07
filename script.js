let xmlDoc;

document.getElementById("btnLoad").onclick = function () {
    var path = document.getElementById("fileName");
    xmlDoc = loadXMLDoc(path);

}

//zapisywanue działa
document.getElementById("btnSave").onclick = function () {
    save();
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
        var publisher=xmlDoc.getElementsByTagName("Publisher");
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
                x[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("surname")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("nationality")[0].childNodes[0].nodeValue + "</td><td>" +
                x[i].getElementsByTagName("lifespan")[0].childNodes[0].nodeValue + "</td><td>"+
                x[i].getElementsByTagName("city")[0].childNodes[0].nodeValue +"</td></tr>" ;     
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
         
         for (j = 0; j < publisher.length; j++){ publishertable+="<tr><td>" +
         publisher[j].getAttribute("id") + "</td><td>" +
         publisher[j].getElementsByTagName("namePublisher")[0].childNodes[0].nodeValue + "</td></tr>" ;}
         
         
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
      var piece = xmlDoc.getElementsByTagName("piece");
      var book = xmlDoc.getElementsByTagName("book");
    var piecetable = `<tr><th>Piece's no</th><th>Title</th><th>Tonation</th><th>Level</th>
    <th>Instruments</th><th>PublisherNo</th><th>Price</th><th>Currency</th></tr>`;
     var booktable=`<tr><th>Book's no</th><th>Title</th><th>Amount of pages</th><th>ISBN</th>
     <th>PublisherNo</th><th>Price</th><th>Currency</th></tr>`;
     var publishertable=`<tr><th>Publisher's id</th><th>Name</th></tr>`;
     var publisher=xmlDoc.getElementsByTagName("Publisher");
      
    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            x[i].getAttribute("id") + "</td><td>" +
            x[i].getAttribute("born") + "</td><td>" +
            x[i].getElementsByTagName("person")[0].getAttribute("gender")+ "</td><td>"+
            x[i].getElementsByTagName("first_name")[0].childNodes[0].nodeValue + "</td><td>" +
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
     for (j = 0; j < publisher.length; j++){ publishertable+="<tr><td>" +
     publisher[j].getAttribute("id") + "</td><td>" +
     publisher[j].getElementsByTagName("namePublisher")[0].childNodes[0].nodeValue + "</td></tr>" ;}
     
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
function deletePublisher(position){
    var publisher=xmlDoc.getElementsByTagName("publisher");
    var x = xmlDoc.getElementsByTagName("Publisher")[position-1]; 
    for (j = 0; j < publisher.length; j++){ 
        if(publisher[j].getAttribute("nr") === (position))
        {alert("First delete pieces and books that contain this publisher.")
        return false;}
        else {x.parentNode.removeChild(x);
        return true;}
    }
    updateXML();
}


//adding
document.getElementById("btnAddComposer").onclick = function () {
    addComposer();
    updateXML();
}
//dodaje pierwszego composera
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
    //var y=x[i].getAttribute("id");
    newNode.setAttribute("id", 1000+count);
    xmlDoc.getElementsByTagName("composers")[0].appendChild(newNode);
    // xmlDoc.documentElement.getElementsByTagName("composer")[0].appendChild(newNode);
}
document.getElementById("btnAddPiece").onclick = function () {
    addPiece();
    updateXML();
}

function addPiece(){

    oldNode=xmlDoc.getElementsByTagName('piece')[0];
    var count = xmlDoc.getElementsByTagName("piece").length;
    newNode=oldNode.cloneNode(true);
    var x = xmlDoc.getElementsByTagName("piece");

    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        if (parseInt(x[i].getAttribute("nr")) === count)
            count++;
    }

    newNode.setAttribute("nr", count);
    xmlDoc.getElementsByTagName("pieces")[0].appendChild(newNode);

}

document.getElementById("btnAddBook").onclick = function () {
    addBook();
    updateXML();
}
function addBook(){

    oldNode=xmlDoc.getElementsByTagName('book')[0];
    var count = xmlDoc.getElementsByTagName("book").length;
    newNode=oldNode.cloneNode(true);
    var x = xmlDoc.getElementsByTagName("book");

    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        if (parseInt(x[i].getAttribute("no")) === count)
            count++;
    }

    newNode.setAttribute("no", count);
    xmlDoc.documentElement.getElementsByTagName("book")[0].appendChild(newNode);
}
document.getElementById("btnAddPublisher").onclick = function () {
    addPublisher();
    updateXML();
}
function addPublisher(){

    oldNode=xmlDoc.getElementsByTagName('Publisher')[0];
    var count = xmlDoc.getElementsByTagName("Publisher").length;
    newNode=oldNode.cloneNode(true);
    var x = xmlDoc.getElementsByTagName("Publisher");

    // Start to fetch the data by using TagName
    for (i = 0; i < x.length; i++) {
        if (parseInt(x[i].getAttribute("id")) === count)
            count++;
    }

    newNode.setAttribute("id", count);
    xmlDoc.getElementsByTagName("composers")[0].appendChild(newNode);
}





//modyfikacja
document.getElementById("btnUpdate").onclick = function () {

    if(idCheck(document.getElementById("iId").value)) {
    var val = document.getElementById("iComposerUpdate").value;
    var composer = xmlDoc.getElementsByTagName("composer")[val];
    if(!(document.getElementById("ifirst_name").value === null || document.getElementById("ifirst_name").value === "" )) {
        composer.getElementsByTagName("first_name")[0].childNodes[0].nodeValue = document.getElementById("ifirst_name").value;
    }
    if(!(document.getElementById("isurname").value === null || document.getElementById("isurname").value === "" )) {
        composer.getElementsByTagName("surname")[0].childNodes[0].nodeValue = document.getElementById("isurname").value;
    }
    if(!(document.getElementById("inationality").value === null || document.getElementById("inationality").value === "" )) {
        composer.getElementsByTagName("nationality")[0].childNodes[0].nodeValue = document.getElementById("inationality").value;
    }
    if(!(document.getElementById("ilifespan").value === null || document.getElementById("ilifespan").value === "" )) {
        composer.getElementsByTagName("lifespan")[0].childNodes[0].nodeValue = document.getElementById("ilifespan").value;
    }
    if(!(document.getElementById("icity").value === null || document.getElementById("icity").value === "" )) {
        composer.getElementsByTagName("city")[0].childNodes[0].nodeValue = document.getElementById("icity").value;
    }
    composer.getElementsByTagName("person")[0].attributes[0].nodeValue = document.getElementById("iGender").value;
    if(idCheck(document.getElementById("iId").value)){
        composer.attributes[0].nodeValue = document.getElementById("iId").value;
    }
    if(!(document.getElementById("iBorn").value === null || document.getElementById("iBorn").value === "" )) {
        composer.attributes[1].nodeValue = document.getElementById("iBorn").value;
    }
    

    updateXML();
     }
     else
         alert("Given id exists.");

         updateXML();

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
    var x = xmlDoc.getElementsByTagName("Publisher");
    for (i = 0; i < x.length; i++) {
            if(x[i].getAttribute(nazwaAtrybutu) === porownywany) {
                alert("First delete pieces and books that contain this publisher.")
                return false;
            }
    }
    return true;
}

function checkElement(nazwaElementu, porownywany) {

    var x = xmlDoc.getElementsByTagName("publisher");
    for (i = 0; i < x.length; i++) {
        if(x[i].getElementsByTagName(nazwaElementu)[0].childNodes[0].nodeValue === porownywany) {
            alert("First delete pieces and books that contain this publisher.")
            return false;
        }
    }
    return true;
}










//modyfying composers, drugim (pierwszym na stronie) sposobem

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
/* function zmien(){
} */