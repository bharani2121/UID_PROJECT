import React from "react";
import { updateUser } from "../../api/User/userApi";
import Button from "../buttons/Buttons";
import DialogActions from "../dialog/DialogActions";
import DialogContent from "../dialog/DialogContent";
import DialogTitle from "../dialog/DialogTitle";
import { applyToast } from "../toast-message/toast";

export default function Editprofile(props) {
    const [user, setUser] = React.useState(props.userDetails);
    const [proPic, setProPic] = React.useState(user.pic);

    const handleEditUser = () => {
        const userObj = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            contactNo: user.contactNo,
            pic: proPic,
            address1: user.address1,
            address2: user.address2,
            city: user.city,
            state: user.state
        };
        updateUser(user._id, userObj)
            .then((res) => {
                if (res.data.isSuccessful) {
                    props.handleGetUser();
                    props.setEditModelOpen(false);
                    applyToast('User data updated successfully!', 'success');
                }
            })
            .catch((e) => applyToast(e, 'error'));
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'firstName': {
                setUser({...user, firstName: value});
                break;
            }
            case 'lastName': {
                setUser({...user, lastName: value});
                break;
            }
            case 'email': {
                setUser({...user, email: value});
                break;
            }
            case 'contactNo': {
                setUser({...user, contactNo: value});
                break;
            }
            case 'pic': {
                setUser({...user, contactNo: value});
                break;
            }
            case 'address1': {
                setUser({...user, address1: value});
                break;
            }
            case 'address2': {
                setUser({...user, address2: value});
                break;
            }
            case 'city': {
                setUser({...user, city: value});
                break;
            }
            case 'state': {
                setUser({...user, state: value});
                break;
            }
            default:
        }
    }
    
    const onUploadImgToCloudinary = (pics) => {
        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "trainerfg");
          data.append("cloud_name", "automobile-spare-parts");
          fetch("https://api.cloudinary.com/v1_1/automobile-spare-parts/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setProPic(data.url.toString());
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return applyToast('Please select jpg,png or jpeg type image', 'info');
        }
    };

    return (
       <>
       <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
            <form onSubmit={handleEditUser}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                     <div>
                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                        <input type="text" id="first_name" required name="firstName" value={user.firstName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                        <input type="text" id="last_name" required name="lastName" value={user.lastName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email Address</label>
                        <input type="email" disabled = {true} required id="email" name="email" value={user.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Contact No</label>
                        <input type="text" id="contact" required name="contactNo" value={user.contactNo} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                     <div>
                        <label for="address1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address 1</label>
                        <input type="text" id="address1" name="address1" value={user.address1} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="address2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address 2</label>
                        <input type="text" id="address2" name="address2" value={user.address2} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
                        <input type="text" id="city" name="city" value={user.city} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label for="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">State / Province</label>
                        <input type="text" id="state" name="state" value={user.state} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                    <img
                        src={proPic}
                        className="rounded-lg w-32 h-32"
                        alt="Avatar"
                    />
                    </div>
                    <div>
                        <label for="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Change Profile Picture</label>
                        <input type="file" id="state" name="pic" onChange={(e) => onUploadImgToCloudinary(e.target.files[0])} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                </div>
            </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditUser}>Update</Button>
                <Button variant={"alternative"} onClick={() => props.setEditModelOpen(false)}>Cancel</Button>
            </DialogActions>
       </>
    );

}