'use client'
import { useEffect, useState } from "react"
import Home from "../page";
import RootLayout from "../layout";
import { createArtcle, deleteArtciel, updateArtcle } from "../asiosApi/userApi";
import { Tienne } from "next/font/google";


interface Article {
    id: number,
    title: string,
    content: string
}
interface ArticleRq {
    title: string,
    content: string
}
export default function Create() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState(0);


    useEffect(() => {
        if (localStorage.getItem("article")) {
            const storedArticle = localStorage.getItem('article') || 'null';
            const article: Article = JSON.parse(storedArticle);
            setTitle(article.title);
            setContent(article.content);
            setId(article.id);
            localStorage.clear();
        }
    }, [])

    const send = () => {
        if (id == 0) {
            createArtcle({ title: title, content: content }).then(r => window.location.href = "/").catch(e => console.log(e));
        } else {
            updateArtcle({ title: title, content: content }, id).then(r => window.location.href = "/").catch(e => console.log(e));
        }
    }

    return <div>
        <div className="flex border-b-2  h-10% items-center justify-between p-6 mb-4">
            <div>
                <h2>LOGO</h2>
            </div>
            <div>
                날짜 api
            </div>
            <div>
                <button className="cursor-pointer" onClick={() => window.location.href = "/create"}>글 작성</button>
            </div>
        </div>
        <div className="flex flex-col items-center gap-10 p-10 h-screen">
            <input defaultValue={title} onChange={(e) => {
                setTitle(e.target.value);
            }} type="text" placeholder="Type here" className="border-black border-2 w-[350px] h-[50px]" />
            <textarea defaultValue={content} className="textarea textarea-bordered border-black border-2 w-[350px] h-[300px]" placeholder="Bio" onChange={(e) => {
                setContent(e.target.value);
            }}></textarea>
            {id == 0 ? <button className="btn" onClick={() => {
                send();
            }}>작성</button> : <button className="btn" onClick={() => {
                send();
            }}>수정</button>}
            {id != 0 ? <button onClick={() => deleteArtciel(id).then(r => window.location.href = "/").catch(e => console.log(e))}>삭제</button> : <></>}
        </div>
    </div>

}