
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Вибачте, але сторінки, яку ви шукаєте, не існує.</p>
      <Link to="/">Повернутися на домашню сторінку</Link>
    </div>
  );
};

export default NotFoundPage;
