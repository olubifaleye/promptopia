"use client";

//Allows movement between pages of the app
import Link from "next/link";

//Auto optimizes images
import Image from "next/image";

//react hooks
import { useState, useEffect } from 'react';

//Imports for next auth
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Provider from "./Provider";

const Nav = () => {
    
    const isUserLoggedIn = true;

    //initiate providers to null
    const [providers, setProviders ] = useState(null);

    //set providers with useEffect hook 
    //callback function only runs at the start
    //Used to allow signIn with google and next auth
    useEffect(() =>{

        const setProviders = async () => {
            const response = await getProviders();

            //once response is collected, set providers to response
            setProviders(response);
        }

        setProviders();
    },  [])

    return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/images/logo.svg"
                alt="Promptopia Logo"
                width={30}
                height={30}
                className="object-contain"
            />    
            
            <p className="logo_text">Promptopia</p>
        </Link> 

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">

            {/* If user is logged in use ternary operator to display a div 
                that displays create post button, signout button and profile picture */}
                
            { isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                            <Link href="/create-prompt"
                                  className="black_btn">
                                            Create Post
                            </Link>

                            <button 
                                type="button" 
                                onClick={signOut}
                                className="outline_btn"
                            >
                                Sign Out
                            </button>

                            <Link href="/profile">
                                <Image
                                    src="/assets/images/logo.svg"
                                    alt="Profile Picture"
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                />
                            </Link>
                        </div>
                ) : (
                <>  
                    {/* If there is access to providers return a button for each signUp */}
                    {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                            Sign In
                            </button>
                        ))}
                </>
            )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
                <div className="flex">
                    <Image
                        src="/assets/images/logo.svg"
                        alt="Profile Picture"
                        width={37}
                        height={37}
                        className="rounded-full"
                        onClick={() => {}}
                    />
                </div>
            ) : (
            <>  
                {/* If there is access to providers return a button for each signUp */}
                {providers && 
                    Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                        Sign In
                        </button>
                    ))}
            </>
            )}
        </div>
    </nav>
  )
}

export default Nav