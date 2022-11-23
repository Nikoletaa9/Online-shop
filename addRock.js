const apiUrl = 'http://139.59.155.78/Product';

const submitBtn = document.getElementById('submit');
const name = document.getElementById('name')
const price = document.getElementById('price')
const image = document.getElementById('image')

function updateSubmitBtn() {
    const nameValue = name.value.trim();
    const priceValue = price.value.trim();
    const imageValue = image.value.trim();

    if (nameValue && priceValue && imageValue) {
        submitBtn.removeAttribute('disabled');
    } else {
        submitBtn.setAttribute('disabled', 'disabled');
    }
}

name.addEventListener('change', updateSubmitBtn);
price.addEventListener('change', updateSubmitBtn);
image.addEventListener('change', updateSubmitBtn);

async function addRock(event) {
    event.preventDefault();

    var payload = {
        Name: name.value.trim(),
        Price: price.value.trim(),
        Image: image.value.trim()
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (response.ok === true)
        window.location.href = 'products.html';
}