"use client"

//imports
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {

    const router = useRouter();
    const { data: session} = useSession();    

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

        setSubmitting(true);

        try {
            //call api POST request
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })
            
            //check if response is ok
            if (response.ok){
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
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