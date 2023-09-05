"use client"

//imports
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//Import profile component from components folder
import Profile from "@components/Profile";


const MyProfile = () => {

    const router = useRouter();

    const { data: session } = useSession();

    //state for specific users posts, initiate to be empty array
    const [posts, setPosts] = useState([]);
    
    //callback function as soon as the page loads
    useEffect(() => {

        // function to fetch current user in sessions posts 
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${
                session?.user.id}/posts`);
            const data = await response.json();

            setPosts(data);
        }
        
        // call fetchPosts if there is a user id for the correct posts
        if(session?.user.id){
            fetchPosts();
        }
        
    }, []);

    //function to edit a users own prompt post
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    //function to delete users own prompt post
    const handleDelete = async (post) => {
        
        //check if a user wants to delete a post
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        // delete posts
        if(hasConfirmed){
            try {
                await fetch (`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

            const filteredPosts = posts.filter((p) => p._id !== post._id)
            
            //set posts to the remaining posts after deletion
            setPosts(filteredPosts)

            } catch (error) {
                console.log(error);
            }
        }

    }

  return (
    <Profile
        name="My" 
        desc="Welcome to your profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;