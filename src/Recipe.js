import {useState, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom'
import { AppNavContext } from './App';
import Loading from './Utils/Loading';
import RecipeCard from './Utils/RecipeCard';
import Get from './Utils/Get';

function Recipe(props) {  
    const {isNavActive, handleNavDrop}= useContext(AppNavContext)
    const [idPage, setidPage] = useState(null);
    const { id } = useParams();
    const [pageDetails, setpageDetails] = useState({'url' : ``, 'type': ``})


    //Keys are stored publicly for uptime maintenance 

    useEffect(() =>{
            setidPage(null)
            setpageDetails(null)
            const keys = [
              '1882448aefc44b3ea30609cdccf40951',
              '30a751e2874b43f1ad3ecaee77f90358',
              '0196cdecde9e4bc9b480c4aa600c5da0',
              '745e795c3f0c4208bca68eb1cee6b5cc',
              'dace1d4c4a18413aaae4c957cd7c06da',
              '281e19f37bff48b6a40aebba8c5c3daa',
              '0888534ce1d745669ac10e33a796231b',
              '9ec50c8497ff444ebc23caff064ecb84',
              '2d2179c4d6a84cecb45f33eb7c7a7fcd',
              'ab2ba4413ae64f3983f87fae07bf602d',
              '67f51a29ba7d4d17a05abfe0cd981d80',
              'b996787c904f49ba9142544aa5832a3e',
              'bdd064e1a1d64716b37ff9b6368a03ad',
              'c192100da37d45f7a623175aa6541583',
              '8b9f348c4c774156b9e7c50e428c7ca4',
              'b63ef92116bd4190bef73a4889f032d9',
              'cff3befae479438f8f9dfffcbe5be535',
              'a20b5632aa8d489e82a17c2b6b5c57b9',
              'bdd064e1a1d64716b37ff9b6368a03ad',
              'ebf26298c85c4ab9a16fdcd10992f311',
              'fa37f0fee335472a906bdc5a0cb4c3a8'
                ]
            let key = keys[Math.floor((Math.random() * 20))]

            //Setter section - Set URL request parameters - Everytime URL changes
            if (!id){
                setidPage(false);
                switch(props.type) {
                    case "African":
                      setpageDetails({'url' : `https://api.spoonacular.com/recipes/complexSearch?query=african&number=24&apiKey=${key}`, type : 'Page'})
                      break;
                      
                    case "American":
                      setpageDetails({'url' : `https://api.spoonacular.com/recipes/complexSearch?query=american&number=24&apiKey=${key}`, type : 'Page'})
                      break;
  
                    case "Chinese":
                      setpageDetails({'url' : `https://api.spoonacular.com/recipes/complexSearch?query=chinese&number=24&apiKey=${key}`, type : 'Page'})
                      break;

                    case "European":
                      setpageDetails({'url' : `https://api.spoonacular.com/recipes/complexSearch?query=european&number=24&apiKey=${key}`, type : 'Page'})
                      break;

                    case "Spanish":
                      setpageDetails({'url' : `https://api.spoonacular.com/recipes/complexSearch?query=spanish&number=24&apiKey=${key}`, type : 'Page'})
                      break;

                    default:
                      break;
                  }    
            }
        
          if (id){            
                    setidPage(true);
                    setpageDetails({url : `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${key}`, type: `Id`})        
          }

    }, [props.type,id])      


    const {data, loading} = Get(pageDetails) 
    

 
if (!idPage) {
  
  return (
    <div className={''}>
    
        <div className={isNavActive ? ' h-full w-full grid pt-20 md:pt-36 lg:pt-20 lg:grid-cols-4 md:grid-cols-3 gap-10' : ' h-full w-full grid pt-72 md:pt-32 lg:pt-20 lg:grid-cols-4 md:grid-cols-3 gap-10'}>
            {
                loading  ? <Loading/> : Array.isArray(data) && data.map( rec => {
                    return (
                            <RecipeCard key={rec.id} id={rec.id} title={rec.title} summary={rec.summary} cheap={rec.cheap} diets={rec.diets} image={rec.image} />
                    )
                  }
                )
            } 
        </div>
    </div>
          
  )
} 
else if (idPage) {

      return (
        
      <div>

        { loading ? <Loading/> : 
         
           data.image ?  
                <div className={isNavActive ? "pt-14 pb-80 lg:pt-20 md:pt-32 md:mt-10 ml-0 mr-0 flex flex-col justify-center items-center relative h-full w-full overflow-hidden" : ' pt-64 pb-80 mt-5 lg:pt-14 md:pt-28 md:mt-10 ml-0 mr-0 h-full w-full flex flex-col justify-center items-center bg-sky-40 relative overflow-hidden'}>                          
                          <div className='flex flex-wrap md:flex-nowrap gap-2 bg-blu-900 justify-center w-full h-full p-2'>
                                <span className={'font-na bg-ky-900 font-extrabold tracking-widest text-5xl opacity-90 text-center pl-2 pt-2 pb-2'}>{data.title}</span>  
                                <div className='p-2 self-center bg-ed-900 flex justify-center md:justify-end gap-2 items-center text-center w-1/2'>
                                    <div className={'shadow border border-orange-400 rounded-lg text-sm font-bold pl-4 pr-2 pt-2 pb-3 bg-orange-600'}>Save</div>
                                    <div className={'shadow border border-green-500 rounded-lg text-sm font-bold pl-4 pr-2 pt-2 pb-3 bg-green-600'}>Share</div>
                                    <div className={'shadow border border-red-500 rounded-lg text-sm font-bold pl-4 pr-2 pt-2 pb-3 bg-red-600'}>Download</div>
                                </div>
                          </div>                     
                          <div className={'grid md:grid-cols-3 bg-red-20 p-5 gap-2 mt-10 w-full ml-9 mr-9 bg-gray-5'}>
                                    <div className={'flex justify-center h-fit items-start bg-blue-10 relative'}>
                                        <span className={'text-white text-lg font-bold uppercase font-nav bg-pink-600 rounded-full absolute p-2 top-4 left-0  '}>
                                          {data.readyInMinutes ? data.readyInMinutes + ' Mins' : ''}
                                        </span>
                                        <div className={'p-4'}>
                                          <img src={data.image} alt={data.title} className={'rounded w-full shadow-inner'}/>
                                        </div> 
                                    </div>


                                    <div className={'bg-yellow-10 relative'}>  
                                        <span className={'text-white text-lg font-bold uppercase font-nav bg-pink-600 rounded-full absolute top-0 mt-3 p-2'}>
                                            Ingredients
                                        </span>                                
                                        <div className={'p-4'}>
                                        
                                            <div className={'h-fit p-4 m-2 mt-8 text-center hover:shadow-xl'}>
                                                  {
                                                    data.nutrition.ingredients ? 
                                                          data.nutrition.ingredients.map( ingredient => {
                                                            return (
                                                              <span key={ingredient.name} className={ 'pl-4 pr-4 pb-4 block uppercase'}>{ingredient.name}</span> 
                                                            )
                                                          }
                                                          )
                                                        : <div>failed to get ingredients...</div>
                                                  } 
                                            </div>  
                                          </div> 
                                    </div>


                                    <div className={'bg-gray-100 h-fit hover:bg-gray-50 order-1 mt-3 relative'}>  
                                        <span className={'text-white text-lg font-bold uppercase bg-pink-600 font-nav rounded-full absolute top-0  mb-3 p-2  '}>
                                            Steps
                                        </span>                      
                                        <div className='p-4'>
                                              {
                                                  data.analyzedInstructions[0].steps ?                                                       
                                                            data.analyzedInstructions[0].steps.map( ({step}) => {
                                                                  return (
                                                                      <div key={step} className={'block font-thin odd:bg-gray-100 p-8 text-center'}>{step}</div>
                                                                        )
                                                              }
                                                                      )                          
                                                  : 
                                                        <div>failed!!!!!!!</div>
                                              }
                                        </div> 
                                    </div>

                                    
                          </div>     
                          <div className={'font-serif shadow border-t rounded bg-gray-50 p-7 pt-20 h-fit lg:w-2/3 mt-5 lg:mt-32 relative'}>
                              <span className={'text-white text-lg font-bold uppercase font-nav bg-pink-600 rounded-full absolute top-0 mt-3 p-2  '}>
                                  Conclusion
                              </span>
                              <h3 className={'text-center'}  dangerouslySetInnerHTML={{__html: data.summary}} ></h3>
                        </div>
                </div>  
                  
                
           : <Loading/>
         
        }
        
      </div> 
      )
} 



          }

export default Recipe