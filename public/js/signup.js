async function postSignup(name, lastname, age, username, password) {
    const data = {
        name,
        lastname,
        age,
        email: username,
        password,
    };

    const response = await fetch("/api/session/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
}

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", function (event) {
    console.log("tracking");
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const age = document.getElementById("age").value;

    postSignup(name, lastname, age, username, password).then((datos) =>
        console.log(datos)
    );
});