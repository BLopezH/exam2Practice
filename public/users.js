async function userListController() {
    let response = await fetch("http://localhost:3000/users");
    let users = await response.json();
    userListView(users);
    return users;
}

function userListView(users) {
    let table = document.getElementById("usertable");
    let view = `<thead><tr><th>User ID</th>` +
        `<th>Username</th>` +
        `<th>Last Name</th>` +
        `<th>First Name</th>` +
        `<th>Email</th>` +
        `<th>Urole</th></tr></thead>`;

    users.forEach(user => {
        view = view + `<tr><td>${user['User ID']}</td>` +
            `<td>${user['username']}</td>` +
            `<td>${user['lastname']}</td>` +
            `<td>${user['firstname']}</td>` +
            `<td>${user['email']}</td>` +
            `<td>${user['urole']}</td></tr>`;
    });

    table.innerHTML = view;
}
