async function userListController() {
    let response = await fetch("http://localhost:3000/api/users");
    let result = await response.json();
    let users = result.data;
    userListView(users);
    return users;
}

function userListView(users){
    let table = document.getElementById("usertable");
    let view = `<thead><tr><th>User ID</th>` +
        `<th>Username</th>` +
        `<th>Last Name</th>` +
        `<th>First Name</th>` +
        `<th>Email</th>` +
        `<th>Urole</th></tr></thead>`;

    users.forEach(user => {
        view = view +
            `<tr><td>${user['userID']}</td>` +
            `<td>${user['username']}</td>` +
            `<td>${user['lastname']}</td>` +
            `<td>${user['firstname']}</td>` +
            `<td>${user['email']}</td>` +
            `<td>${user['urole']}</td></tr>`;
    });

    table.innerHTML = view;
}

document.addEventListener('DOMContentLoaded', () => {
    userListController();

    const refreshBtn = document.getElementById('refresh');
    if(refreshBtn){
        refreshBtn.addEventListener('click', userListController);
    }

    const form = document.getElementById('addUserForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData.entries());
        console.log("Front-end data:", data);

        try{
            const response = await  fetch('/api/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if(response.ok){
                form.reset();
                console.log('Successful');
                userListController();
            }else{
                console.error('Server Error:', result.message || 'Failed to create user');
            }

        }catch(error){
            console.error('Error');
        }
    });
});