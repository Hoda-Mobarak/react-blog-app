import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePosts } from '../services/PostServices';
import PostCard from '../components/PostCard';
import LoadingScreen from '../components/LoadingScreen';

export default function PostDetailsPages() {

   let { id } = useParams();

   console.log(id);
   
   const [post, setPost] = useState(null);

   async function getPosts() {
      const response = await getSinglePosts(id);
      if (response.message) {
         setPost(response.post);
      }
   }

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <>
        
        <div className=" w-full md:w-4/6  mx-auto py-5">
          {post ? <PostCard post={post}
          
          commentLimit={post.comments.length}
          callback={getPosts}
          /> : <LoadingScreen />}
        </div>
      </>
   );
}
