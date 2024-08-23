import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../App"
import NavBar from "../../components/LayoutComponents/NavBar";
import itemRequest from "../../api/Item/item.request";
import Button from "../../components/buttons/Buttons";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { applyToast } from '../../components/toast-message/toast';
import DeleteItem from "./DeleteItem";
import Dialog from '../../components/DialogComponent/Dialog'

const Items = () => {
  // With this AuthContext you can get the currently logged in user's details
  const loggedInUser = useContext(AuthContext);
  const { userId } = loggedInUser;
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState("ASC")
  const [deleteId, setDeleteId] = useState();
  const [selectedItem, setSelectedItem] = useState({});

  const initialState = [
    {
      name: "",
      price: "",
      quantity: "",
      description: "",
      imageUrl: "",
      createdBy: "",
    },
  ];

  const [item, setItem] = useState(initialState);

  const initialInput = {
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    description: item.description,
    imageUrl: item.imageUrl,
    createdBy: userId,
  }

  const [inputs, setInputs] = useState(initialInput);

  //Sort Ascending function
  const sortAsc = () => {
    let sortedItems = item.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    setItem(sortedItems)
    setSortStatus('ASC')
    console.log("I am sort Asc");
  }

  //Sort Descending function
  const sortDesc = () => {
    let sortedItems = item.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    setItem(sortedItems)
    setSortStatus('DESC')
    console.log("I am sort Desc");
  }

  useEffect(() => {
    itemRequest.getItems().then((res) => {
      console.log("Item page: Index: useEffect")
      console.log(res);
      setItem(res.data.data);
    });
  }, []);

  const itemDetails = (id) =>{
    itemRequest.getOneItem(id)
    .then((response) =>{
      setSelectedItem(response.data.data)
    }).catch((error)=>{
      console.log(error);
    })
  }

  const UpdateItem = (id) => {
    const updatedItem = {
      name: inputs.name,
      price: inputs.price,
      quantity: inputs.quantity,
      description: inputs.description,
      imageUrl: inputs.imageUrl,
    }

    itemRequest.updateItem(updatedItem, id).then((res) => {
      console.log(res);
      applyToast('Item succesfully update!', 'success');
      window.location.reload();
    })
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  return (
    <>
      <NavBar />
      {/* <h1>Items</h1>
            <h2>logged in user - {userId}</h2>
            <h2>logged in user's role - {role}</h2> */}
      <br />
      <br />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-16 sm:px-16 lg:px-2">
          <div className="max-w-2xl mx-auto py-10 lg:max-w-none">

            <div className="flex justify-between py-2">
              <div>
                {/* <SearchBox handleSearch={handleSearch} /> */}

                <div className="flex">
                  <div className="dropdown relative">
                    <button id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                      {
                        sortStatus === 'ASC' ?
                          'Oldest'
                          :
                          sortStatus === 'DESC' ?
                            'Newest'
                            :
                            'Filter'
                      }
                      <svg aria-hidden="true" className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd" />
                      </svg>
                    </button>
                    <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0" aria-labelledby="dropdownMenuButton1">
                      <li>
                        <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={sortAsc}>Oldest</button>
                      </li>
                      <li>
                        <button type="button" className="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={sortDesc}>Newest</button>
                      </li>
                    </ul>
                  </div>
                  <div className="relative w-full">
                    <input type="search"
                      id="search-dropdown"
                      className="block p-2.5 lg:w-96 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                      placeholder="Search..."
                      value={search} onChange={(e) => { setSearch(e.target.value) }} />
                  </div>
                </div>


              </div>
              <div>
                <Button><div className="text-xl"><a href="/createitem">Create your Item</a></div> </Button>
              </div>
            </div>

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-6">
              {
                  item.map((i) =>(
                    <div className="bg-white px-2 py-2 shadow-md">
                      <div className="group relative">
                        <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                          <img
                            src={i.imageUrl}
                            className="w-full h-full object-center object-cover" />
                        </div>
  
                        <div className="flex justify-between pt-4">
                          <div className="cursor-pointer">
                            <Link to={`/reserve/${i._id}`}><Button>Add to cart</Button></Link>
                          </div>
  
                          {
                            userId == i.createdBy._id ?
  
  
                              <div className="flex center-items text-3xl pt-2">
                                <div className="pr-5 cursor-pointer text-gray-900" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Request"><BsPencilSquare data-bs-toggle="modal" data-bs-target={`#udpateItemDetails`} onClick={()=>itemDetails(i._id)}/></div>
                                <div className="pr-5 cursor-pointer text-red-800" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Request"><BsFillTrashFill data-bs-toggle="modal" data-bs-target={`#deleteItemDetails`} onClick={()=>setDeleteId(i._id)} /></div>
                              </div>
  
                              :
  
                              null
  
                          }
  
                        </div>
  
  
                        <h3 className="mt-2 text-xl text-gray-900 font-semibold">
                          {i.name}
                        </h3>
                        <h3 className="mt-0 text-lg text-gray-600 font-semibold">
                          LKR {i.price} | Availability - {i.quantity}
                        </h3>
                        <p className="text-base font-medium text-gray-900 mt-2 mb-24">{i.description}</p>
                        <div>
                      </div>
                      {/* Delete Item */}
                      <DeleteItem
                          id={`deleteItemDetails`}
                          title="Delete Item Detail"
                          message=" Are you sure you want to delete this item?"
                          itemId={deleteId}
                        />
                      </div>
                      {/* Update Item */}
                      <div>
  
                        {
                          selectedItem ?
                          <>
                            <Dialog
                            id={`udpateItemDetails`}
                            size='XL'
                            title="Update Item Details"
                            content={
                              <>
                                <div className="mb-6">
                                  <label
                                    htmlFor="name"
                                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Update Item Name
                                  </label>
                                  <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder={selectedItem.name}
                                    required=""
                                    value={inputs.name}
                                    onChange={handleChange}
                                  />
                                </div>
    
                                <div className="mb-6">
                                  <label
                                    htmlFor="price"
                                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Update Item Price
                                  </label>
    
                                  <div className="flex">
                                    <span className="inline-flex items-center px-3 text-lg text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                      LKR
                                    </span>
                                    <input
                                      type="text"
                                      id="price"
                                      name="price"
                                      className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-lg border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder={selectedItem.price}
                                      value={inputs.price}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
    
                                <div className="mb-6">
                                  <label
                                    htmlFor="quantity"
                                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Update Item Quantity
                                  </label>
                                  <input
                                    type="text"
                                    id="quantity"
                                    name="quantity"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder={selectedItem.quantity}
                                    required=""
                                    value={inputs.quantity}
                                    onChange={handleChange}
                                  />
                                </div>
    
                                <div className="mb-6">
                                  <label
                                    htmlFor="description"
                                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Update Item Description
                                  </label>
                                  <textarea
                                    type="text"
                                    id="description"
                                    name="description"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder={selectedItem.description}
                                    required=""
                                    value={inputs.description}
                                    onChange={handleChange}
                                  />
                                </div>
                              </>
                            }
                            close={console.log("I am Update Close button")}
                            action={() => UpdateItem(selectedItem._id)}
                            buttonName="Update"
                          />
                          </> 
                          :
                          <></>
                        }
                    </div>
                  </div>
                ))
              }         
            </div>
          </div>
        </div>
      </div>



      <br /><br />

    </>
  )
}

export default Items;