import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoShopee from '../../assets/images/svg/Logo';
import { RootState } from '../../stores';
import CartNavbar from './cart';
import HeaderNavbar from './header';
import SearchNavbar from './search';
const Navbar = () => {
  const { tagList } = useSelector((state: RootState) => state.common);
  return (
    <div className="c-navbar">
      <div className="c-navbar__container">
        <HeaderNavbar />
        <div className="c-navbar__main">
          <div className="c-navbar__brand">
            <Link to='/' className='c-link'>
              <LogoShopee />
            </Link>
          </div>
          <div className="c-navbar__center">
            <SearchNavbar />
            <ul className="c-navbar__tags">
              {tagList.map((tag: string, index: number) => (
                <li className="c-navbar__tag" key={index}>{tag}</li>
              ))}
            </ul>
          </div>
          <div className="c-navbar__action">
            <CartNavbar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar