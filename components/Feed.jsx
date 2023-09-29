"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

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

const Feed = () => {

  //create use state for state of searched text
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  // function to fetch posts 
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);
  }

  //function to handle states of posts
  const [posts, setPosts] = useState([]);

  //callback function as soon as the page loads
  useEffect(() => {
  
      // call fetchPosts
      fetchPosts();
      
  }, []);

  //function to filter the prompts
  const filterPrompts = (searchtext) => {
    // use 'i' flag for case sensitive search
    const regex = new RegExp(searchtext, "i");
    
    return posts.filter(
      (item) =>
          regex.test(item.creator.username) || 
          regex.test(item.tag) ||
          regex.text(item.prompt)
    );
  };

  //function to handle a search bar change
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout (() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // function to filter prompts for when a specific tag is clicked
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const tagSearchResult = filterPrompts(tagName)
    setSearchedResults(tagSearchResult);
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
      {searchText ? (
        <PromptCardList 
            data={posts}
            handleTagClick={handleTagClick}
        />
        ) : (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed