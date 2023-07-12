import { useEffect, useState } from 'react'

const Blog = () => {
    const [posts, setPosts] = useState<any[]>([])
    const [visiblePosts, setVisiblePosts] = useState(5)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error))
    }, [])

    const handleLoadMore = () => {
        setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5)
    }

    return (
        <>
            <h1>Blog</h1>
            <section>
                {posts.slice(0, visiblePosts).map((post) => (
                    <a key={post.id} href={`/blog/${encodeURIComponent(post.title)}`}>
                        <article className="p-4 my-8 bg-neutral-200 rounded shadow-md">
                            <p className="mt-1 text-gray-600">{post.id}</p>
                            <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                            <p className="mt-1 text-gray-600">{post.body}</p>
                        </article>
                    </a>
                ))}
                <button onClick={handleLoadMore}>Load more</button>
            </section>
        </>
    )
}

export default Blog