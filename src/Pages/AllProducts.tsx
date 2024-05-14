import { IconButton } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Label, Textarea } from "flowbite-react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid blue',
    boxShadow: 24,
    p: 4,
  };

type productType ={
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string
}
const AllProducts = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [products,setProducts]=useState([])
    let [loading,setLoading]=useState(true)
    let [age, setAge] =useState('');
    let [searchValue,setSearchValue]=useState('')
    let [searchProduct,setSearchProduct]=useState([])
    let [sortProducts,setSortProducts]=useState([])
    let [loaderPut,setLoaderPut]=useState(false)
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
        })=>e.title.toLowerCase().includes(searchValue.toLowerCase()))
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
        if (confirm('Are you sure you want to')) {
            axios.delete(`https://fakestoreapi.com/products/${id}`).then(response => {
            console.log('User deleted successfully:', response);
            if (response.status === 200) {
                alert(`User deleted successfully status:${response.status} Deleted product id: ${id}`)
            }
          })
          .catch(error => {
            console.error('Error deleting user:', error);
            alert(`Error deleting user: ${error.message} `);
          });
        }
        // console.log(id);
    }
    let [newPutProductValue] =useState<{
        title:string,
        price:string,
        category:string,
        description:string,
        image:string
    }>({title:'',
        price:'',
        category:'',
        description:'',
        image:''})

  
 let [val,setval]=useState<{id:string,title:string,price:string,image:string,description:string,category:string}>(
    {id:'',title:'',price:'',image:'',description:'',category:''}
  )
let EditedValue=async(id:number)=>{
    let a=await axios.get(`https://fakestoreapi.com/products/${id}`)
    let b=await a.data
    setval(b)
    console.log(b);
    handleOpen()
  }

    
    let put_product=async(id:number)=>{
        setLoaderPut(true)
        if (val.title!=='' && val.price!=='' && val.category!=='' && val.description!=='' && val.image!=='') {
            axios.put( `https://fakestoreapi.com/products/${id}`,newPutProductValue).then(response => {
            console.log(response);
            if (response.status === 200) {
                setLoaderPut(false)
                setOpen(false)
                alert(`Muvofaqqiyatli uzgartirildi   status:${response.status}`)
                setval({id:'',title:'',price:'',image:'',description:'',category:''})
            }
          })
          .catch((error:Error) => {
                alert(error.message)
                 console.log(error.message);
          });
        }
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
                                            <IconButton onClick={()=>EditedValue(e.id)} color="secondary" aria-label="add an alarm">
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
                                                <IconButton   onClick={()=>EditedValue(e.id)} color="secondary" aria-label="add an alarm">
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
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style,borderRadius:'10px'}}>
         <form className="w-full border-none flex flex-col gap-5">
                    <TextField 
                    onChange={(e)=>setval({id:val.id,title:e.target.value,price:val.price,category:val.category,description:val.description,image:val.image})} value={val.title} sx={{border:'none',outline:'none'}} id="outlined-basic" label="Title" variant="filled" />
                    <TextField
                    onChange={(e)=>setval({id:val.id,title:val.title,price:e.target.value,category:val.category,description:val.description,image:val.image})}
                     value={val.price} sx={{border:'none',outline:'none'}} type="number" id="outlined-basic2" label="Price" variant="filled" />
                    <select
                    onChange={(e)=>setval({id:val.id,title:val.title,price:val.price,category:e.target.value,description:val.description,image:val.image})}
                    value={val.category} className=" rounded-xl" name="#" id="#">
                                    <option value={"men's clothing"}>men's clothing</option>
                                    <option value={"jewelery"}>jewelery</option>
                                    <option value={"electronics"}>electronics</option>
                                    <option value={"women's clothing"}>women's clothing</option>
                    </select>
                    <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="comment" value="Your message" />
                    </div>
                    <Textarea
                    onChange={(e)=>setval({id:val.id,title:val.title,price:val.price,category:val.category,description:e.target.value,image:val.image})}
                    value={val.description} id="comment" placeholder="Leave a comment..." required rows={4} />
                    </div>
                    <TextField 
                    onChange={(e)=>setval({id:val.id,title:val.title,price:val.price,category:val.category,description:val.description,image:e.target.value})}
                    value={val.image} sx={{border:'none',outline:'none'}} id="outlined-basic2" label="Img URL" variant="filled" />
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={()=>put_product(Number(val.id))}>Put</Button>
                    <Button onClick={()=>setOpen(false)}><CloseIcon/></Button>
                    </ButtonGroup>
         </form>
        </Box>
      </Modal>
     <div className={loaderPut?"w-full h-dvh fixed top-0 left-0 flex items-center justify-center z-50":'hidden'}>
     <div className="loader">
  <div className="justify-content-center jimu-primary-loading"></div>
</div>
     </div>
    </main>
  )
}

export default AllProducts
