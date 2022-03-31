const data = {

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
const count_default = document.getElementById('count').value;
var total_project = data.project.length;
var count_row = count_default;
var total_page = Math.ceil(total_project / count_row);;
var current_page = 1;
var btn_next = document.querySelector('.btn-next');
var btn_pre = document.querySelector('.btn-pre');
var project = data.project;

load_data(project, count_default, 0);

function load_page_number() {
    let html = '<li class="page-item active"><a class="page-link" href="#">1</a></li>';
    let select = document.getElementById('count');
    let count_row = select.options[select.selectedIndex].value;
    let total_page = Math.ceil(total_project / count_row);
    console.log('total', total_page)
    for (let i = 2; i <= total_page; i++) {
        html += '<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>';
    }
    document.getElementById('page-number').innerHTML = html;
}

btn_next.addEventListener('click', () => {
    //current_page++;
    if (current_page < total_page) {
        current_page++;
    }
    var count_row = document.getElementById('count').value;
    var start = (current_page - 1) * count_row
    load_data(project, count_row, start);
    $('.page-number li').removeClass('active')
    $(`.page-number li:nth-child(${current_page})`).addClass('active');

})

btn_pre.addEventListener('click', () => {
    // current_page--;
    if (current_page > 1) {
        current_page--;

    } else {
        $('.btn-pre').prop('disabled', true)
    }
    var count_row = document.getElementById('count').value;
    var start = (current_page - 1) * count_row;
    load_data(project, count_row, start)
    $('.page-number li').removeClass('active')
    $(`.page-number li:nth-child(${current_page})`).addClass('active');
})
// get total_page
function total_page() {
    var count_row = document.getElementById('count');
    count_row = select.options[select.selectedIndex].value;
    return total_page = Math.ceil(total_project / count_row);
}


// set number of row
function select_count() {
    current_page = 1;
    let select = document.getElementById('count');
    var count_row = select.options[select.selectedIndex].value;
    load_data(project, count_row, 0);
    total_page = Math.ceil(total_project / count_row);
    load_page_number();
    filter();
}
//load data to table
function load_data(data, value, start) {
    html = '<tr>';
    let end = parseInt(value) + parseInt(start);
    console.log("a", value)
    for (let k in data) {
        if (k < end && k >= start || value == -1) {
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

//filter project
function filter() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    tr = get_tr();
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "none";
    }
    load_data(project, -1, 0);
    tr = get_tr();
    // Loop through all table rows, and hide those who don't match the search query
    var sum = 0;
    for (let j = 0; j < tr.length; j++) {

        let count = document.getElementById('count').value;
        td = tr[j].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[j].style.display = "";
                sum++;
            } else {
                tr[j].style.display = "none";
            }
        }
        if (sum > count) {
            tr[j].style.display = "none";
        }
    }
}
//get tr
function get_tr() {
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    return tr;

}
//change page
function change_page() {
    const current_pages = document.querySelectorAll('.page-number li');
    console.log(current_pages)
    for (let i = 0; i < current_pages.length; i++) {
        current_pages[i].addEventListener('click', () => {
            current_page = i + 1;
            load_data(project, count_row, i * count_row)
            $('.page-number li').removeClass('active')
    $(`.page-number li:nth-child(${current_page})`).addClass('active');
        })
    }
}

load_page_number();
change_page();