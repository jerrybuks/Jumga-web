const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export default function formatDate(dt){
    return `${dt.getDate()} ${months[(dt.getMonth())]} ${dt.getFullYear()}`;

}