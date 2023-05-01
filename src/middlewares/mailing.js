export async function mailing(req, res, next){
    fetch('/api/users/mailing')
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
    next()
}