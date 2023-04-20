export const randomCode = () => {
    return((String(Math.random() * 256)).replace(/[.]/g,''))
}