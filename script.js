document.addEventListener("DOMContentLoaded", () => {
    loadItems();

    document.getElementById("addForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const quantity = document.getElementById("quantity").value;
        const price = document.getElementById("price").value;

        fetch('add_item.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, quantity, price })
        }).then(() => {
            loadItems();
            e.target.reset();
        });
    });
});

function loadItems() {
    fetch('get_items.php')
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('itemsTable');
            table.innerHTML = '';
            data.forEach(item => {
                table.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>
                            <button onclick="deleteItem(${item.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function deleteItem(id) {
    fetch('delete_item.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    }).then(() => loadItems());
}