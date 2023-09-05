"use client"

//imports
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

//set PromptCard component with props
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  //add current session
  const {data: session} = useSession();

  //get current path name
  const pathName = usePathname();

  //get current route
  const router = useRouter();

  //use State to see if a prompt is copied
  const [copied, setCopied] = useState("");

  //function to copy posts
  const handleCopy = () => {
    
    //set setCopied to the selected post
    setCopied(post.prompt);

    //sets selected post to systems clipboard
    navigator.clipboard.writeText(post.prompt);

    //set a timeout for 3 seconds
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
            <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"> 
              <Image
                  src= {post.creator.image}
                  alt="user_image"
                  width={40}
                  height={40}
                  className="rounded-full object-contain"
              />

              <div className="flex flex-col">
                  <h3 className="font-satoshi font-semibold text-gray-90">
                    {post.creator.username}
                  </h3>

                  <p className="font-inter text-sm text-gray-500">
                    {post.creator.email}
                  </p>
              </div>

            </div>

            <div 
              className="copy_btn"
              onClick={handleCopy}
            >
              {/*If copied is equal to the current prompt, render tick svg else render render copy svg */}
              <Image 
                  src={copied === post.prompt
                    
                    ? '/assests/icons/teck.svg'
                    : '/assets/icons/copy.svg'
                  }
                  
                  width={12}
                  height={12}
              />

            </div>
        </div>

        <p className="my-4 font-satoshi text-sm text-gray-700">
            {post.prompt}
        </p>
        
        {/* Onclick function to allow users to see all posts for that tag 
            If you have the tag, we will be able to click it and show all posts for that tag
        */}
        <p 
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>

        {/* Check currently logged in user is the creator of a specific post and that
            and if they are in the profile page
        */}
        {session?.user.id === post.creator._id && pathName === '/profile' && (
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p
                className="font-inter text-sm green_gradient cursor-pointer"
                onClick={handleEdit}
              >
                Edit
              </p>

              <p
                className="font-inter text-sm orange_gradient cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </p>
            </div>

        )}

    </div>
  )
}

export default PromptCard