import { IconButton } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
type productType ={
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string
}
const AllProducts = () => {

    let [products,setProducts]=useState([])
    let [loading,setLoading]=useState(true)
    let [age, setAge] =useState('');
    let [searchValue,setSearchValue]=useState('')
    let [searchProduct,setSearchProduct]=useState([])
    let [sortProducts,setSortProducts]=useState([])
   
    let get_products=async()=>{
        try {
            let res=await axios.get('https://fakestoreapi.com/products')
        let data=await res.data
        setProducts(data)
        setLoading(false)
        // errrr type
        } catch (error:any) {
            console.log(error.message);
            setLoading(false)
        }
    }

    let search_product=()=>{
        let newary=products.filter((e:{
            id:number,
            title:string,
            price:number,
            category:string,
            description:string,
            image:string
        })=>e.title.toLowerCase().includes(searchValue))
        setSearchProduct(newary)
    }

    let sortingProducts=()=>{
        let newArry=products.filter((e:productType)=>e.category.toLowerCase()===age.toLowerCase())
        setSortProducts(newArry)
    }

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };
    let daleteProduct=(id:number)=>{
        axios.delete(`https://fakestoreapi.com/products/${id}`)
        console.log(id);
        
    }
    useEffect(()=>{
        get_products()
    },[age])

    useEffect(()=>{
        search_product()
    },[searchValue])

    useEffect(()=>{
        sortingProducts()
    },[age])

  return (
    <main className="w-full mt-[100px]">
         <div className="container">
                        <div className="mb-[50px] relative flex justify-between flex-wrap w-full gap-5 border-b pb-[20px]">
                            <input onChange={(e)=>setSearchValue(e.target.value)} className="outline-none rounded-2xl border-none" type="search" placeholder='search product' />
                                <div className=" absolute top-[15px] left-[210px]"><SearchIcon/></div>
                                                            <Box sx={{ minWidth: 220 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Category"
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={""}>All Products</MenuItem>
                                    <MenuItem value={"men's clothing"}>men's clothing</MenuItem>
                                    <MenuItem value={"jewelery"}>jewelery</MenuItem>
                                    <MenuItem value={"electronics"}>electronics</MenuItem>
                                    <MenuItem value={"women's clothing"}>women's clothing</MenuItem>
                                    </Select>
                                </FormControl>
                                </Box>
                                <div className={searchValue? " absolute top-[80px] overflow-y-scroll h-[200px] rounded-xl left-0 max-w-[500px] w-full p-5 bg-slate-100":'hidden'}>
                                    {
                                        searchProduct.map((e:{
                                            id:number,
                                            title:string,
                                            price:number,
                                            category:string,
                                            description:string,
                                            image:string
                                        },i)=>(
                                            <div key={i} className=""><img className="w-[30px] rounded-full" src={e.image} alt="alt" />
                                            <p>{e.title}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        {
                        loading?<div className="w-full h-dvh flex justify-center items-center fixed top-0 left-0"><div className="spinner"></div></div>:
                        <div className="w-full flex flex-wrap justify-center gap-7">
                                
                                {
                                    age===''?<>
                                    {
                                    products.map((e:{
                                        id:number,
                                        title:string,
                                        price:number,
                                        category:string,
                                        description:string,
                                        image:string
                                    },i)=>(
                                        <div className="cards flex w-full border rounded-2xl p-4 flex-col max-w-[400px] gap-10 hover:bg-slate-200" key={i}>
                                            <img className="w-[50px]" src={e.image} alt="alt" />
                                            <p className="text-[20px] h-[60px]">{e.title}</p>
                                            <p className="text-green-400">{e.price}$</p>
                                            <p className="desc h-[100px]">{e.description}</p>
                                            <p className="catc"><span className="text-blue-600">Category:</span>{e.category}</p>
                                            <div className="w-full flex gap-3">
                                            <IconButton onClick={()=>daleteProduct(e.id)} aria-label="delete">
                                                <DeleteIcon sx={{color:'red'}} />
                                            </IconButton>
                                            <IconButton color="secondary" aria-label="add an alarm">
                                                <AlarmIcon />
                                            </IconButton>
                                            <IconButton color="secondary" aria-label="add an alarm">
                                                <EditIcon />
                                            </IconButton>
                                            </div>
                                        </div>
                                    ))
                                }
                                    </>:
                                    <>
                                    {
                                        sortProducts.map((e:{
                                            id:number,
                                            title:string,
                                            price:number,
                                            category:string,
                                            description:string,
                                            image:string
                                        },i)=>(
                                            <div className="cards flex w-full border rounded-2xl p-4 flex-col max-w-[400px] gap-10 hover:bg-slate-200" key={i}>
                                                <img className="w-[50px]" src={e.image} alt="alt" />
                                                <p className="text-[20px] h-[60px]">{e.title}</p>
                                                <p className="text-green-400">{e.price}$</p>
                                                <p className="desc h-[100px]">{e.description}</p>
                                                <p className="catc"><span className="text-blue-600">Category:</span>{e.category}</p>
                                                <div className="w-full flex gap-3">
                                                <IconButton onClick={()=>daleteProduct(e.id)} aria-label="delete">
                                                    <DeleteIcon sx={{color:'red'}} />
                                                </IconButton>
                                                <IconButton color="secondary" aria-label="add an alarm">
                                                    <AlarmIcon />
                                                </IconButton>
                                                <IconButton color="secondary" aria-label="add an alarm">
                                                    <EditIcon />
                                                </IconButton>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    </>
                                }
                               
                        </div>
                        }
                
            </div>  
    </main>
  )
}

export default AllProducts
