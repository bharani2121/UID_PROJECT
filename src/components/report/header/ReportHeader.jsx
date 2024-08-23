
import Button from '../../buttons/Buttons';
import './Header.css';

export default function ReportHeader(props) {

    return (
            <div className="p-3 bg-gray-300 lg:grid lg:grid-cols-3 grid grid-cols-1">
                <div className="lg:col-span-1 col-span-1 ">
                    <span>Start Date</span>
                    <br />
                    <input type="date" id="startDate" className="w-full lg:w-60 p-2 rounded-md" />
                </div>
                <div className="lg:col-span-1 col-span-1 ">
                    <span>End Date</span>
                    <br />
                    <input className='w-full lg:w-60 p-2 rounded-md' type="date" id="endDate"/>
                </div>
                <div className='lg:col-span-1 grid grid-cols-2'>
                    <div className="col-span-1 px-4 lg:justify-self-center" >
                        <div className="btn-wrapper">
                            <Button onClick={props.onGenerate}>Generate Report</Button>
                        </div>
                    </div>
                    <div className="btn-wrapper">
                        <center>
                            <Button variant="dark" onClick={() => window.print()}>Convert to PDF</Button>
                        </center>
                    </div>
                </div>
            </div>
    )
}