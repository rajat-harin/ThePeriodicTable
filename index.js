var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        loadTable(JSON.parse(this.responseText));
    }
};

xhttp.open("GET", "http://localhost:5000/data", true);
xhttp.send();

const loadTable = (data) => {
    if (data.elements) {
        loadMainBodyOfTable(data.elements);
        loadRareEarths(data.elements.slice(56, 71), data.elements.slice(88, 103));
        //data.elements.forEach(element => {

        //});
    }
}

const loadMainBodyOfTable = (data) => {
    let table = document.getElementById("mainBodyOfTable");
    let row, cell, n;
    if (data) {
        data.forEach(element => {
            n = element.number;
            if((((n-1)%18 == 0 && n<56 )|| n == 3 || n == 11 || n == 87) )
            {
                row = table.insertRow();
            }
            if(n<57 || n>71 && n<89 || n>103 && n<=118)
            {
                cell = row.insertCell();
                text = getHtmlForPElement(element);
                cell.innerHTML += text;
            }
            else
            {
                if(n==57)
                {
                    cell = row.insertCell();
                    text = '<div class="element">' +
                    '<div class="row">' +
                    '<div class="col z-num">' + "57-71" + '</div>' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="col symbol">' + "La-Lu" + '</div>' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="col name">' + "Lanthanide" + '</div>' +
                    '</div>' +
                    '</div>'
                    cell.innerHTML += text;
                }
                if(n==89)
                {
                    cell = row.insertCell();
                    text = '<div class="element">' +
                    '<div class="row">' +
                    '<div class="col z-num">' + "89-103" + '</div>' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="col symbol">' + "Ac-Lr" + '</div>' +
                    '</div>' +
                    '<div class="row">' +
                    '<div class="col name">' + "Actinide" + '</div>' +
                    '</div>' +
                    '</div>'
                    cell.innerHTML += text;
                }
            }
            if(n==1)
            {
                cell = row.insertCell();
                cell.setAttribute("colspan","16");
                cell.setAttribute("class","blank-cells");
            }
            if(n==4)
            {
                cell = row.insertCell();
                cell.setAttribute("colspan","10");
                cell.setAttribute("class","blank-cells");
            }
            if(n==12)
            {
                cell = row.insertCell();
                cell.setAttribute("colspan","10");
                cell.setAttribute("class","blank-cells");
            }
        });
    }
}

const loadRareEarths = (La, Ac) => {
    let table = document.getElementById("RareEarths");
    let row = table.insertRow();
    if (La) {
        La.forEach(element => {
            let cell = row.insertCell();
            text = getHtmlForPElement(element);
            cell.innerHTML += text
        });
    }
    row = table.insertRow();
    if (Ac) {
        Ac.forEach(element => {
            let cell = row.insertCell();
            text = getHtmlForPElement(element);
            cell.innerHTML += text
        });
    }
}

const getHtmlForPElement = (element) =>{
    let text = '<div class="element">' +
    '<div class="row">' +
    '<div class="col z-num">' + element.number + '</div>' +
    '<div class="col amu">' + element.atomic_mass.toPrecision(3) + '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col symbol">' + element.symbol + '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col name">' + element.name + '</div>' +
    '</div>' +
    '</div>'
    return text;
}