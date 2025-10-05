import axios from "axios";


  export async function getAllPosts() {

   
    try {

         const {data}=await axios.get(`https://linked-posts.routemisr.com/posts`,
        {
            headers:{
                token: localStorage.getItem('token')
            },
            params:{
                limit:15,
                sort:'-createdAt'
            }
        }

       
        
    )
     console.log(data);
     return data
        
    } catch (error) {
        console.log(error);
        
        
    }
    



 }

 
  export async function getSinglePosts(postId) {

   
    try {

         const {data}=await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`,
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









 export async function createPostApi( formData) {

   
    try {

         const {data}=await axios.post(`https://linked-posts.routemisr.com/posts`,formData, {
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








 export async function updatePostApi(postId, formData) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log("update:", data);
    return data;
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}





export async function deletePostApi(postId) {
  try {
    const { data } = await axios.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}