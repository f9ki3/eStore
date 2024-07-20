$(document).ready(function(){
    $('#fetch-data').click(function(){
        $.ajax({
            url: '/get_store', // Replace with your URL
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                // Handle success
                let data = response;          
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
            
            },
            error: function(xhr, status, error) {
                // Handle error
                $('#result').html('<p>Error: ' + error + '</p>');
            }
        });
    });
});