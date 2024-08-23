import React, { useState, useEffect } from 'react'
import NavBar from "../../components/LayoutComponents/NavBar";
import { applyToast } from "../../components/toast-message/toast";
import DoughnutChart from "../../components/report/charts/DoughnutChart";
import ReportHeader from "../../components/report/header/ReportHeader";
import { findUsers } from "../../api/User/userApi";
import "./UsersReport.css";
import Table from '../../components/Table/Table';
import { data } from 'autoprefixer';

export default function UsersReport(props) {
    const [tagsLabels, setTagsLabels] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const [dateFilteredData, setDateFilteredData] = React.useState([]);
    const [adminRoles, setAdminRoles] = React.useState([]);
    const [clientRoles, setClientRoles] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [isDataAvailable, setIsDataAvailable] = React.useState(false);
    const [apiResponseWaiting, setApiResponseWaiting] = React.useState(false);

    useEffect(() => {
        setIsDataAvailable(false);
    }, []);
    
    const getUsers = () => {
        setApiResponseWaiting(true);
        
        const startDate = document.getElementById("startDate").value;
        const endDate = document.getElementById("endDate").value;

        findUsers()
          .then(res => {
            if(res.data.isSuccessful) {
                setIsDataAvailable(true);                
                let userData = res.data.responseData;
                let filteredData = userData.filter(e => e.createdAt >= startDate && e.createdAt <= endDate);
                let clients = userData.filter(e => e.role === "CLIENT");
                let admins = userData.filter(e => e.role === "ADMIN");

                setUsers(userData);
                setDateFilteredData(filteredData);
                setClientRoles(clients);
                setAdminRoles(admins);
                
                let types=[];
                let values=[];
                for(let i=0;i<tableData.length;i++){
                    types.push(tableData[i].type);
                    values.push(tableData[i].count);
                }

                setTagsLabels(types);
                setTagsData(values);
                applyToast('Generated Successfully!', 'success');
                setTimeout(function(){
                    setApiResponseWaiting(false);
                }, 2000)
            } else {
                console.error("error");
                applyToast('Failed to Generate!', 'error');
            }
          })
          .catch(() => console.log("couldn't fetch"));
    };

    const tableData = [
        {
            type: "All Users",
            count: users?.length || 0
        },
        {
            type: "Registered Users",
            count: dateFilteredData?.length || 0
        },
        {
            type: "Client Users",
            count: clientRoles?.length || 0
        },
        {
            type: "Admin Users",
            count: adminRoles?.length || 0
        }
    ];

    return (
        <>
            <NavBar />
            <ReportHeader onGenerate={getUsers} />
            {isDataAvailable?
            <>
                {apiResponseWaiting ?
                    <>
                    <br />
                    <center>
                        <div className="flex justify-center items-center">
                            <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full text-red-800" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </center>
                    <br />
                    </> : 
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <br />
                            <Table
                                head={
                                    <>
                                        <tr>
                                            <th scope="col" className="py-3 px-6">Type</th>
                                            <th scope="col" className="py-3 px-6">Count</th>
                                        </tr>
                                    </>
                                }

                                body={
                                        <>
                                            {tableData.map((row) => (
                                                <tr className='self-center'>
                                                    <td className='py-4 px-6'>{row.type}</td>
                                                    <div className="grid">
                                                        <td className='py-4 px-6 ml-5'>{row.count}</td>
                                                    </div>
                                                </tr>
                                            ))}
                                        </> 
                                    }
                            />
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
                }
            </> :
            <><p>Loading...</p></>}
        </>
    )
}