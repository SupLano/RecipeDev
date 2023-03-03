import { Link } from "react-router-dom";

function RecipeCard({title, id, summary, cheap, diets, image}) {
// transform hover:scale-110 hover:shadow-lg transition ease-in duration-200
  return ( 

    <div className={`border-l border-t border-b font-Nunito  border-r shadow text-black overflow-hidden space-x-2 m-2 font-mono`}>
    <div className={''}>
    
       <img src={image} alt={'recipe'} className={'object-cover w-full'}/> 
       <div className={''}>  
         <Link to={`/Recipe/${id}`}>
          <h5 className={'text-grey-700 py-3 px-3 text-l font-semibold'}>{title}</h5>
          </Link>
       </div>
    </div>
    </div>
  )
}

export default RecipeCard;

