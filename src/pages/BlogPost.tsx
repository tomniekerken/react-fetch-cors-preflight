import React from 'react'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const BlogPost = () => {
    const [post, setPost] = useState<any>(null)

    const { url } = useParams()

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?title=${url}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setPost(data[0])
            })
            .catch((error) => console.log(error))
    }, [url])

    if (!post) {
        return <p>Loading...</p>
    }

    return (
        <article className="p-4 my-8 bg-neutral-200 rounded shadow-md">
            <p className="mt-1 text-gray-600">{post.id}</p>
            <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
            <p className="mt-1 text-gray-600">{post.body}</p>
        </article>
    )
}

export default BlogPost