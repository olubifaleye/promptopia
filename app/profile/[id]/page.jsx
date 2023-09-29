"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {

    //variable to get users search params by name
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    //use state for users posts
    const [userPosts, setUserPosts] = useState([]);

    // use effect function for getting users posts 
    useEffect(() => {

        // async function to fetch posts
        const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        
        // sets user posts to the data fetched
        setUserPosts(data);
        };

        // if the id is the same as the users, fetch thier posts
        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
        />
    );
};

export default UserProfile;