import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
             <Link to={'/admin'}>go to admin</Link>
            <h1>client</h1>
        </div>
    )
}

export default HomePage
