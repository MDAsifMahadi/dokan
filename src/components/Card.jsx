import { Link } from "react-router-dom"
const Card = ({data, i}) => {

  return (
    <Link to={`/detail/${data._id}`} className='max-w-100 max-h-[540px] bg-gray-200 rounded-2xl overflow-hidden relative group'>
        <div className="absolute min-w-6 min-h-6 rounded-full bg-white top-2 left-2 text-center text-black z-30 font-bold">
            {i+1}
        </div>
      <div className="overflow-hidden max-h-[400px]">
         <img
            className="w-full group-hover:scale-120 duration-200"
         src={data.imageURL[0].url} alt="img" />       
      </div>
      <div className="p-5">
        <h1 className="text-xl font-bold">{data.title}</h1>
        <p>{data.productDetails.slice(0, 120)}</p>
      </div>
    </Link>
  )
}

export default Card
