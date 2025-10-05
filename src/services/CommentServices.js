import axios from "axios";



 export async function createCimmentApi( commentContent,postId) {

   
    try {

         const {data}=await axios.post(`https://linked-posts.routemisr.com/comments`,{
           content:commentContent,
           post:postId
         },
        {
            headers:{
                token: localStorage.getItem('token')
            }
        }

       
        
    )
     console.log(data);
     return data
        
    } catch (error) {
        console.log(error);
        
        
    }
    
 }










 export async function deleteCommentApi( commentId) {

   
    try {

         const {data}=await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`,
        {
            headers:{
                token: localStorage.getItem('token')
            }
        }

       
        
    )
     console.log(data);
     return data
        
    } catch (error) {
        console.log(error);
        
        
    }
    
 }








 export async function getPostCommentApi(postId) {

   
    try {

         const {data}=await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`,
        {
            headers:{
                token: localStorage.getItem('token')
            }
        }

       
        
    )
     console.log(data);
     return data
        
    } catch (error) {
        console.log(error);
        
        
    }
    
 }