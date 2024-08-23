import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteQuestionById, getQuestionById, updateQuestionById } from "../../../api/QuestionsApi";
import Dialog from "../../../components/dialog/Dialog";
import DialogTitle from "../../../components/dialog/DialogTitle";
import DialogContent from "../../../components/dialog/DialogContent";
import DialogActions from "../../../components/dialog/DialogActions";
import NavBar from "../../../components/LayoutComponents/NavBar";
import QuestionCard from "../view-question/QuestionCard";
import Button from "../../../components/buttons/Buttons";
import { applyToast } from "../../../components/toast-message/toast";
import EditQuestion from "../edit-question.jsx/EditQuestion";
import Comment from "./comments/Comment";
import { addComment, deleteComment, getComments } from "../../../api/commentApi";
import { AuthContext } from "../../../App";

export default function ViewQuestion() {
    const loggedInUser = useContext(AuthContext);
    const { userId } = loggedInUser;
    const { id } = useParams();
    const [question, setQuestions] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [deleteModelOpen, setDeleteModelOpen] = useState(false);
    const [editModelOpen, setEditModelOpen] = useState(false);
    const [commentModelOpen, setCommentModelOpen] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchQuestion(id);
        fetchComments();
    }, []);

    const updateViewCount = (id, views) => {
        updateQuestionById(id, {numOfViews: views + 1});
    }

    const fetchComments = () => {
        getComments(id)
            .then(res => {
                console.log(res.data.data)
                setComments(res.data.data);
                updateQuestionById(id, {comments: [res.data.data.length]});
            })
            .catch((err => console.log(err)))
    }

    const handleDeleteQuestion = () => {
        deleteQuestionById(id)
            .then(() => window.location.href = "/questions")
            .catch(() => applyToast());
    }

    const fetchQuestion = (id) => {
        getQuestionById(id)
            .then(res => {
                setQuestions(res.data.data);
                setLoading(false);
                updateViewCount(res.data.data._id, res.data.data.numOfViews);
            });
    }

    const handleDeleteComment = async (id) => {
        applyToast('Comment deleting', 'info');
        await deleteComment(id);
        fetchComments();
    }

    const createComment = () => {
        const comment = {
            questionId: id,
            createdBy: userId,
            body: document.getElementById("commentBody").value
        };
        addComment(comment)
            .then(() => {
                applyToast('Comment Added', 'success');
                setCommentModelOpen(false);
                fetchComments();
            })
            .catch((e) => {
                applyToast()
                console.log(e)
            });
    }
    return (
        <>
            <NavBar />
            <br />
            <div className="bg-gray-100">
                <br />
                {deleteModelOpen && <>
                    <Dialog onClose={() => setDeleteModelOpen(false)}>
                        <DialogTitle>
                            Delete Question
                        </DialogTitle>
                        <DialogContent>
                            Are you sure you want to delete this questions?
                        </DialogContent>
                        <DialogActions>
                            <Button variant={"alternative"} onClick={() => setDeleteModelOpen(false)}>Close</Button>
                            <Button onClick={handleDeleteQuestion}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </>
                }
                {editModelOpen &&
                    <Dialog onClose={() => setEditModelOpen(false)}>
                        <EditQuestion
                            questionObject={question}
                            setEditModelOpen={setEditModelOpen}
                        />
                    </Dialog>
                }
                <div className="max-w-7xl mx-auto px-16 sm:px-16 lg:px-2">
                    {!isLoading &&
                        <QuestionCard
                            title={question.title}
                            createdBy={question.createdBy}
                            numOfViews={question.numOfViews}
                            tags={question.tags}
                            imageUrl={question.imageUrl}
                            createdAt={question.createdAt}
                            _id={question._id}
                            description={question.description}
                            onEdit={() => setEditModelOpen(true)}
                            onDelete={() => setDeleteModelOpen(true)}
                        />
                    }
                    <div className="flex justify-between ...">
                        <h3 className="text-2xl font-medium leading-normal text-gray-800">Comments</h3>
                        <Button variant="dark" onClick={() => setCommentModelOpen(true)}><h3>Add Comments</h3></Button>
                        {commentModelOpen &&
                            <Dialog onClose={() => setCommentModelOpen(false)}>
                                <DialogTitle>
                                    Add Comment
                                </DialogTitle>
                                <DialogContent>
                                    <textarea
                                        id="commentBody"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Type comment here..." />
                                </DialogContent>
                                <DialogActions>
                                    <Button variant={"alternative"} onClick={() => setCommentModelOpen(false)}>Close</Button>
                                    <Button onClick={createComment}>Add</Button>
                                </DialogActions>
                            </Dialog>
                        }
                    </div>
                    <hr />
                    {comments.map((comment, i) => 
                        <Comment 
                            userId={comment.createdBy._id}
                            username={comment.createdBy.username}
                            createdAt={comment.createdAt}
                            body={comment.body}
                            commentId={comment._id}
                            onDelete={handleDeleteComment}
                        />
                    )}
                </div>
                <br />
            </div>
            <br />
        </>
    )
}
