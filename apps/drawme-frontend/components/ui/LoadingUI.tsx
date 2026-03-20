import React from 'react'

const LoadingUI = () => {
    return (
        <div className='w-full h-full absolute inset-0 bg-black backdrop-blur-md'>
            <div className=' size-10 animate-spin '>
                Loading
            </div>

        </div>
    )
}

export default LoadingUI