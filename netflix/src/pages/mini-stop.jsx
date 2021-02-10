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
import vegetables from '../assets/images/vegetables.png';
import moment from 'moment';
import { IoClose } from 'react-icons/io5';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import strawberry2 from '../assets/images/ver2/strawberry.png';

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
  var now = moment().format('ddd, DD MMM YYYY, HH:MM A');
  return (
    <div className="pos">
      <div className="pos__header">
        <div className="pos__header__info">
          <div className="order-number">Order No. #005</div>
          <div className="date">{now}</div>
        </div>
      </div>
      <div className="pos__input">
        <input type="text" placeholder="Enter item code.." />
      </div>
      <div className="pos__cart">
        <div className="pos__cart__header">
          <div className="pos__cart__head">Cart</div>
          <div className="pos__cart__close">
            <IoClose />
          </div>
        </div>
        <div className="pos__cart__list">
          <CartItem />
        </div>
      </div>
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

function CartItem() {
  return (
    <div className="cart__item">
      <img className="cart__item__photo" src={strawberry2} />
      <div className="cart__item__name">Melon</div>
      <div className="cart__item__price">$15</div>
      <div className="cart__item__quantity">
        <div className="cart__item__minus"> <AiOutlineMinus /> </div>
        <div className="cart__item__number">1</div>
        <div className="cart__item__plus"> <AiOutlinePlus /> </div>
      </div>
    </div>
  );
}