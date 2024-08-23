import React from "react";
import { registerUser } from "../../api/User/userApi";
import styles from "./styles.module.css";
import Button from "../../components/buttons/Buttons";
import PreviewHeader from "../../components/PreviewPage/PreviewHeader";
import { Link, useNavigate } from "react-router-dom";
import { applyToast } from "../../components/toast-message/toast";

export default function Register() {
    const [user, setUser] = React.useState({});
    const navigate = useNavigate();
    const [proPic, setProPic] = React.useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [apiResponseWaiting, setApiResponseWaiting] = React.useState(false);
    const [confirmPw, setConfirmPw] = React.useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setApiResponseWaiting(true);
            const userObj = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                contactNo: user.contactNo,
                password: user.password,
                pic: proPic
            };

            if (user.password === confirmPw) {
                const userReg = registerUser(userObj);
                const { data: res } = await userReg;
                res.isSuccessfull? setTimeout(function(){
                    setApiResponseWaiting(false);
                    navigate("/login");
                    applyToast('Account created successfully. Please login to proceed!', 'success');
                }, 500) : setApiResponseWaiting(false) && applyToast('Error on Account creation!', 'error');
            } else {
                applyToast('Passwords do not match! Try again', 'error');
                return;
            }
        } catch (error) {
            if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
                applyToast(error.response.data.message, 'error');
                setApiResponseWaiting(false);
			}
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'firstName': {
                setUser({ ...user, firstName: value });
                break;
            }
            case 'lastName': {
                setUser({ ...user, lastName: value });
                break;
            }
            case 'email': {
                setUser({ ...user, email: value });
                break;
            }
            case 'contactNo': {
                setUser({ ...user, contactNo: value });
                break;
            }
            case 'password': {
                setUser({ ...user, password: value });
                break;
            }
            case 'pic': {
                setUser({ ...user, pic: value });
                break;
            }
            default:
        }
    }

    const handleChangePw =(event) => {
        setConfirmPw(event.target.value);
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
          return applyToast("Please select jpg,png or jpeg type image", 'info');
        }
      };

    return (
        <div className="container">
            <PreviewHeader />
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>
                            <div className="">
                                <h1 className="font-sans subpixel-antialiased font-bold text-center text-slate-600">One of Us?</h1>
                                <br />
                                <h4 className="font-mono font-thin text-white px-10 text-center">If you already has an account, just log in. We've missed you!</h4>
                            </div>
                            <br />
                        <Link to="/login">
                            <Button type="button" variant="alternative">
                                Login Now!
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <div className="">
                                <h1 className="font-sans subpixel-antialiased font-bold text-center text-slate-600">New Here?</h1>
                                <br />
                                <h4 className="font-mono font-thin px-10 text-center">Register and discover great amount of new opportunities!</h4>
                            </div>
                            <br />
                            <div className="grid grid-cols-1 md:grid-cols-2 space-x-3">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={user.firstName}
                                    required
                                    className={styles.input}
                                    style={{marginLeft: "10px"}}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={user.lastName}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={user.email}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="text"
                                    placeholder="Contact No"
                                    name="contactNo"
                                    onChange={handleChange}
                                    value={user.contactNo}
                                    required
                                    className={styles.input}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleChange}
                                    value={user.password}
                                    required
                                    className={styles.input}
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChangePw}
                                    value={confirmPw}
                                    required
                                    className={styles.input}
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                />
                            </div>
                            <h4 className="font-mono font-thin px-10 text-center">Optional - Choose profile picture</h4>
                            <div className="grid grid-cols-1 md:grid-cols-1 space-x-2">
                                <input
                                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input"
                                    type="file"
                                    size="80"
                                    onChange={(e) => onUploadImgToCloudinary(e.target.files[0])}
                                />
                            </div>
                            <Button type="submit" variant="red" disabled={apiResponseWaiting}>
                                Register
                            </Button>
                            {apiResponseWaiting && (
                                <div className="flex justify-center items-center">
                                    <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-red-700" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
		    </div>
            {/* <PreviewFooter /> */}
        </div>
    )
}