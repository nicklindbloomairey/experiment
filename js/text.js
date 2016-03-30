var xhr = new XMLHttpRequest();
var xhr1 = new XMLHttpRequest();


xhr.onload = function(event) {
    var innerhtml = JSON.parse(xhr.response);

    var content = document.getElementById('content');

    console.log(content.innerHTML);
    console.log(innerhtml);

    content.innerHTML += innerhtml.body;

}

xhr1.onload = function(event) {
    console.log(JSON.parse(xhr.response));
}

function sendHTML() {

    xhr1.open('POST', '/textsave', true);

    var sendObject = { 
        'body': document.getElementById('content').innerHTML
    }
    console.log(sendObject);
    xhr1.send(JSON.stringify(sendObject));
}

xhr.open('POST', '/text', true);
xhr.send();
