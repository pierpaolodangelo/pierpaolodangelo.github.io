function loadData() {
    const request = new XMLHttpRequest();
    request.open("get", /*"https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json"*/
        "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json");
    request.onload = () => {
        try {
            const json = JSON.parse(request.responseText);
            populateDataByDate(json);

        } catch (e) {
            console.log(e);
            console.warn("Could not retrieve data from the json :(");
        }
    };
    request.send();
}

function populateDataByDate(json) {
    console.log(json);
    var date = document.getElementById("date-input").value;
    var newData = json.filter(el => el.data.startsWith(date));
    console.log(newData);
    var table = $('#table-body');
    table.empty();
    newData.forEach(element => {
        var row = `<tr>
        <td>${element.denominazione_regione}</td>
        <td>${element.dimessi_guariti}</td>
        <td>${element.deceduti}</td>
        <td>${element.totale_casi}</td>
        <td>${element.nuovi_positivi}</td>
        </tr>`
        table.append(row);
    });
}