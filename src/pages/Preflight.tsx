import { useState } from 'react'

const Preflight = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [userId, setUserId] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [updatePostId, setUpdatePostId] = useState('')
    const [updateUserId, setUpdateUserId] = useState('')
    const [updateTitle, setUpdateTitle] = useState('')
    const [updateContent, setUpdateContent] = useState('')

    const [jwt, setJwt] = useState('')

    const handleLoginSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const formData = new FormData()

        formData.append('username', username)
        formData.append('password', password)

        fetch('http://localhost:80/api/user/login', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                localStorage.setItem('jwt', data.jwt)
                setJwt(data.jwt)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleCreatePostSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const formData = new FormData()

        formData.append('user_id', userId)
        formData.append('title', title)
        formData.append('content', content)

        console.log(jwt)

        // POST
        fetch('http://localhost:80/api/posts/create', {
            method: 'POST',
            headers: {
                AUTHORIZATION: `AUTHORIZE ${jwt}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                localStorage.setItem('jwt', data.jwt)
                setJwt(data.jwt)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDeleteSubmit = (id: number) => {

        fetch(`http://localhost:80/api/posts/delete/${id}`, {
            method: 'DELETE',
            headers: {
                AUTHORIZATION: `AUTHORIZE ${jwt}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                localStorage.setItem('jwt', data.jwt)
                setJwt(data.jwt)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handlePutSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const formData = new FormData()

        formData.append('user_id', updateUserId)
        formData.append('title', updateTitle)
        formData.append('content', updateContent)

        console.log(jwt)

        // POST
        fetch(`http://localhost:80/api/posts/update/${updatePostId}`, {
            method: 'PUT',
            headers: {
                AUTHORIZATION: `AUTHORIZE ${jwt}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                localStorage.setItem('jwt', data.jwt)
                setJwt(data.jwt)

            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    return (
        <>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(event) => {setUsername(event.target.value)}} />
                <br />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" value={password} onChange={(event) => {setPassword(event.target.value)}} />
                <br />
                <button type="submit">Login</button>
            </form>

            <br />
            <br />

            <h2>Create Post</h2>
            <form onSubmit={handleCreatePostSubmit}>
                <label htmlFor="uid">User Id</label>
                <input type="text" id="uid" value={userId} onChange={(event) => {setUserId(event.target.value)}} />
                <br />
                <label htmlFor="title">Blog Titel</label>
                <input type="text" id="title" value={title} onChange={(event) => {setTitle(event.target.value)}} />
                <br />
                <label htmlFor="content">Content</label>
                <textarea id="content" value={content} onChange={(event) => {setContent(event.target.value)}} />
                <br />
                <button type="submit">Create Blogpost</button>
            </form>

            <br />
            <br />

            <h3>Delte Post</h3>
            <form onSubmit={() => {handleDeleteSubmit(5)}}>
                <br />
                <button type="submit">Post mit der Id 10 löschen</button>
            </form>

            <br />
            <br />

            <h3>Put (Update) Post</h3>
            <form onSubmit={(event) => {handlePutSubmit(event)}}>
                <label htmlFor="updatePostId">Post Id</label>
                <input type="text" id="updatePostId" value={updatePostId} onChange={(event) => {setUpdatePostId(event.target.value)}} />
                <br />
                <label htmlFor="updateUserId">User Id</label>
                <input type="text" id="updateUserId" value={updateUserId} onChange={(event) => {setUpdateUserId(event.target.value)}} />
                <br />
                <label htmlFor="updateTitle">Title</label>
                <input type="text" id="updateTitle" value={updateTitle} onChange={(event) => {setUpdateTitle(event.target.value)}} />
                <br />
                <label htmlFor="updateContent">Content</label>
                <input type="text" id="updateContent" value={updateContent} onChange={(event) => {setUpdateContent(event.target.value)}} />
                <button type="submit">Update Post</button>
            </form>
        </>
    )
}

export default Preflight