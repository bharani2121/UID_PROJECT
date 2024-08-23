import { useEffect, useContext, useState } from "react"
import { TagsInput } from "react-tag-input-component";
import { createQuestion } from "../../../api/QuestionsApi";
import { AuthContext } from "../../../App";
import Button from "../../../components/buttons/Buttons";
import NavBar from "../../../components/LayoutComponents/NavBar";
import { applyToast } from "../../../components/toast-message/toast";
import { uploadImgToCloudinary } from "../../../helper/helper";
import "./CreateQuestions.css"

export default function CreateQuestions() {
    const loggedInUser = useContext(AuthContext);
    const { userId } = loggedInUser;
    const [tags, setTags] = useState(["tags"]);
    const [image, setImage] = useState();
    const [question, setQuestion] = useState({
        createdBy: userId,
        title: "",
        description: "",
        imageUrl: "",
        tags: []
    });
    const [formErrors, setFormErrors] = useState({
        title: "",
        description: "",
        exist: false
    });

    useEffect(() => {
        setQuestion({ ...question, tags: tags });
    }, [tags])

    const IsFormValid = () => {
        if (question.title) {
            return true;
        }
        return false;
    }

    const validateForm = (name, value) => {
        if (name == 'title') {
            if (value.length > 100) {
                setFormErrors({title: "Title shouldn't be longer than 100 characters", exist: true});
            } else {{
                setFormErrors({title: "", exist: false});
            }}
        }
        if (name == 'description') {
            if (value.length > 5000) {
                setFormErrors({description: "Title shouldn't be longer than 5000 characters", exist: true});
            } else {{
                setFormErrors({description: "", exist: false});
            }}
        }

    }

    const handleCreateQuestion = async (e) => {
        if (IsFormValid()) {
            e.preventDefault();
            applyToast('Question is creating', 'info');
            try {
                let imageUrl;
                if (image) {
                    imageUrl = await handleImageOnInput(image);
                }
                const newQuestion = {
                    createdBy: question.createdBy,
                    title: question.title,
                    description: question.description,
                    imageUrl: imageUrl,
                    tags: question.tags,
                    numOfViews: 0,
                    comments: [0]
                }
                await createQuestion(newQuestion);
                applyToast('Question created', 'success');
            } catch (err) {
                applyToast();
            }
        }
    }

    const handleImageOnInput = (pic) => {
        return new Promise((resolve, reject) => {
            uploadImgToCloudinary(pic)
            .then((res) => res.json())
            .then((data) => {
                const imageUrl = data.url.toString();
                resolve(imageUrl);
            })
            .catch((err) => {
                applyToast('Image did not upload', 'error');
                reject(err)
            });
        })
    }

    const onInputChange = e => {
        const { name, value } = e.target
        setQuestion({ ...question, [name]: value });

        validateForm(name, value);
    };

    return (
        <>
            <NavBar />
            <br />
            <div className="bg-gray-100">
                <br />
                <div className="create-questions-container">
                    <h1 className="text-2xl mb-4">Create Question</h1>
                    <div className="create-questions-form-container">
                        <form>
                            <div className="mb-6">
                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Question Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    onChange={onInputChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                    placeholder="name@flowbite.com"
                                    required
                                />
                                <span class="text-sm text-red-600">{formErrors.title}</span>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Description (optional)
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={onInputChange}
                                    rows={4}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Describe your question..."
                                    defaultValue={""}
                                />
                                <span class="text-sm text-red-600">{formErrors.description}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="create-question-tags-container">
                                    <label
                                        htmlFor="repeat-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Add Tags
                                    </label>
                                    <TagsInput
                                        value={tags}
                                        onChange={setTags}
                                        name="fruits"
                                        placeHolder="Enter tags"
                                    />
                                </div>
                                <div className="create-question-image-input-container">
                                    <label
                                        htmlFor="repeat-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Add Image
                                    </label>
                                    <input
                                        className="block w-full p-1 text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        id="large_size"
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>

                            </div>
                            <br />
                            <div class="flex justify-end ...">
                                <div className="mr-2">
                                    <Button variant="alternative" onClick={() => window.location.href="questions"}>Cancel</Button>
                                </div>
                                <Button type="submit" onClick={handleCreateQuestion} disabled={formErrors.exist}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
            </div>
            <br/>
        </>
    )
}