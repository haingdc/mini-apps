import { getArticles } from "./api"
import Split from 'react-split'
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer'
import SentenceList from "../dynamic-content/SentenceList";

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
      <ul className="h-screen overflow-auto">
        {/* <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={117}
              itemSize={150}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer> */}
        {/* <List
          height={150}
          itemCount={117}
          itemSize={35}
          width={300}
        >
          {Row}
        </List> */}
        <SentenceList />
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
