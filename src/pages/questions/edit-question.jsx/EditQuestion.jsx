import { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { uploadImgToCloudinary } from "../../../helper/helper";
import { applyToast } from "../../../components/toast-message/toast";
import DialogTitle from "../../../components/dialog/DialogTitle";
import DialogContent from "../../../components/dialog/DialogContent";
import DialogActions from "../../../components/dialog/DialogActions";
import Button from "../../../components/buttons/Buttons";
import { updateQuestionById } from "../../../api/QuestionsApi";

export default function EditQuestion(props) {
    const [question, setQuestion] = useState(props.questionObject);
    const [tags, setTags] = useState(question.tags);
    const [image, setImage] = useState();

    useEffect(() => {
        console.log(tags)
    }, [tags])
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
    };

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();
        applyToast('Question is updating', 'info');
        try {
            let imageUrl;
            if (image) {
                imageUrl = await handleImageOnInput(image);
            }
            const updatedQuestion = {
                createdBy: question.createdBy,
                title: question.title,
                description: question.description,
                imageUrl: imageUrl,
                tags: tags
            }
            await updateQuestionById(question._id, updatedQuestion);
            applyToast('Question updated', 'success');
            window.location.reload(false);
        } catch (err) {
            applyToast();
        }
    }
    return (
        <>

            <DialogTitle>
                Edit Question
            </DialogTitle>
            <DialogContent>
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
                            value={question.title}
                            onChange={onInputChange}
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="name@flowbite.com"
                            required
                        />
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
                            value={question.description}
                            onChange={onInputChange}
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Describe your question..."
                            defaultValue={""}
                        />
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
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateQuestion}>Update</Button>
                <Button variant={"alternative"} onClick={() => props.setEditModelOpen(false)}>Cancel</Button>
            </DialogActions>
        </>
    )
}