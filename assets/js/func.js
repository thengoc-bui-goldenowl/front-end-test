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

//
function select_count() {
    pagination.current_page=1;
    pagination.update_total_page();
    console.log (pagination.update_total_page())
    pagination.load_page_number();
    //load_data(project, count_row, 0);
    pagination.load_data(0);
    filter();
    pagination.change_page();
}
function filter() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    current_page = 1;
    pagination.update_total_page();
    pagination.load_page_number();
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    pagination.load_data(-1);
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
class Pagination {
    constructor(data, count_row, current_page){
        this.count_row=count_row;
        this.data=data;
        this.current_page=current_page;
        this.total_page=total_page
    }
    update_total_page() {
        let select = document.getElementById('count');
        this.count_row = select.options[select.selectedIndex].value;
        this.total_page = Math.ceil(this.data.length / this.count_row);
        return this.total_page
        
    }
    btn_next(){
        var btn_next = document.querySelector('.btn-next');
        btn_next.addEventListener('click', () => {
            //current_page++;
            if (this.current_page < this.update_total_page()) {
                this.current_page++;
            }
            this.update_total_page();
            var start = (this.current_page - 1) * this.count_row
            this.load_data(start);
            $('.page-number li').removeClass('active')
            $(`.page-number li:nth-child(${this.current_page})`).addClass('active');
        
        })
    }
    btn_pre(){
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
        for (let k in this.data) {
            if (k < end && k >= start || start == -1) {
                html += '<td>' + this.data[k].id + '</td>';
                html += '<td><a href="' + this.data[k].link + '">' + this.data[k].name + '</a></td>';
                html += '<td>' + this.data[k].des + '</td>';
                html += '<td>' + this.data[k].start + '</td>';
                html += '<td>' + this.data[k].end + '</td>';
                html += '<td>';
                for (let i in this.data[k].Dev) {
                    html += '<a href="' + this.data[k].Dev[i].link + '">' + this.data[k].Dev[i].name + ' </a>';
                }
                html += '</td>';
                html += '<td><div class="btn-group-sm"><button type="button" class="btn btn-primary">Update</button><button type="button" class="btn btn-danger">Remove</button></div></td>';
                html += '</tr>';
            }
        }
        document.getElementById("table").innerHTML = html;
    }
    change_page(){
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

}
let pagination= new Pagination(data.project,count_row,1)
pagination.load_data(0)
pagination.btn_pre();
pagination.btn_next();
pagination.change_page();
pagination.load_page_number();
pagination.load_data(0);
