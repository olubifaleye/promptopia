"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"


const Feed = () => {

  //create use state for state of searched text
  const [searchText, setSearchText] = useState('');

  //function to handle states of posts
  const [posts, setPosts] = useState([]);

  //function to handle a search bar change
  const handleSearchChange = (e) => {

  }

  //callback function as soon as the page loads
  useEffect(() => {

      // function to fetch posts 
      const fetchPosts = async () => {
          const response = await fetch('/api/prompt');
          const data = await response.json();

          setPosts(data);
      }
      
      // call fetchPosts
      fetchPosts();
      
  }, []);

  // create component
  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
        {/*map function to get each individual post, for each post, return a self closing
           prompt card component */}
        {data.map((post) =>(
          <PromptCard 
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
          />
        ))}
      </div>
    )
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
            type="text"
            placeholder="Search for a tag or username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
        />
        
      </form>

      {/* Only used in this higher order component */}
      <PromptCardList 
          data={posts}
          handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed