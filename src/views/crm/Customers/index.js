import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import CustomersTable from './components/CustomersTable'
import CustomersTableTools from './components/CustomersTableTools'
import CustomerStatistic from './components/CustomerStatistic'
import { injectReducer } from 'store/index'
import reducer from './store'

injectReducer('crmUsers', reducer)

const Customers = () => {
    const [selected, setSelected] = useState({})
    // const [pageNo, setPageNo] = useState(0) 


    return (
        <>
       <div className="flex flex-col xl:flex-row gap-8 mt-8">
               {/* <div className='w-full'> 
                <CustomerStatistic setSelectedCard={setSelected} selected={selected} />
                </div> */}
               <div></div>
            </div>

            <AdaptableCard className="h-full" bodyClass="h-full">
                <CustomersTableTools setSelectedCard={setSelected} selected={selected} />
                <CustomersTable />
                {/* <CustomersTable pageNo={pageNo} /> */}
   </AdaptableCard>
   </>
    );
 

}

export default Customers
