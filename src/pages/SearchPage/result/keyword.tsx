import Lens from '../../../assets/images/svg/lens'

const ResultKeyword = ({ keyword }: any) => {
  return (
    <div className="result__not-found">
      <Lens />
      Kết quả tìm kiếm cho từ khoá 
      <span className='result__keyword'>{keyword}</span>
    </div>
  )
}

export default ResultKeyword