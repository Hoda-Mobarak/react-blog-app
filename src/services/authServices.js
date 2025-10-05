import axios from "axios";




export async function getUserDataApi() {

   
    try {
         let {data}=await axios.get(`https://linked-posts.routemisr.com/users/profile-data` , {
            headers:{
                token:localStorage.getItem('token')
            }
         });
    console.log(data);
    return data
        
    } catch (error) {
        console.log(error.response.data);
        return  error.response.data
        
    }
    
    
}


export async function sendRegister(userData) {

   
    try {
         let {data}=await axios.post(`https://linked-posts.routemisr.com/users/signup` , userData);
    console.log(data);
    return data
        
    } catch (error) {
        console.log(error.response.data);
        return  error.response.data
        
    }
    
    
}










export async function sendLogin(userData) {

   
    try {
         let {data}=await axios.post(`https://linked-posts.routemisr.com/users/signin` , userData);
    console.log(data);
    return data
        
    } catch (error) {
        console.log(error.response.data);
        return  error.response.data
        
    }
    
    
}