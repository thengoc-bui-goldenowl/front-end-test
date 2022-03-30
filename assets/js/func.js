const project = {

    "project": [{ "id": "1", "link": "#1", "name": "Doe", "des": "d1", "start": "12/12/2019", "end": "1/3/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Pe", "link": "#b" }] },
        { "id": "2", "link": "#2", "name": "Kai", "des": "d1", "start": "12/1/2019", "end": "1/3/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Doe", "link": "#a" }] },
        { "id": "3", "link": "#3", "name": "Kid", "des": "d1", "start": "12/4/2019", "end": "1/1/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Doe", "link": "#a" }] },
        { "id": "4", "link": "#4", "name": "Gin", "des": "d1", "start": "12/2/2019", "end": "1/3/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Doe", "link": "#a" }] },
        { "id": "5", "link": "#5", "name": "Lao", "des": "d1", "start": "12/5/2019", "end": "1/3/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Doe", "link": "#a" }] },
        { "id": "6", "link": "#6", "name": "Mana", "des": "d1", "start": "12/12/2019", "end": "1/3/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Doe", "link": "#a" }] },
        { "id": "7", "link": "#7", "name": "Near", "des": "d1", "start": "12/12/2019", "end": "1/3/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Doe", "link": "#a" }] },
        { "id": "8", "link": "#8", "name": "Zoro", "des": "d1", "start": "12/12/2019", "end": "1/3/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Doe", "link": "#a" }] },
        { "id": "9", "link": "#9", "name": "Sasuke", "des": "d1", "start": "12/12/2019", "end": "1/3/2020", "Dev": [{ "name": "Doe", "link": "#a" }, { "name": "Doe", "link": "#a" }] }
    ]
};
/*for (var k in project.project) {
    for (var i in project.project[k].Dev) {
        console.log(project.project[k].Dev[i])
    }
}
console.log("Hello")
*/
const count_default = 3;
const total_project = 9;
var value = count_default;
var total_page = Math.ceil(total_project / value);

load_data(project.project, count_default);
// set number of showing
function select_count() {
    var select = document.getElementById('count');
    value = select.options[select.selectedIndex].value;
    load_data(project.project, value);
    total_page = Math.ceil(total_project / value);
    console.log(total_page);
}
//load data to table
function load_data(data, value) {
    html = '<tr>';
    for (let k in data) {
        if (k < value) {
            html += '<td>' + data[k].id + '</td>';
            html += '<td><a href="' + data[k].link + '">' + data[k].name + '</a></td>';
            html += '<td>' + data[k].des + '</td>';
            html += '<td>' + data[k].start + '</td>';
            html += '<td>' + data[k].end + '</td>';
            html += '<td>';
            for (let i in data[k].Dev) {
                html += '<a href="' + data[k].Dev[i].link + '">' + data[k].Dev[i].name + ' </a>';
            }
            html += '</td>';
            html += '<td><div class="btn-group-sm"><button type="button" class="btn btn-primary">Update</button><button type="button" class="btn btn-danger">Remove</button></div></td>';
            html += '</tr>';
        }
    }
    document.getElementById("table").innerHTML = html;
}


function filter() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}