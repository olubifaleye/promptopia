"use client"

//imports
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Form from "@components/Form";

const CreatePrompt = () => {

    //States for the form
    const [submitting, setSubmitting] = useState(false);
    const[post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    //function to create a prompt
    const createPrompt = async (e) => {
        //prevents browser from reloading (default behaviour)
        e.preventDefault();
    }

  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt