import { Link } from "react-router-dom";

function RecipeCard({title, id, summary, cheap, diets, image}) {
// transform hover:scale-110 hover:shadow-lg transition ease-in duration-200
  return ( 

    <div className={` rounded border-l border-t border-b font-Nunito  border-r shadow-md text-black overflow-hidden space-x-2 m-2 font-mono hover:shadow-xl hover:scale-x-105 hover:-translate-y-1 hover:bg-blue-50 hover:animate-pulse transition ease-out delay-300`}>
    <div className={'rounded'}>
    
       <img src={image} alt={'recipe'} className={'object-cover w-full'}/> 
       <div className={''}>  
                <Link to={`/Recipe/${id}`}>
                  <h5 className={'text-grey-700 py-3 px-3 text-l text-center font-semibold'}>{title}</h5>
                </Link>
       </div>
    </div>
    </div>
  )
}

export default RecipeCard;

