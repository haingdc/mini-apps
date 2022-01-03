import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getArticles } from "./api"
import Split from 'react-split'

export default function Home(props) {
  const articles = props?.articles ?? [];
  console.log({ articles })
  const loadPage = (url) => {
    let frame = document.getElementById("frame");
    frame.src = url;
  }
  return (
    <Split
      className="split"
      sizes={[25, 75]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
    >
      <ul className="h-screen overflow-auto">
        {
          articles.map(e => (
            <li
              key={e.link}
              class="item" onClick={() => {
              loadPage(e.link)
              }}
            >
              <div class="title"><a href={e.link}>{ e.title }</a></div>
              <div class="metadata">{ e.pub_date } - { e.description }</div>
            </li>
          ))
        }
      </ul>
      <div>
        <iframe id="frame" className="w-full h-full" />
      </div>
    </Split>
  )
}

export async function getServerSideProps() {
  const articles = await getArticles()
  return {
    props: {
      articles,
    },
  }
}
