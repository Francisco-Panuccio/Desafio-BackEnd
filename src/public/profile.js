fetch(`/api/users/current`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data)
});