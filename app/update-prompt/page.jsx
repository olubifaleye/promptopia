"use client"

//imports
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {

    const router = useRouter();  
    
    //search and get id for a prompt
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');    

    //States for the form
    const [submitting, setSubmitting] = useState(false);
    const[post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    //
    useEffect(() => {

        // function to get prompt details based on the prompt id
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)

            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        // call function if the promptId exists
        if(promptId){
            getPromptDetails();
        }
    }, [promptId])

    //function to create a prompt
    const updatePrompt = async (e) => {
        //prevents browser from reloading (default behaviour)
        e.preventDefault();

        setSubmitting(true);

        if(!promptId){
            return alert("Prompt ID not found")
        }

        try {
            //call api PATCH request
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt