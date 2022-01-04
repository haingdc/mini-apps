import { getArticles } from "./api"
import Split from 'react-split'
import { Virtuoso } from 'react-virtuoso'

export default function Home(props) {
  const articles = props?.articles ?? [];
  const loadPage = (url) => {
    let frame = document.getElementById("frame");
    frame.src = url;
  }

  function Row(props) {
    const { key, index, style } = props
    const e = articles[index];
    return (
      <li
        key={key}
        className="item"
        style={style}
        onClick={() => {
          loadPage(e.link)
        }}
      >
        <div class="title"><a href={e.link}>{ e.title }</a></div>
        <div class="metadata">{ e.pub_date } - { e.description }</div>
      </li>
    )
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
      <ul className="h-screen overflow-auto p-2.5 pr-0">
        <Virtuoso
          className="h-screen overflow-auto"
          totalCount={articles.length}
          itemContent={index => {
            const e = articles[index]
            return (
              <li
                key={e.link}
                data-index={index+1}
                class="item" onClick={() => {
                loadPage(e.link)
                }}
              >
                <div class="title"><a href={e.link}>{ e.title }</a></div>
                <div class="metadata">{ e.pub_date } - { e.description }</div>
              </li>
            )
          }}
        />
        {/* {
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
        } */}
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
