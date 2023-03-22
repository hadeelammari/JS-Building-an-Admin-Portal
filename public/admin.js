async function getBooks() {
    let retrieve = await fetch('http://localhost:3001/listBooks');
    let books = await retrieve.json();
    console.log(books);
    books.forEach(adminList);
    attachListeners(books);
}

function adminList(book) {
    let adminContainer = document.getElementById('root');
    $(adminContainer).append(`
    <li>${book.title}</li>
    <input type="text" name="inventory" id="inventory-${book.id}" value="${book.quantity}">
    <button id="save-button-${book.id}">Save</button>
    `);
}


function attachListeners(books) {
    books.forEach(book => {
    const button = document.getElementById(`save-button-${book.id}`);
    button.addEventListener('click', () => updateInventory(book.id));
    });
}

async function updateInventory(bookId) {
    const inventory = document.getElementById(`inventory-${bookId}`).value;
    console.log(`Updating inventory for book ${bookId} to ${inventory}`);

    let response = await fetch(`http://localhost:3001/updateBook`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
        id: bookId,
        'quantity': inventory
    })
    });
    console.log(response)
}


getBooks();
