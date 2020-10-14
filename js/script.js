function loadData() {
    const request = new XMLHttpRequest();
    request.open("get", "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json");
    request.onload = () => {
        try {
            const json = JSON.parse(request.responseText);
            populateData(json);

        } catch (e) {
            console.warn("Could not retrieve data from the json :(");
        }
    };
    request.send();
}

function populateData(json) {
    for (var i in json) {
        var row = `<tr>
                        <td>${json[i].denominazione_regione}</td>
                        <td>${json[i].dimessi_guariti}</td>
                        <td>${json[i].deceduti}</td>
                        <td>${json[i].totale_casi}</td>
                        <td>${json[i].nuovi_positivi}</td>
                    </tr> `
        var table = $('#table-body');
        table.append(row);

    }


}
