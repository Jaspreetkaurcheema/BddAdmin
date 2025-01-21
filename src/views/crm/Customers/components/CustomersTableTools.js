import React, { useRef } from 'react'
import { Button } from 'components/ui'
import { getCustomers, setTableData, setFilterData } from '../store/dataSlice'
import CustomerTableSearch from './CustomerTableSearch'
import CustomerTableFilter from './CustomerTableFilter'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'
import { HiDownload } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const CustomersTableTools = ({ setSelectedCard, selected }) => {

    const dispatch = useDispatch()

    const inputRef = useRef()

    const tableData = useSelector((state) => state.crmUsers.data.tableData)
    const data = useSelector((state) => state.crmUsers.data.customerList?.users)
    const handleInputChange = (val) => {
        console.log(val, 'vvvvcvcvc')
        const newTableData = cloneDeep(tableData)
        newTableData.search = val
        newTableData.pageNumber = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        // dispatch(getCustomers(data))
    }
    function exportTableToCSV(tableData, fileName) {
        if (!Array.isArray(tableData) || tableData.length === 0) {
            console.error('No data to export');
            return;
        }

        // Extract headers from the first object
        const headers = Object.keys(tableData[0]);

        // Prepare CSV rows
        const csvRows = [];
        csvRows.push(headers.join(',')); // Add headers as the first row

        // Add data rows
        tableData.forEach((row) => {
            const values = headers.map((header) => `"${row[header] || ''}"`); // Escape values and handle undefined/null
            csvRows.push(values.join(','));
        });

        // Create CSV content
        const csvContent = csvRows.join('\n');

        // Create a Blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
    }


    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.search = ''
        inputRef.current.value = ''
        dispatch(setFilterData({ filterType: 0 }))
        fetchData(newTableData)
    }
    const handleExport = () => {
        exportTableToCSV(data, 'users.csv');
    };
    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableSearch
                    ref={inputRef}
                    onInputChange={handleInputChange}
                />
                <CustomerTableFilter setSelectedCard={setSelectedCard} selected={selected} />
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <Link >
                    <Button onClick={handleExport} block size="sm" icon={<HiDownload />}>
                        Export
                    </Button>
                </Link>
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div>
        </div>
    )
}

export default CustomersTableTools
