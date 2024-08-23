import { timeSince } from "../../../helper/helper";
import { BsFillTrashFill, BsPencilSquare  } from "react-icons/bs";
import { AuthContext } from "../../../App";
import { useContext } from "react";

export default function QuestionCard({ title, createdAt, createdBy, onEdit, imageUrl, tags, onDelete, description }) {
    const loggedInUser = useContext(AuthContext);
    const { userId } = loggedInUser;
    return (
        <>
            <div
                className=""
            >
                <div className="flex justify-between ...">
                    <p className="text-base font-medium text-gray-600">@{createdBy.username} &nbsp; {timeSince(new Date(createdAt))} ago </p>
                    {userId == createdBy._id &&
                        <div className="flex center-items text-3xl pt-2">
                            <div className="pr-5 cursor-pointer text-gray-900" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Question"><BsPencilSquare data-bs-toggle="modal" onClick={onEdit} /></div>
                            <div className="pr-5 cursor-pointer text-red-800" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Question"><BsFillTrashFill data-bs-toggle="modal" onClick={onDelete} /></div>
                        </div>
                    }
                </div>

                <h5 className="mb-2 text-4xl font-medium tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p className="text-base font-medium text-gray-400">
                    {tags.map(tag => {
                        return (
                            <>
                                #{tag} &nbsp;
                            </>
                        )
                    })}
                </p>
                <div className="bg-cover">
                    <img className="rounded-lg" src={imageUrl} />
                </div>
                <div>
                    <p className="text-slate-600 text-lg m-3">{description}</p>
                </div>
                

            </div>
        </>
    );
}