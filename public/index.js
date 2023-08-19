
//Data call
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        loadTable(JSON.parse(this.responseText));
    }
};

xhttp.open("GET", "https://theperiodictable.onrender.com/data", true);
xhttp.send();

//loader functions
const loadTable = (data) => {
    if (data.elements) {
        loadMainBodyOfTable(data.elements);
        loadRareEarths(data.elements.slice(56, 71), data.elements.slice(88, 103));
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
                cellBackground(element.category, cell);
                cell.setAttribute("onclick","getDataforId(this)");
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
                    cellBackground("lanthanide", cell);
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
                    cellBackground("actinide", cell);
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
            cell.innerHTML += text;
            cellBackground(element.category, cell);
            cell.setAttribute("onclick","getDataforId(this)");
        });
    }
    row = table.insertRow();
    if (Ac) {
        Ac.forEach(element => {
            let cell = row.insertCell();
            text = getHtmlForPElement(element);
            cell.innerHTML += text
            cellBackground(element.category, cell);
            cell.setAttribute("onclick","getDataforId(this)");
        });
    }
}

//Helper functions
const getHtmlForPElement = (element) =>{
    let text = '<div class="element">' +
    '<div class="row">' +
    '<div class="column z-num">' + element.number + '</div>' +
    '<div class="column amu">' + element.atomic_mass.toPrecision(3) + '</div>' +
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

const cellBackground = (category,cell) => {
    if(category.toString().includes("alkali metal"))
        cell.classList.add("alkali-metal");
    else if(category.toString().includes("noble gas"))
        cell.classList.add("noble-gas");
    else if(category.toString().includes("diatomic nonmetal"))
        cell.classList.add("diatomic-nonmetal");
    else if(category.toString().includes("alkaline earth metal"))
        cell.classList.add("alkaline-earth-metal");
    else if(category.toString().includes("metalloid"))
        cell.classList.add("metalloid");
    else if(category.toString().includes("polyatomic nonmetal"))
        cell.classList.add("polyatomic-nonmetal");
    else if(category.toString().includes("lanthanide"))
        cell.classList.add("lanthanide");
    else if(category.toString().includes("actinide"))
        cell.classList.add("actinide");
    else if(category.toString().includes("post-transition metal"))
        cell.classList.add("post-transition-metal");
    else if(category.toString().includes("transition metal"))
        cell.classList.add("transition-metal");
    else
        return;
}

const getDataforId = (e)=>{
    let num = e.children[0].children[0].children[0].innerHTML;
    //Data call
    location.href = "https://theperiodictable.onrender.com/element/"+num;
}