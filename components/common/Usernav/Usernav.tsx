import { FC } from 'react';
import s from './Usernav.module.css';
import Link from 'next/link';
import { Heart, Bag as Cart } from '@components/icons';

const Usernav: FC = () => {
  return (
    <nav>
      <ul className={ s.list }>
        <li className={ s.item }>
          <Cart />
        </li>
        <li className={ s.item }>
          <Link href="/">
            <a>
              <Heart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Usernav;