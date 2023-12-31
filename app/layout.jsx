import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

// Set metadata for layout file
export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            {/* Wrap Provider around everything in layout.jsx so every page can use it */}
            <Provider>
                <div className='main'>
                    <div className='gradient'/>
                </div>

                <main className='app'>
                    <Nav />
                    
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout