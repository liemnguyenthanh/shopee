import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { RootState } from "../../../stores"

const ResultShop = ({ keyword }: any) => {
  const { data } = useSelector((state: RootState) => state.common.shopResult)
  console.log(data);

  if (!data) return <></>

  return (
    <Link to={`/${data.url}`} className="result__shop c-link">
      <div className="result__shop-left">
        <img src={data.image} alt='img shop' className="result__shop-img"/>
        <div className="result__shop-info">
          <div className="result__shop-title">{data.title}</div>
          <div className="result__shop-description">{data.description}</div>
        </div>
      </div>
    </Link>
  )
}

export default ResultShop