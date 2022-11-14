import { createRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SearchNavbar = () => {
  const inputRef = createRef<HTMLInputElement>();
  const navigate = useNavigate()
  const onSearch = () => {
    const value = inputRef?.current?.value.trim()
    if (!value) return;
    navigate('/search?keyword=' + value)
  }

  const onPressEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') onSearch()
  }
  
  return (
    <div className="c-navbar__search">
      <input type="text" className="c-navbar__input" ref={inputRef} onKeyDown={onPressEnter} />
      <button className="c-navbar__search-btn" onClick={onSearch}>
        <FiSearch className='c-navbar__search-icon' />
      </button>
    </div>
  )
}

export default SearchNavbar
