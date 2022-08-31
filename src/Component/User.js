import {base} from "../url";

async function getAllUser(){
    return await fetch(`${base}/User`).then(response => response.text())
 }
 async function addUser( user ){
     var formdata = new FormData();
     formdata.append("name",user.name)
     formdata.append("dateOfBirth",user.dateOfBirth)
     formdata.append("phoneNumber",user.phoneNumber)
     formdata.append("address",user.address)
     formdata.append("class",user.class)
     var requestOptions = {
         method: 'POST',
         body: formdata,
     };
    return await fetch(`${base}/User`,requestOptions).then(response => response.text())
 }
 async function updateUser( user ){
     var formdata = new FormData();
     formdata.append("name",user.name)
     formdata.append("dateOfBirth",user.dateOfBirth)
     formdata.append("phoneNumber",user.phoneNumber)
     formdata.append("address",user.address)
     formdata.append("class",user.class)
     var requestOptions = {
         method: 'POST',
         body: formdata,
     };
    return await fetch(`${base}/User/${user.id}`,requestOptions).then(response => response.text())
 }
async function deleteUser(index){
    var requestOptions = {
        method: 'DELETE',
    };
    return await fetch(`${base}/User/${index}`,requestOptions).then(response => response.text())
 }

export function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export class User {
    id:string
    name: string
    dateOfBirth: string
    phoneNumber: string
    address: string
    class: string
    constructor(item) {
        const date = new Date(Date.parse(item.dateOfBirth));
        this.id = item.id
        this.name = item.name
        this.dateOfBirth = date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear()
        this.phoneNumber = item.phoneNumber
        this.address = item.address
        this.class = item.class
    }

}
export {getAllUser,deleteUser,addUser,updateUser}