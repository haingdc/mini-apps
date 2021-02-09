import './styles.scss';
import apple from '../assets/images/apple.png'
import cabonhydrate from '../assets/images/cabonhydrate.png'
import fruits from '../assets/images/fruits.png'
import jeruk from '../assets/images/jeruk.png'
import lemon from '../assets/images/lemon.png'
import melon from '../assets/images/melon.png'
import pisang from '../assets/images/pisang.png'
import semangka from '../assets/images/semangka.png'
import strawberry from '../assets/images/strawberry.png'
import terong from '../assets/images/terong.png'
import vegetables from '../assets/images/vegetables.png'

const photos = [terong, apple, jeruk, lemon, melon, pisang, semangka, strawberry];
const items = [
  { name: 'terong', img: terong },
  { name: 'apple', img: apple },
  { name: 'jeruk', img: jeruk },
  { name: 'lemon', img: lemon },
  { name: 'melon', img: melon },
  { name: 'pisang', img: pisang },
  { name: 'semangka', img: semangka },
  { name: 'strawberry', img: strawberry },
];

export function Ministop() {
  return (
    <div className="pos">
      <div className="pos__header">
        <div className="pos__header__info">
          <div className="order-number">Order No. #005</div>
          <div className="date">Mon, 23 Jul 2021, 02:34PM</div>
        </div>
        <input type="text" />
      </div>
      <div className="pos__cart">B</div>
      <div className="pos__list">
        {items.map(n => (
          <div className="pos__item">
            <img src={n.img} />
            <div className="pos__item__name">{n.name}</div>
          </div>
        ))}
      </div>
      <div className="pos__categories">D</div>
    </div>
  );
}