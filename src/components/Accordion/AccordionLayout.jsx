import React from 'react';

const AccordionLayout = ({ title, children, index, activeIndex, setActiveIndex }) => {
    const handleSetIndex = (index) => (activeIndex !== index) && setActiveIndex(index);
    return (
            <>
            <div onClick={() => activeIndex === index? handleSetIndex(0) : handleSetIndex(index)} 
                    className={activeIndex === index ? 
                        'flex items-center justify-between bg-gray-200 w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                        :
                        'flex items-center justify-between bg-gray-50 w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }
            >
                <div className='flex'>
                    <div className='font-semibold text-left text-gray-800 rounded-t-xl '>{title}</div>
                </div>
                <div className="flex items-center justify-center">
                    {
                        (activeIndex === index) ?
                        <button onClick={()=>handleSetIndex(0)}>
                            <svg data-accordion-icon class="w-6 h-6 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                        :
                        <button>
                            <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    }
                </div>
            </div>
            {(activeIndex === index) && (
                <>
                    <div class="p-5 font-light border border-t-0 border-gray-200  dark:border-gray-700">
                        <p class="mb-2 text-gray-500 dark:text-gray-400">{children}</p>
                    </div>
                </>
            )}
            </>
      );
};

export default AccordionLayout;