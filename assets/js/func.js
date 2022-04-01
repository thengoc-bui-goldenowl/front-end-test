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
    ],
    "dev": [
        { "id": "1", "name": "Doe", "link": "#a", "Status": "0" },
        { "id": "1", "name": "Pe", "link": "#a", "Status": "1" },
        { "id": "1", "name": "Da Ve", "link": "#a", "Status": "0" },
        { "id": "1", "name": "Da Ve", "link": "#a", "Status": "0" }
    ]
};
const count_default = document.getElementById('count').value;
var total_project = data.project.length;
var count_row = count_default;
var total_page = Math.ceil(total_project / count_row);;
var current_page = 1;
var project = data.project;
var dev = data.dev;
var dataSearchDate = [];
var dataSearchProject = [];
var pagination
    //// Pagination
class Pagination {
    constructor(data, count_row, current_page, showValue) {
        this.count_row = count_row;
        this.showValue = showValue;
        this.data = data;
        this.current_page = current_page;
        this.total_page = total_page;
        this.btn_pre();
        this.btn_next();
        this.update_total_page();
        this.load_page_number();
        this.load_data(0);
        this.change_page();
    }
    update_total_page() {
        let select = document.getElementById('count');
        this.count_row = select.options[select.selectedIndex].value;
        this.total_page = Math.ceil(this.data.length / this.count_row);
        return this.total_page, this.count_row

    }
    btn_next() {
        var btn_next = document.querySelector('.btn-next');
        btn_next.addEventListener('click', () => {
            //current_page++;
            if (this.current_page < this.total_page) {
                this.current_page++;
            }
            this.update_total_page();
            var start = (this.current_page - 1) * this.count_row;
            this.load_data(start);
            $('.page-number li').removeClass('active')
            $(`.page-number li:nth-child(${this.current_page})`).addClass('active');

        })
    }
    btn_pre() {
        let btn_pre = document.querySelector('.btn-pre');
        btn_pre.addEventListener('click', () => {
            // current_page--;
            if (this.current_page > 1) {
                this.current_page--;

            } else {
                $('.btn-pre').prop('disabled', true)
            }
            this.update_total_page();
            var start = (this.current_page - 1) * this.count_row;
            this.load_data(start)
            $('.page-number li').removeClass('active')
            $(`.page-number li:nth-child(${this.current_page})`).addClass('active');
        })
    }

    load_data(start) {
        let html = '<tr>';
        let end = parseInt(this.count_row) + parseInt(start);
        let dataView;
        console.log(start, end);
        dataView = this.data.slice(start, end);
        if (this.showValue == 0) {
            //console.log(dataView[1].id)
            for (let k in dataView) {

                html += `<td>${dataView[k].id}</td>
                <td><a href="${dataView[k].link}">${dataView[k].name}</a></td>
                <td>${dataView[k].des}</td>
                <td>${dataView[k].start}</td>
                <td>${dataView[k].end}</td>
                <td>`
                for (let i in dataView[k].Dev) {
                    html += `<a href="${dataView[k].Dev[i].link}">${dataView[k].Dev[i].name}</a>`
                }
                html += `</td>
                <td><div class="btn-group-sm"><button type="button" class="btn btn-primary btn-func">Update</button><button type="button" class="btn btn-danger">Remove</button></div></td>
                </tr>`;

            }
        } else {
            for (let k in dataView) {

                html += `<td>${dataView[k].id}</td>
                <td><a href="${dataView[k].link}">${dataView[k].name}</a></td>
                <td>${dataView[k].Status}</td>
                <td><div class="btn-group-sm"><button type="button" class="btn btn-primary btn-func">Update</button><label class="switch"><input type="checkbox" checked><span class="slider round"></span></label></div></td>
                </tr>`

            }
        }
        document.getElementById("table").innerHTML = html;
    }
    change_page() {
        let current_pages = document.querySelectorAll('.page-number li');
        for (let i = 0; i < current_pages.length; i++) {
            current_pages[i].addEventListener('click', () => {
                this.current_page = i + 1;
                this.load_data(i * this.count_row)
                $('.page-number li').removeClass('active')
                $(`.page-number li:nth-child(${this.current_page})`).addClass('active');
            })
        }
    }
    load_page_number() {
        let html = '<li class="page-item active"><a class="page-link" href="#">1</a></li>';
        for (let i = 2; i <= this.total_page; i++) {
            html += '<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>';
        }
        document.getElementById('page-number').innerHTML = html;
    }
    setUp() {
        this.update_total_page();
        this.load_page_number();
        this.load_data(0);
        this.change_page();
    }

}
// select number of row
function select_count() {
    var count_row = document.getElementById('count').value;
    pagination.current_page = 1;
    pagination.count_row = count_row;
    pagination.setUp();
    filter();
}

// select project/dev
function selectShow() {

    var selectShowValue = document.getElementById('selectShow').value;
    let html = "";
    if (selectShowValue == "0") {
        headerName.innerText = "Project";
        headerLink.innerText = "Project";
        projectName.innerText = "Project List";
        html += `<tr><th>ID</th><th>Name</th><th>Description</th><th>Start Date</th>
        <th>End Date</th><th>Dev</th><th>Action</th></tr>`;
        document.getElementById("thead").innerHTML = html;
        pagination = new Pagination(data.project, count_row, 1, 0);
    } else {
        headerName.innerText = "Developer";
        headerLink.innerText = "Developer";
        projectName.innerText = "Developer List";
        html += `<tr><th>ID</th><th>Fullname</th><th>Status</th>
        <th>Action</th></tr>`;
        document.getElementById("thead").innerHTML = html;
        pagination = new Pagination(data.dev, count_row, 1, 1);
    }
}

function filter() {
    var input, filter, table, tr, td, i, txtValue;
    dataSearchProject = [];
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    let dataFilter = pagination.data;
    console.log("a", dataFilter)
    for (let i in dataFilter) {
        if (dataFilter[i].name.toUpperCase().indexOf(filter) > -1) {
            dataSearchProject.push(dataFilter[i]);
        }
    }
    console.log(dataSearchProject)
    let paag = new Pagination(dataSearchProject, count_row, 1, parseInt(document.getElementById('selectShow').value))
}
//get tr
function get_tr() {
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    return tr;

}

selectShow();

$(function() {
    $(".datepicker").datepicker({
        dateFormat: 'mm/dd/yy'
    });
});
$('#btnSearchDate').on('click', function() {
    var dataSearchDate = [];
    var startDate = new Date($('#startDate').val());
    var endDate = new Date($('#endDate').val());
    dataSearchDate = project.filter(function(i) {
        var startDateProject = new Date(i.start);
        var endDateProject = new Date(i.end);
        return startDateProject >= startDate && startDateProject <= endDate || endDateProject >= startDate && endDateProject <= endDate
    });
    console.log(dataSearchDate)
    pagination.data = dataSearchDate;
    pagination.current_page = 1;
    pagination.setUp();
});
$('#btnClearSearchDate').on('click', function() {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('search').value = '';
    dataSearchDate = [];
    let select = parseInt(document.getElementById('selectShow').value);
    if (select == 0) {
        pagination = new Pagination(project, count_row, 1, 0);

    } else {
        pagination = new Pagination(dev, count_row, 1, 1);
    }
})