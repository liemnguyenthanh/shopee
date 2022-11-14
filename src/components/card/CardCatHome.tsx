import { Link } from "react-router-dom";
import { Category } from "../../utils/types/Categories";

export interface CardCatHomeProps {
  category: Category
}
function CardCatHome({
  category
}: CardCatHomeProps) {
  const url_img = `https://cf.shopee.vn/file/${category.image}_tn`;
  return (
    <div className="card-cat-home">
      <Link to={category.name} className="c-link">
        <div className="card-cat-home__img">
          <img src={url_img} alt="card-cat-home" />
        </div>
        <div className="card-cat-home__title">
          {category.name}
        </div>
      </Link>
    </div>
  )
}
export default CardCatHome;