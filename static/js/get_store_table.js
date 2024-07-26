function fetStoreTable() {
    $.ajax({
        url: '/get_store',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Ensure response is an array
            let data = Array.isArray(response) ? response : [];
            let currentPage = 1;
            let rowsPerPage = 10;
            let currentSortColumn = null;
            let currentSortDirection = 'asc';

            // Sort data by the latest first
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Event listener for search input
            $('#search').on('input', function() {
                currentPage = 1;  // Reset to the first page on search
                renderTable();
                setupPagination();
            });

            // Event listener for items per page dropdown
            $('#itemsPerPage').on('change', function() {
                rowsPerPage = parseInt(this.value, 10);
                currentPage = 1;
                renderTable();
                setupPagination();
            });

            function renderTable() {
                const tableBody = $('#tableBody');
                const searchText = $('#search').val().toLowerCase();
                const filteredData = data.filter(item =>
                    item.store_name.toLowerCase().includes(searchText) ||
                    item.address.toLowerCase().includes(searchText) ||
                    item.email.toLowerCase().includes(searchText)
                );

                if (filteredData.length === 0) {
                    tableBody.html('<tr><td colspan="6" style="text-align: center;">No items found.</td></tr>');
                } else {
                    const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

                    tableBody.empty();
                    paginatedData.forEach(item => {
                        const row = `<tr id="viewStore" data-store-id="${item.id}" style="font-size: 14px; cursor: pointer">
                                        <td class="store-image"><img class="border" style='border-radius: 10%; height: 40px; width: 40px' src='../static/store/${item.image}' alt='Store Image'></td>
                                        <td class="store-name">${item.store_name}</td>
                                        <td class="store-owner">${item.owner_name}</td>
                                        <td class="store-address">${item.address}</td>
                                        <td class="store-email">${item.email}</td>
                                        <td data-store-id="${item.id}" class="store-action" style="text-align: right; align-items: center;">
                                            <button style="background: transparent; border: none;">
                                                <i class="bi text-primary bi-pencil-square"></i>
                                            </button>
                                            <button id="deleteStore" style="background: transparent; border: none;" data-bs-toggle="modal" data-bs-target="#deleteStoreModal">
                                                <i class="bi text-danger bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                        
                        tableBody.append(row);
                    });
                }

                // Update info section with total items and items per page
                const totalItems = filteredData.length;
                $('#info').text(`Showing ${Math.min(rowsPerPage, totalItems)} of ${totalItems} items.`);
            }

            function setupPagination() {
                const pagination = $('#pagination');
                const searchText = $('#search').val().toLowerCase();
                const filteredData = data.filter(item =>
                    item.store_name.toLowerCase().includes(searchText) ||
                    item.owner_name.toLowerCase().includes(searchText) ||
                    item.address.toLowerCase().includes(searchText) ||
                    item.email.toLowerCase().includes(searchText)
                );

                const pageCount = Math.ceil(filteredData.length / rowsPerPage);
                pagination.empty();

                // Previous Button
                const prevButton = $('<button>Previous</button>')
                    .addClass('pagination-button btn')
                    .prop('disabled', currentPage === 1)
                    .on('click', function() {
                        if (currentPage > 1) {
                            currentPage--;
                            renderTable();
                            setupPagination();
                        }
                    });
                pagination.append(prevButton);

                // Page Buttons
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(pageCount, startPage + 4);

                if (endPage - startPage < 4) {
                    startPage = Math.max(1, endPage - 4);
                }

                for (let i = startPage; i <= endPage; i++) {
                    const button = $('<button></button>')
                        .text(i)
                        .addClass('pagination-button btn')
                        .toggleClass('active border-warning btn-warning', i === currentPage)
                        .on('click', function() {
                            currentPage = i;
                            renderTable();
                            setupPagination();
                        });
                    pagination.append(button);
                }

                // Next Button
                const nextButton = $('<button>Next</button>')
                    .addClass('pagination-button btn')
                    .prop('disabled', currentPage === pageCount)
                    .on('click', function() {
                        if (currentPage < pageCount) {
                            currentPage++;
                            renderTable();
                            setupPagination();
                        }
                    });
                pagination.append(nextButton);
            }

            function sortTable(columnIndex) {
                const tableBody = $('#tableBody');
                const rows = Array.from(tableBody.find('tr'));
                const sortDirection = currentSortColumn === columnIndex && currentSortDirection === 'asc' ? 'desc' : 'asc';
                currentSortColumn = columnIndex;
                currentSortDirection = sortDirection;

                rows.sort((a, b) => {
                    const aText = $(a).find('td').eq(columnIndex).text();
                    const bText = $(b).find('td').eq(columnIndex).text();
                    return (aText > bText ? 1 : -1) * (sortDirection === 'asc' ? 1 : -1);
                });

                tableBody.empty();
                rows.forEach(row => tableBody.append(row));
            }

            // Add event listeners to table headers for sorting
            $('#tableHead th').on('click', function() {
                const columnIndex = $(this).index();
                sortTable(columnIndex);
            });

            // Initialize table and pagination
            renderTable();
            setupPagination();
        },
        error: function(xhr, status, error) {
            // Handle error
            $('#result').html('<p>Error: ' + error + '</p>');
        }
    });
}

// /asasasass
fetStoreTable();


$(document).on('click', '#deleteStore', function() {
    // Get the data-store-id attribute from the parent <td> element
    const storeId = $(this).closest('td').attr('data-store-id');
    // Display the store ID in the #inputStoreID element
    $('#storeDeleteID').val(storeId);
    // alert('Store ID: ' + storeId); // Optional: For testing purposes
});

$(document).on('click', '#viewStore', function() {
    const storeId = $(this).data('store-id');
    $.ajax({
        url: '/get_view_store',
        type: 'GET',
        data: { id: storeId },
        success: function(response) {
            // Handle the response data
            $('#storeTable').hide()
            $('#viewStoreDiv, #backToStore').show()
        },
        error: function(xhr, status, error) {
            console.error('Error fetching store data:', error);
            showAlert('Server Error | 404', 'danger');
            // Handle the error
        }
    });
});

$(document).on('click', '#backToStore', function() {
    $('#storeTable').show()
    $('#viewStoreDiv, #backToStore').hide()
});