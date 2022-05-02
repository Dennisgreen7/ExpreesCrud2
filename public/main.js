
const updateBtn = document.getElementById('updateBtn');
const achacvQuote = {
    name: 'Achav',
    quote: 'אל יתהלל חוגר כמפתח'
};
updateBtn.addEventListener('click', () => {
    fetch('/quotes',
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(achacvQuote)
        }
    )
})

const deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', () => {
    let response = fetch('/quotes',
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Achav' })
        }
    )
})
