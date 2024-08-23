import { useState } from "react";
import NavBar from "../../components/LayoutComponents/NavBar";
import "./ItemReport.css";
import ReportHeader from "../../components/report/header/ReportHeader";
import itemRequest from "../../api/Item/item.request";

const ItemReport = () => {

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

    const [dateFilteredData, setDateFilteredData] = useState([]);

    const onGenerate = () => {

        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        itemRequest.getItems().then((res) => {
            console.log("Item page: onGenerate");
            const datas = res.data.data
            console.log(datas);
            setDateFilteredData(datas.filter(e => e.createdAt >= startDate && e.createdAt <= endDate));
            console.log(dateFilteredData);
        })

    }

    return (
        <div>
            <NavBar />
            <ReportHeader onGenerate={onGenerate} />
            <br /><br />

            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                User Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Item Name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Price
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Quantity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (dateFilteredData.map(i => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {i.createdBy.firstName}
                                        </th>
                                        <td className="py-4 px-6">{i.name}</td>
                                        <td className="py-4 px-6">{i.price}</td>
                                        <td className="py-4 px-6">{i.quantity}</td>
                                    </tr>
                                );
                            }))
                        }

                    </tbody>
                </table>

                <br /><br />
            </div>


        </div>
    );
}

export default ItemReport;