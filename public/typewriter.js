var txt;
// function loadInfo(param) {
var elem = document.getElementsByClassName("details");
elem = elem[0];
txt = elem.innerHTML;
txt = txt.replace(/"/g,' ');
txt = txt.replace(/{/g,' ');
txt = txt.replace(/}/g,' ');
elem.innerHTML = '';
//container-row


// }

var speed = 20; /* The speed/duration of the effect in milliseconds */
var i = 0;

function typeWriter() {
    elem.removeAttribute("hidden");
    document.getElementById("container-row").removeAttribute("onmouseover");
    if (i < txt.length) {
        if(txt.charAt(i) =='\n')
            document.getElementById("details").innerHTML += '<br>';
        else
            document.getElementById("details").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}