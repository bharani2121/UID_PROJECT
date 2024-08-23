import NavBar from "../../components/LayoutComponents/NavBar";
import "./QuestionReport.css";
import { useState } from "react";
import { getAllQuestions, getTags } from "../../api/QuestionsApi";
import { applyToast } from "../../components/toast-message/toast";
import DoughnutChart from "../../components/report/charts/DoughnutChart";
import ReportHeader from "../../components/report/header/ReportHeader";
import Table from "../../components/Table/Table";

export default function QuestionReport(props) {
    const [tagsLabels, setTagsLabels] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const [questions, setQuestions] = useState([]);

    const filterQuestions = (questions, startDate, endDate) => {
        const unsortedQuestions = []
        questions.forEach((question) => {
            const createdAt = question.createdAt.substr(0, question.createdAt.indexOf('T'));
            if((new Date(startDate) < new Date(createdAt)) && (new Date(createdAt) < new Date(endDate))) {
                unsortedQuestions.push(question)
            }
        });
        return sortQuestionsByViews(questions);
    }

    const sortQuestionsByViews = (questions) => {
        return questions.sort((a, b) => (a.numOfViews > b.numOViews ? -1 : 1));
    }

    const onGenerate = () => {
        // getting selected start date and end date from date pickers in ReportHeader.jsx
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        // making labels and data empty to rerender the Dougnut chart after fetching data.
        // Doughnut chart eke props wenas unama rerender wena widiyata eyala hadala na.
        setTagsLabels([]);
        setTagsData([]);

        // fetching data and setting label and data values
        getTags({ startDate, endDate })
            .then(res => {
                const tags = res.data.data;
                setTagsLabels(Object.keys(tags));
                setTagsData(Object.values(tags));
                console.log('tagsLabels', tagsLabels)
                console.log('tagsData', tagsData)
            })
            .catch(err => applyToast())

        getAllQuestions()
            .then(res => {
                const sortedQuestions = filterQuestions(res.data.data, startDate, endDate);
                setQuestions(sortedQuestions);
            })
            .catch(() => applyToast());
    }

    return (
        <>
            <NavBar />
            <ReportHeader onGenerate={onGenerate} />
            {(questions.length === 0 || tagsData === 0) && <p>Choose start date and end date. then click on generate report</p>}

            <div className="grid grid-cols-2 gap-2">
                <div className="mt-5">
                    {questions.length !== 0 && <Table
                        head={
                            <>
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Thread ID
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        No Of Views
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Posted By
                                    </th>
                                </tr>
                            </>
                        }
                        body={
                            <>
                                {
                                    questions.map((row) => (
                                        <tr className='self-center'>
                                            <td className='py-4 px-6'>{row._id}</td>
                                            <td className='py-4 px-6 justify-self-center'>{row.numOfViews}</td>
                                            <td className='py-4 px-6 justify-self-center'>{row.createdBy.username}</td>
                                        </tr>
                                    ))
                                }
                            </>
                        }
                    />}
                </div>
                <div className="h-96 w-96 justify-self-center lg:mt-0 mt-7 p-2">
                    {tagsLabels && tagsData &&
                        <DoughnutChart
                            labels={tagsLabels}
                            data={tagsData}
                        />
                    }
                </div>
            </div>

        </>
    )
}