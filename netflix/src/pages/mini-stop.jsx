import './styles.scss';

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
      <div className="pos__list">C</div>
      <div className="pos__categories">D</div>
    </div>
  );
}