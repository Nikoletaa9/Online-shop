const apiUrl = 'http://139.59.155.78/Product';

async function fetchRocks() {
    let rocksStorage = localStorage.getItem('rocks');

    if (rocksStorage == null || rocksStorage == '[]') {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        let rocks = await response.json();
        localStorage.setItem('rocks', JSON.stringify(rocks));

        return rocks;
    }
    else {
        return JSON.parse(rocksStorage);
    }
};

fetchRocks().then(rocks => {
    var rocksTable = document.getElementById("rocks");

    for (var j = 0; j <= (rocks.length - 1) / 3; j++) {
        var tr = document.createElement('tr');

        let i = 0;
        for (i = j * 3 + i; i < j * 3 + 3; i++) {
            const rock = rocks[i];
            if (rock != null) {
                var wrapper = document.createElement("div")
                wrapper.id = rock.id;

                var img = document.createElement("img");
                img.src = "../Images/" + rock.image;
                img.width = 250;
                img.height = 200;
                wrapper.appendChild(img);

                var rockName = document.createElement("h3");
                rockName.innerHTML = rock.name;
                wrapper.appendChild(rockName);

                var price = document.createElement("h4");
                price.innerHTML = "Price: $" + rock.price;
                wrapper.appendChild(price);

                var buyButton = document.createElement("button");
                buyButton.innerHTML = "Buy Now";
                wrapper.appendChild(buyButton);

                var editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                editButton.setAttribute("class", "editbtn");
                wrapper.appendChild(editButton);

                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = async function () {
                    const response = await fetch(apiUrl + "/" + rock.id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                        },
                    });

                    if (response.ok === true) {
                        var rockToRemove = document.getElementById(rock.id);
                        rockToRemove.parentElement.removeChild(rockToRemove);

                        let rocksStorage = localStorage.getItem('rocks');
                        let rocksData = JSON.parse(rocksStorage);
                        rocksData = rocksData.filter(x => x.id != rock.id);
                        localStorage.clear();
                        localStorage.setItem('rocks', JSON.stringify(rocksData));
                    }
                };
                wrapper.appendChild(deleteButton);

                tr.appendChild(wrapper);
            }
        }

        rocksTable.appendChild(tr);
    }
});

async function fillData() {
    var data = [
        {
            name: "aplite",
            image: "aplite.jpg",
        },
        {
            name: "augite",
            image: "augite.gif",
        },
        {
            name: "basalt",
            image: "basalt.jpg",
        },
        {
            name: "carbonatite",
            image: "carbonatite.jpg",
        },
        {
            name: "diorite",
            image: "diorite.jpg",
        },
        {
            name: "gabbro",
            image: "gabbro.jpg",
        },
        {
            name: "granodiorite",
            image: "granodiorite.jpg",
        },
        {
            name: "hornblendite",
            image: "hornblendite.jpg",
        },
        {
            name: "ijolite",
            image: "ijolite.jpg",
        },
        {
            name: "Spodumene",
            image: "Spodumene.gif",
        },
        {
            name: "talc",
            image: "talc.gif",
        },
        {
            name: "Wollastonite",
            image: "Wollastonite.jpg",
        }
    ]

    const promises = data.map(rock => {
        var payload = {
            Name: rock.name,
            Price: getRandomInt(100),
            Image: rock.image
        };

        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    });

    const response = await Promise.all(promises);

    location.reload();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}