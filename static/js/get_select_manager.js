$(document).ready(function() {
    function getSelectManager() {
        $.getJSON('/get_select_manager', function(data) {
            const $managerSearch = $('#managerSearch');
            const $managerList = $('#managerList');

            const showDropdown = () => {
                $managerList.show();
            };

            const hideDropdown = () => {
                $managerList.hide();
            };

            const populateList = (searchValue = '') => {
                $managerList.empty(); // Clear existing options
                data.forEach(item => {
                    const fullName = `${item.manager_firstname} ${item.manager_lastname}`;
                    if (fullName.toLowerCase().includes(searchValue)) {
                        const $li = $('<li></li>')
                            .text(fullName)
                            .attr('data-value', item.id)
                            .addClass('text-muted small'); // Add the Bootstrap class
                    
                        $li.on('click', () => {
                            $managerSearch.val(fullName);
                            hideDropdown();
                            // Handle selection if needed
                            const selectManagerID = item.id;
                            $('#managerID').val(selectManagerID);
                        });
                    
                        $managerList.append($li);
                    }
                });
            };

            $managerSearch.on('focus click', () => {
                populateList();
                showDropdown();
            });

            $managerSearch.on('input', () => {
                const searchValue = $managerSearch.val().toLowerCase();
                populateList(searchValue);
            });

            // Hide the dropdown if clicked outside
            $(document).on('click', function(event) {
                if (!$(event.target).closest('.custom-select-wrapper').length) {
                    hideDropdown();
                }
            });
        }).fail(function(error) {
            console.error('Error fetching data:', error);
        });
    }
// asasasas
    getSelectManager();
});
