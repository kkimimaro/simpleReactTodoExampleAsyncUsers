import React from "react";

async function getUsers(userIds) {
    let users = [];

    for(let userId of userIds) {
        let user = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
            response => {
                if (response.status !== 200) {
                    return null;
                } else {
                    return response.json();
                }
            },
            errorResponse => {
                return null;
            }
        );
        users.push(user);
    }

    return await Promise.all(users);
}

function GetUsers() {

    function onSubmitHandle(event) {
        event.preventDefault();

        let checkArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        console.log(getUsers(checkArray));
    }

    return (
        <form style={{ marginBottom: "1rem"}} onSubmit={onSubmitHandle}>
            <button id="usrBtn" className="button" type="submit">Get Users Async</button>
        </form>
    );
}

export default GetUsers;
