
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
       
        {/*Use globals.css head_text css */}
        <h1 className="head_text text-center">
            Discover & Share
            {/* Hide on large devices, break content on small devices */}
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>

        <p className="desc text-center">
            Promptopia is an open-source AI prompting tool for the modern world
            to discover, create and share creative prompts
        </p>

    </section>
  )
}

export default Home