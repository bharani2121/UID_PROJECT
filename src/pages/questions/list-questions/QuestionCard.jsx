import { timeSince } from "../../../helper/helper";
import './QuestionCard.css';

export default function QuestionCard({ title, createdAt, createdBy, numOfViews, imageUrl, tags, _id, commentsCount }) {
    return (
        <>
            <a
                href={`view-question/${_id}`}
                className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <div className="flex justify-between ...">
                    <p className="text-base font-medium text-gray-600">@{createdBy.username} &nbsp; {timeSince(new Date(createdAt))} ago </p>
                    <p className="text-base font-medium text-gray-600">{numOfViews} views</p>
                </div>

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
                <div className="geeks">
                    <img className="image rounded-lg" src={imageUrl} />
                </div>
                <div class="flex justify-end ...">
                    <p className="text-base font-medium text-gray-600">{commentsCount || 0} Comments </p>
                </div>
            </a>
        </>
    );
}