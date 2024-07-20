const data = [
    { name: "John Doe", age: 25, city: "New York" },
    { name: "Jane Smith", age: 30, city: "San Francisco" },
    { name: "Alice Johnson", age: 28, city: "Los Angeles" },
    { name: "Chris Lee", age: 32, city: "Chicago" },
    { name: "Paul Walker", age: 40, city: "Houston" },
    { name: "Mary Brown", age: 22, city: "Phoenix" },
    { name: "Nancy Davis", age: 26, city: "Philadelphia" },
    { name: "Tom Harris", age: 35, city: "San Antonio" },
    { name: "Emily Clark", age: 29, city: "San Diego" },
    { name: "David Lewis", age: 37, city: "Dallas" },
    { name: "Megan Martinez", age: 24, city: "San Jose" },
    { name: "Steven White", age: 31, city: "Austin" },
    { name: "Sarah Thomas", age: 27, city: "Jacksonville" },
    { name: "James Anderson", age: 33, city: "Fort Worth" },
    { name: "Laura Moore", age: 21, city: "Columbus" },
    { name: "Robert King", age: 34, city: "Charlotte" },
    { name: "Patricia Jackson", age: 36, city: "Indianapolis" },
    { name: "Michael Gonzalez", age: 38, city: "Seattle" },
    { name: "Linda Hall", age: 39, city: "Denver" },
    { name: "Barbara Young", age: 23, city: "Washington" },
    { name: "Kevin Allen", age: 42, city: "Boston" },
    { name: "Karen Wright", age: 43, city: "El Paso" },
    { name: "Jessica King", age: 41, city: "Detroit" },
    { name: "Brian Scott", age: 44, city: "Nashville" },
    { name: "Susan Baker", age: 45, city: "Portland" },
    { name: "Daniel Rodriguez", age: 46, city: "Memphis" },
    { name: "Nancy Phillips", age: 47, city: "Oklahoma City" },
    { name: "Frank Perez", age: 48, city: "Las Vegas" },
    { name: "Kevin Allen", age: 42, city: "Boston" },
    { name: "Karen Wright", age: 43, city: "El Paso" },
    { name: "Jessica King", age: 41, city: "Detroit" },
    { name: "Brian Scott", age: 44, city: "Nashville" },
    { name: "Susan Baker", age: 45, city: "Portland" },
    { name: "Daniel Rodriguez", age: 46, city: "Memphis" },
    { name: "Nancy Phillips", age: 47, city: "Oklahoma City" },
    { name: "Frank Perez", age: 48, city: "Las Vegas" },
    { name: "Kevin Allen", age: 42, city: "Boston" },
    { name: "Karen Wright", age: 43, city: "El Paso" },
    { name: "Jessica King", age: 41, city: "Detroit" },
    { name: "Brian Scott", age: 44, city: "Nashville" },
    { name: "Susan Baker", age: 45, city: "Portland" },
    { name: "Daniel Rodriguez", age: 46, city: "Memphis" },
    { name: "Nancy Phillips", age: 47, city: "Oklahoma City" },
    { name: "Frank Perez", age: 48, city: "Las Vegas" },
    { name: "Kevin Allen", age: 42, city: "Boston" },
    { name: "Karen Wright", age: 43, city: "El Paso" },
    { name: "Jessica King", age: 41, city: "Detroit" },
    { name: "Brian Scott", age: 44, city: "Nashville" },
    { name: "Susan Baker", age: 45, city: "Portland" },
    { name: "Daniel Rodriguez", age: 46, city: "Memphis" },
    { name: "Nancy Phillips", age: 47, city: "Oklahoma City" },
    { name: "Frank Perez", age: 48, city: "Las Vegas" },
    { name: "Kevin Allen", age: 42, city: "Boston" },
    { name: "Karen Wright", age: 43, city: "El Paso" },
    { name: "Jessica King", age: 41, city: "Detroit" },
    { name: "Brian Scott", age: 44, city: "Nashville" },
    { name: "Susan Baker", age: 45, city: "Portland" },
    { name: "Daniel Rodriguez", age: 46, city: "Memphis" },
    { name: "Jessica King", age: 41, city: "Detroit" },
    { name: "Brian Scott", age: 44, city: "Nashville" },
    { name: "Susan Baker", age: 45, city: "Portland" },
    { name: "Daniel Rodriguez", age: 46, city: "Memphis" },
    { name: "Nancy Phillips", age: 47, city: "Oklahoma City" },
    { name: "Frank Perez", age: 48, city: "Las Vegas" },
    { name: "Kevin Allen", age: 42, city: "Boston" },
    { name: "Karen Wright", age: 43, city: "El Paso" },
    { name: "Jessica King", age: 41, city: "Detroit" },
    { name: "Brian Scott", age: 44, city: "Nashville" },
    { name: "Susan Baker", age: 45, city: "Portland" },
    { name: "Daniel Rodriguez", age: 46, city: "Memphis" },
    { name: "Nancy Phillips", age: 47, city: "Oklahoma City" },
    { name: "Frank Perez", age: 48, city: "Las Vegas" },
    { name: "Jessica Murphy", age: 49, city: "Louisville" },
    { name: "Charles Collins", age: 50, city: "Baltimore" },
    { name: "Sandra Martinez", age: 51, city: "Milwaukee" }
];

