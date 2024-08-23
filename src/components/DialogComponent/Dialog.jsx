import React from 'react'
import Button from '../buttons/Buttons'

export default function Dialog(props) {
  return (
    <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id={props.id} tabIndex={-1} aria-modal="true" role="dialog">
    <div className={
        props.size === 'XL'? 
        "modal-dialog modal-xl modal-dialog-centered relative w-auto pointer-events-none":
        "modal-dialog modal-dialog-centered relative w-auto pointer-events-none"
      }
    >
      <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5 className="text-xl font-medium leading-normal text-gray-800">
            {props.title}
          </h5>
          <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" 
          data-bs-toggle="tooltip" data-bs-placement="top" title="Close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body relative p-4">
            {props.content}
        </div>
        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <div className="transition duration-150 ease-in-out px-3" data-bs-dismiss="modal" >
              <Button variant={'alternative'} onClick={props.close}>Close</Button>
          </div>
          {
            props.buttonName?
              <div className='transition duration-150 ease-in-out ml-1' data-bs-dismiss="modal">
                  <Button onClick={props.action}>{props.buttonName}</Button>
              </div>
              :
              <>
              </>
          }
          
        </div>
      </div>
    </div>
    </div>
  )
}

