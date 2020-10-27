function loadData(callBackFunction) {
  const request = new XMLHttpRequest();
  request.open(
    "get",
    "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json"
  );
  request.onload = () => {
    try {
      const json = JSON.parse(request.responseText);
      callBackFunction(json);
    } catch (e) {
      console.log(e);
      console.warn("Could not retrieve data from the json :(");
    }
  };
  request.send();
}

function populateByDate(json) {
  json.sort((a, b) => b.data.localeCompare(a.data));
  var date = document.getElementById("date-input").value;
  date = !date ? json[0].data : date;
  var newData = json.filter((el) => el.data.startsWith(date));
  populateTable(newData);
}

function populateTable(data) {
  var table = $("#table-body");
  table.empty();
  data.forEach((element) => {
    var row = `<tr>
        <td>${element.denominazione_regione}</td>
        <td>${element.dimessi_guariti}</td>
        <td>${element.deceduti}</td>
        <td>${element.totale_casi}</td>
        <td>${element.nuovi_positivi}</td>
        </tr>`;
    table.append(row);
  });
}

function filterByRegion(data) {
  data.sort((a, b) => b.data.localeCompare(a.data));
  var filtered = data.filter((el) => el.data.startsWith(data[0].data))
  .filter((el) => el.denominazione_regione == document.getElementById("nome-regione").firstChild.data);
    populateFields(filtered);
}

function populateFields(data) {
  console.log(data);
  document.getElementById("box-casi-totali").firstChild.data = data[0].totale_casi; 
  document.getElementById("box-incremento-casi").firstChild.data = data[0].nuovi_positivi;
  document.getElementById("box-deceduti").firstChild.data = data[0].deceduti;
  document.getElementById("box-dimessi-guariti").firstChild.data = data[0].dimessi_guariti;
}

function displayName(name) {
  document.getElementById("nome-regione").firstChild.data = name;
}
