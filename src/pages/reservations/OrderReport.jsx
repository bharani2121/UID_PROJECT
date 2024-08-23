import NavBar from "../../components/LayoutComponents/NavBar";
import { useState } from "react";
import { applyToast } from "../../components/toast-message/toast";
import DoughnutChart from "../../components/report/charts/DoughnutChart";
import ReportHeader from "../../components/report/header/ReportHeader";
import orderRequest from "../../api/Order/order.request";
import Table from "../../components/Table/Table";

export default function OrderReport() {
    const [buyerLabels, setBuyerLabels] = useState([]);
    const [buyerData, setBuyerData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [names] = useState([])
    const [id] = useState([])
    const tableD = useState([])
    const [status, setStatus] = useState(false)

    const onGenerate = () => {
        // getting selected start date and end date from date pickers in ReportHeader.jsx
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        // making labels and data empty to rerender the Dougnut chart after fetching data.
        // Doughnut chart eke props wenas unama rerender wena widiyata eyala hadala na.
        setBuyerLabels([]);
        setBuyerData([]);

        // fetching data and setting label and data values
        orderRequest.getOrderReport({ startDate, endDate })
            .then(res => {
                const buyer = res.data.data;
                const lables = Object.keys(buyer)
                const count = Object.values(buyer)
                for(let i = 0; i < 5; i++){
                    if(lables[i] !== undefined){
                        names[i] = lables[i].split(',').pop();
                        id[i] = lables[i].split(',')[0]
                        let data = {
                            id:id[i],
                            name:names[i],
                            count:count[i]
                        }
                        tableD[i] = data
                    }else{
                        break;
                    }
                }
                setTableData(tableD)
                setBuyerLabels(names);
                setBuyerData(Object.values(buyer));
                setStatus(true)
            })
            .catch(err => applyToast())
    }

    return status !== false ?(
        <>
            <NavBar />
            <br/>
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-6">
                    <div className="max-w-2xl mx-auto py-5 lg:max-w-none place-self-center">
                        <ReportHeader onGenerate={onGenerate}/>
                        <br/>
                            <div className="lg:grid lg:grid-cols-2 gap-2">
                            <div className="place-self-center">
                                <center>
                                    <h3 className='text-xl font-semibold lg:justify-self-start'>Top 5 users with most orders</h3>
                                </center><br/>
                                {
                                    status !== false ?
                                    <>
                                    <Table
                                        head={
                                            <>
                                                <tr>
                                                    <th scope="col" className="py-3 px-6">
                                                        Buyer's Name
                                                    </th>
                                                    <th scope="col" className="py-3 px-6">
                                                        Order Count
                                                    </th>
                                                </tr>
                                            </>
                                        }
                                        body={
                                            <>
                                            {
                                                tableData.map((row) =>(
                                                    <tr className='self-center'>
                                                        <td className='py-4 px-6'>{row.name}</td>
                                                        <div className="grid">
                                                            <td className='py-4 px-6 justify-self-center'>{row.count}</td>
                                                        </div>
                                                    </tr>
                                                ))
                                            }
                                            </> 
                                        }
                                    />
                                    </>:
                                    <></>
                                    
                                }
                            </div>
                            <div className="h-96 w-96 justify-self-center lg:mt-0 mt-7 p-2">
                                {buyerLabels && buyerData &&
                                    <DoughnutChart
                                        labels={buyerLabels}
                                        data={buyerData}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </>
    ):(
        <>
            <NavBar />
            <br/>
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-6">
                    <div className="max-w-2xl mx-auto py-5 lg:max-w-none place-self-center">
                        <ReportHeader onGenerate={onGenerate}/>
                        <br/>
                        <p>Choose start date and end date. then click on generate report</p>
                    </div>
                </div>
            </div>
            <br/>
        </>
    )
}