let currentPage = 1;
let rowsPerPage = 10;

document.getElementById('search').addEventListener('input', function() {
    currentPage = 1;  // Reset to the first page on search
    renderTable();
    setupPagination();
});

document.getElementById('itemsPerPage').addEventListener('change', function() {
    rowsPerPage = parseInt(this.value);
    currentPage = 1;
    renderTable();
    setupPagination();
});

function renderTable() {
    const tableBody = document.getElementById('tableBody');
    const searchText = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchText) ||
        item.age.toString().includes(searchText) ||
        item.city.toLowerCase().includes(searchText)
    );

    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    tableBody.innerHTML = '';
    paginatedData.forEach(item => {
        const row = `<tr>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.city}</td>
                     </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Update the info section with total items and items per page
    const totalItems = filteredData.length;
    document.getElementById('info').textContent = 
        `Showing ${Math.min(rowsPerPage, totalItems)} of ${totalItems} items.`;
}

function setupPagination() {
    const pagination = document.getElementById('pagination');
    const searchText = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchText) ||
        item.age.toString().includes(searchText) ||
        item.city.toLowerCase().includes(searchText)
    );

    const pageCount = Math.ceil(filteredData.length / rowsPerPage);
    pagination.innerHTML = '';

    // Previous Button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.classList.add('pagination-button', 'btn');
    if (currentPage === 1) prevButton.disabled = true;
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            setupPagination();
        }
    });
    pagination.appendChild(prevButton);

    // Add pagination buttons
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(pageCount, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button', 'btn');
        if (i === currentPage) button.classList.add('active', 'border-secondary');
        button.addEventListener('click', function() {
            currentPage = i;
            renderTable();
            setupPagination();
        });
        pagination.appendChild(button);
    }

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('pagination-button', 'btn');
    if (currentPage === pageCount) nextButton.disabled = true;
    nextButton.addEventListener('click', function() {
        if (currentPage < pageCount) {
            currentPage++;
            renderTable();
            setupPagination();
        }
    });
    pagination.appendChild(nextButton);
}

function sortTable(columnIndex) {
    const tableBody = document.getElementById('tableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const sortDirection = tableBody.dataset.sortDirection === 'asc' ? 'desc' : 'asc';
    tableBody.dataset.sortDirection = sortDirection;

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent;
        const bText = b.cells[columnIndex].textContent;
        return (aText > bText ? 1 : -1) * (sortDirection === 'asc' ? 1 : -1);
    });

    tableBody.innerHTML = '';
    rows.forEach(row => tableBody.appendChild(row));
}

document.addEventListener('DOMContentLoaded', function() {
    renderTable();
    setupPagination();
});