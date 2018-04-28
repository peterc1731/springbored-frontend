const baseUrl = "http://localhost:3001/api"

const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

function callAPI (method, path, body = null) {
    return fetch( baseUrl + path, {
        method: method,
        headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        body: body ? JSON.stringify(body) : {}
    }).then(response => response.json())
}

export { monthNames, callAPI }