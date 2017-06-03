var xhr = new XMLHttpRequest();


xhr.onload = function(event) {
    var users = JSON.parse(xhr.response);

    console.log(users.online);
    console.log(users.online[0]);

    for (var i = 0; i<users.online.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = users.online[i].username;

        document.getElementById('online users').appendChild(li);
    }
}

xhr.open('POST', '/lobby', true);
xhr.send();

