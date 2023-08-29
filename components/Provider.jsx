"use client"

//Imports
import { SessionProvider } from 'next-auth/react';

//get children and current session through props
const Provider = ({children, session}) => {

  {/* Higher order component, wrap other components within it*/}
  return (
    
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider