import { useContext } from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { AuthContext } from '../../../../App';
import { timeSince } from '../../../../helper/helper';
import './Comment.css';

export default function Comment({ userId, username, createdAt, body, onDelete, commentId }) {
    const loggedInUser = useContext(AuthContext);
    const loggedInUserId = loggedInUser.userId;
    return (
        <>


            <div className="comment-body">

                <div className="flex justify-between ...">
                    <div>
                    <p className="text-base font-medium text-gray-500">@{username} &nbsp; {timeSince(new Date(createdAt))} ago </p>
                    <p className="text-base ml-3 font-medium ">{body}</p>
                    </div>
                    {userId == loggedInUserId &&
                        <div className="flex center-items text-3xl pt-2">
                            <div className="pr-5 cursor-pointer text-red-800" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete Question"><BsFillTrashFill data-bs-toggle="modal" onClick={() => onDelete(commentId)} /></div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
