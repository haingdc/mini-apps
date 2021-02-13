import './styles.scss';
import cabonhydrate from '../assets/images/cabonhydrate.png';
import fruits from '../assets/images/fruits.png';
import apple from '../assets/images/apple.png';
import jeruk from '../assets/images/jeruk.png';
import lemon from '../assets/images/lemon.png';
import melon from '../assets/images/melon.png';
import pisang from '../assets/images/pisang.png';
import semangka from '../assets/images/semangka.png';
import strawberry from '../assets/images/strawberry.png';
import terong from '../assets/images/terong.png';
import vegetables from '../assets/images/vegetables.png';
import moment from 'moment';
import { IoClose } from 'react-icons/io5';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { HiDotsHorizontal } from 'react-icons/hi';
import apple2 from '../assets/images/version2/apple.png';
import jeruk2 from '../assets/images/version2/jeruk.png';
import lemon2 from '../assets/images/version2/lemon.png';
import melon2 from '../assets/images/version2/melon.png';
import pisang2 from '../assets/images/version2/pisang.png';
import semangka2 from '../assets/images/version2/semangka.png';
import strawberry2 from '../assets/images/version2/strawberry.png';
import terong2 from '../assets/images/version2/terong.png';
import { useState, useMemo, useCallback, useLayoutEffect } from 'react';
import { animated, useTransition, config } from 'react-spring';
import { useHeight } from '../utils/useHeight';

const photos = [terong, apple, jeruk, lemon, melon, pisang, semangka, strawberry];
const items = [
  { quantity: 1, name: 'terong'    , img: terong     },
  { quantity: 1, name: 'apple'     , img: apple      },
  { quantity: 1, name: 'jeruk'     , img: jeruk      },
  { quantity: 1, name: 'lemon'     , img: lemon      },
  { quantity: 1, name: 'melon'     , img: melon      },
  { quantity: 1, name: 'pisang'    , img: pisang     },
  { quantity: 1, name: 'semangka'  , img: semangka   },
  { quantity: 1, name: 'strawberry', img: strawberry },
];

export function Ministop() {
  const [selected, setSelected] = useState([]) ;
  const [displaySizes, setDisplaySizes] = useState({});
  const setDisplaySize = useCallback(
    (name, height) => {
      setDisplaySizes(displaySizes => ({ ...displaySizes, [name]: height }));
    },
    [setDisplaySizes]
  );
  var now = moment().format('ddd, DD MMM YYYY, HH:MM A');

  const selectedMap = useMemo(
    () =>
    selected.reduce((hash, item) => ((hash[item.name] = true), hash), {}),
    [selected]
  );
  const selectedTransitions = useTransition(selected, {
    config: item => ({
      ...config.stiff,
      clamp: !selectedMap[item.name]
    }),
    from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
    enter: item => ({
      opacity: 1,
      height: displaySizes[item.name],
      transform: "translate3d(0%, 0px, 0px)"
    }),
    update: item => ({ height: displaySizes[item.name] }),
    leave: { opacity: 0, height: 0, transform: "translate3d(25%, 0px, 0px)" }
  });
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
          {selectedTransitions((styles, item) => (
            <CartItem
              quantity={item.quantity}
              price="$15"
              src={item.img}
              styles={styles}
              setDisplaySize={setDisplaySize}
              item={item}
            >
              {item.name}
            </CartItem>
          ))}
          {/* {selected.map(item => (
            <CartItem quantity="1" price="$15" src={item.img}>{item.name}</CartItem>
          ))} */}
          {/* <CartItem quantity="1" price="$15" src={melon2}>Melon</CartItem> */}
          {/* <CartItem quantity="2" price="$7" src={semangka2}>Semangka</CartItem> */}
          {/* <CartItem quantity="7" price="$30" src={jeruk2}>Jeruk</CartItem> */}
          {/* <CartItem quantity="1" price="$3" src={strawberry2}>Strawberry</CartItem> */}
          {/* <CartItem quantity="1" price="$3" src={strawberry2}>Strawberry</CartItem> */}
          {/* <CartItem quantity="1" price="$3" src={strawberry2}>Strawberry</CartItem> */}
          {/* <CartItem quantity="1" price="$3" src={strawberry2}>Strawberry</CartItem> */}
          {/* <CartItem quantity="1" price="$3" src={strawberry2}>Strawberry</CartItem> */}
          {/* <CartItem quantity="1" price="$3" src={strawberry2}>Strawberry</CartItem> */}
          {/* <CartItem quantity="1" price="$3" src={strawberry2}>Strawberry</CartItem> */}
        </div>
        <div className="pos__cart__sumup-wrapper">
          <div className="pos__cart__sumup">
            <div className="pos__cart__sumup__name">Sub Total</div>
            <div className="pos__cart__sumup__value">$43</div>
            <div className="pos__cart__sumup__name">Tax</div>
            <div className="pos__cart__sumup__value">$2</div>
          </div>
        </div>
        <div className="pos__cart__actions">
          <div className="pos__cart__sumup">
            <div className="pos__cart__sumup__name pos__cart__sumup__name--bigger">Total</div>
            <div className="pos__cart__sumup__value pos__cart__sumup__value--bigger">$45</div>
          </div>
          <div className="pos__cart__check-out-wrapper">
            <button className="pos__cart__actions__button pos__cart__check-out">Chek out</button>
          </div>
          <div className="pos__cart__pending-wrapper">
          <button className="pos__cart__actions__button pos__cart__pending">Pending</button>
          </div>
        </div>
      </div>
      <div className="pos__list">
        {items.map(item => (
          <div className="pos__item" onClick={() => {
            var [ existItem ] = selected.filter(n => n.name === item.name);
            if (existItem) {
              ++existItem.quantity;
              setSelected(list => [...list])
            } else {
              setSelected(list => [...list, item])
            }
          }}>
            <img src={item.img} />
            <div className="pos__item__name">{item.name}</div>
          </div>
        ))}
      </div>
      <div className="pos__categories">
        <div className="pos__categories__container">
          <div className="pos__categories__item">
            <img className="pos__categories__item__photo" src={vegetables} />
            <div className="pos__categories__item__name">Vegetables</div>
          </div>
          <div className="pos__categories__item active">
            <img className="pos__categories__item__photo" src={fruits} />
            <div className="pos__categories__item__name">Fresh Fruit</div>
          </div>
          <div className="pos__categories__item">
            <img className="pos__categories__item__photo" src={cabonhydrate} />
            <div className="pos__categories__item__name">Carbohydrate</div>
          </div>
        </div>
        <div className="pos__categories__dots">
          <HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
}

function CartItem(props) {
  var { src, price, quantity, children, styles, setDisplaySize, item} = props;
  var [ref, height] = useHeight();
  useLayoutEffect(() => {
    height && setDisplaySize(item.name, height);
  }, [height]);
  return (
    <animated.div style={{ ...styles, overflow: "hidden" }}>
      <div ref={ref} style={{ marginRight: "10px" }}>
        <div className="cart__item">
          <img className="cart__item__photo" src={src} />
          <div className="cart__item__name">{children}</div>
          <div className="cart__item__price">{price}</div>
          <div className="cart__item__quantity-wrapper">
            <div className="cart__item__quantity">
              <div className="cart__item__quantity__minus"> <AiOutlineMinus /> </div>
              <div className="cart__item__quantity__number">{quantity}</div>
              <div className="cart__item__quantity__plus"> <AiOutlinePlus /> </div>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}