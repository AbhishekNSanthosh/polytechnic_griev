import React from 'react'
import './DataTable.css'
import { GridLoader} from 'react-spinners'
import DataTableItem from '../DataTableItem/DataTableItem';
import DataTableItemMobile from '../DataTableItem/DataTableItemMobile';

const DataTable = ({ userType, data, loading, Token, getletterCall }) => {
    return (
        <div className='table-container'>
            {/* <span>{data.length}</span> */}
            <div className='table-wrap'>

                {loading ?
                    <div className="loading">
                        <GridLoader size={18} color="red" />
                    </div>
                    :
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Sl. No</th>
                                <th>Subject</th>
                                <th>Date</th>
                                {userType === 'Admin' && <>
                                    <th>Read Status</th>
                                    <th>Actions</th>
                                </>}
                            </tr>
                        </thead>

                        {data && data.map((item, index) => (
                            <DataTableItem getletterCall={getletterCall} loading={loading} Token={Token} index={index} key={index} item={item} userType={userType} />
                        ))}
                    </table>

                }
            </div>
            {loading ?
                <div className="mobile-loading">
                    <div className="loading-spinner">
                        <GridLoader size={18} color="red" className='loading-square' />
                    </div>
                </div>
                :
                <>
                    {data && data.map((item, index) => (

                        <DataTableItemMobile getletterCall={getletterCall} item={item} key={index} Token={Token} index={index} userType={userType} />

                    ))}
                </>
            }
        </div>
    )
}

export default DataTable