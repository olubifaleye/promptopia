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
    
    // pull session data using useSession
    const { data: session } = useSession();

    //initiate providers to null
    const [providers, setProviders ] = useState(null);

    //initiates toggle state to fasle
    // (prev) => !prev sets toggle state to true in line 115
    const [toggleDropdown, setToggleDropdown] = useState(false);

    //set providers with useEffect hook 
    //callback function only runs at the start
    //Used to allow signIn with google and next auth
    useEffect(() =>{

        const setUpProviders = async () => {
            const response = await getProviders();

            //once response is collected, set providers to response
            setProviders(response);
        }

        setUpProviders();
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

            {/* Session to check if user exists */}    
            { session?.user ? (
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
                                    src={session?.user.image}
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
            {session?.user ? (
                <div className="flex">
                    <Image
                        src={session?.user.image}
                        alt="Profile Picture"
                        width={37}
                        height={37}
                        className="rounded-full"
                        onClick={() => setToggleDropdown ((prev) => !prev)}
                    />

                    {/* Toggle Mobile Dropdown Navigation to show Links */}
                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link
                                href="/profile"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>

                            <Link
                                href="/create-prompt"
                                className="dropdown_link"
                                onClick={() => setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>

                            <button
                                type="button"
                                onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }}
                                className="mt-5 w-full black_btn"
                            >
                                Sign Out
                            </button>  
                        </div>
                    )}
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