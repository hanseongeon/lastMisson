'use client'
import React, { useEffect, useRef, useState } from 'react';
import { getArtcle } from './asiosApi/userApi';
import { Main } from 'next/document';


export default function Home() {
  interface Article {
    id: number,
    title: string,
    content: string
  }
  const [page, setPage] = useState(0);
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage , setMaxPage] = useState(0);
  const [temp, setTemp] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);
  const getWeather = () => {
    const key =
        "paJ%2BM8y80vWX8Gu5RWTDurJ0y5rQCX4tjEwLh0F%2FwfUABNbw%2BV2iJD%2FBahqq08K%2BvzgPyAU0GFZ84LmVfEDPgA%3D%3D";

    const dd = new Date();
    const y = dd.getFullYear();
    const m = ("0" + (dd.getMonth() + 1)).slice(-2);
    const d = ("0" + dd.getDate()).slice(-2);
    const ds = y + m + d;

    const dd2 = new Date();
    const h = ("0" + dd2.getHours()).slice(-2);
    const ts = `${h}00`;

    var url =
        "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey= " +
        key +
        "&pageNo=1&numOfRows=1000&dataType=JSON" +
        "&base_date=" +
        ds +
        "&base_time=" +
        ts +
        "&nx=67&ny=100";

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.response.body.items.item);
            const itemArr = data.response.body.items.item;
            const result = {};
            itemArr.forEach((item:any) => {
                if (item.category === "T1H") {
                    setTemp(item.obsrValue);
                }
            });
        })
        .catch((err) => console.log(err));
};
  useEffect(() => {
    getArtcle(page).then(r => { console.log(r.content); setArticleList(r.content); setMaxPage(r.totalPages); setPage(page +1)}).catch(e => console.log(e));
  }, [])

  useEffect(() => {
    console.log(articleList);
  }, [])

  const loadPage = () => {
    const articlebox = articleRef.current;

    if (articlebox != null) {
        const scrollLocation = articlebox?.scrollTop;
        const maxScroll = articlebox.scrollHeight - articlebox.clientHeight;
        if (!isLoading && scrollLocation >= maxScroll && page < maxPage - 1) {
            setIsLoading(true);
            getArtcle(page)
                .then(response => {
                    if (response.size > 0) {
                        const pageEmail = [...articleList, ...response.content];
                        setArticleList(pageEmail);
                        setMaxPage(response.totalPages);
                        setPage(page + 1);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setIsLoading(false);
                });
        }
    }
};

  return <div className="flex flex-col justify-center">
    <div className="flex border-b-2  h-10% items-center justify-between p-6 mb-4">
      <div>
        <h2>LOGO</h2>
      </div>
      <div>
        {temp}
      </div>
      <div>
        <button className="cursor-pointer" onClick={() => window.location.href = "/create"}>글 작성</button>
      </div>
    </div>
    <div className='flex items-center justify-center'>
      <div ref={articleRef} onScroll={loadPage} className="w-[700px] h-[800px] flex flex-wrap gap-4 items-center justify-center overflow-y-auto">
        {articleList?.map((a: Article, index: number) => <div key={index} className='w-[200px] h-[200px] bg-gray-300 flex items-center justify-center mb-4 hover:bg-gray-500 cursor-pointer' onClick={() => {
         window.location.href="/create";
         localStorage.setItem("article",JSON.stringify(a));

        }}  >
          <span>{a.title}</span>
        </div>)}
      </div>
    </div>
  </div>
}

