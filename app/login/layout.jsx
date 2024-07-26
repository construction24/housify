import React from 'react'
import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'

function layout({children}) {
  return (
    <div className='md:container md:w-[90%] m-auto'>
       <Navbar className='mb-12'/>
       {children}
       {/* <Footer className= 'mt-10'/> */}
    </div>
  )
}

export default layout
