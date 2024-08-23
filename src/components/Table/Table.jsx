import React from 'react'

export default function Table(props) {
  return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-baseline text-gray-700 font-bold uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {props.head}
            </thead>
            <tbody className='text-gray-700'>
                {props.body}
            </tbody>
            </table>
            <div className='w-full'>
            {
                props.pages ?
                <>
                    <nav className="flex justify-between items-center pt-4 text-xs text-gray-700 uppercase bg-gray-50 py-2 px-3" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Page {props.currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{props.pageCount}</span></span>
                    <span></span>
                    <ul className="inline-flex items-center -space-x-px">
                        {
                        props.pages.map((page) =>(
                            <li>
                                <p className={
                                    page === props.currentPage ? 
                                    "py-2 px-3 cursor-pointer leading-tight font-semibold text-white border border-gray-300 bg-gray-400 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    :
                                    "py-2 px-3 cursor-pointer leading-tight font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                                onClick={()=>props.pagination(page)}
                                >
                                {page}
                                </p>
                            </li>
                        ))
                    }
                    </ul>
                    </nav>
                </>
                :
                <></>
            }
            </div>
        </div>
  )
}
