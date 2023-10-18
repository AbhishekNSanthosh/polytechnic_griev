import React, { useState } from 'react'
import './DataTableItem.css'
import { useNavigate } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios'
import { Box, Fade, Modal } from '@mui/material'
import { toast } from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    bgcolor: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

function DataTableItem({ item, userType, Token, index, getletterCall }) {

    const navigate = useNavigate();
    const [modal, setModal] = useState(false)

    const handleClose = () => {
        setModal(false)
    }
    const url = 'https://poly-backend-64o7.onrender.com'
    const handleDetele = (data) => {
        axios.delete(`${url}/delete_letter/${data}/`, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            toast.success('Deleted successfully.', {
                position: 'bottom-center',
                style: {
                    backgroundColor: 'black',
                    color: '#fff'
                }
            });
            getletterCall(true)
            setModal(false)
        }).catch((error) => {
            setModal(false);
            if (error?.response?.status === 401) {
                localStorage.clear()
            }
        })
    }
    return (
        <>
            <tbody className='tbody'>
                <>
                    <tr key={index} style={{ cursor: 'pointer' }}>
                        <td>{index + 1}</td>
                        <td className='t-data-body data' onClick={() => navigate('/dashboard/view', { state: item?.id })}>
                            {item?.title.length > 18 ? item?.title.slice(0, 18) + "....." : item?.title}
                        </td>
                        <td>{item?.created_on.slice(0, 10)}</td>
                        {userType === 'Admin' && <>
                            {item?.status === true ?
                                <td><span className="material-icons done">mark_email_read</span></td>
                                :
                                <td><span className="material-icons undone">mark_email_unread</span></td>
                            }
                            <td>
                                <div className="table-action">
                                    <span className="material-icons icon" onClick={() => {
                                        setModal(true);
                                    }}
                                    >delete_outline</span>
                                </div>
                            </td>
                        </>}
                    </tr>

                </>
            </tbody>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modal}>
                    <Box sx={style}>
                        <div className="modal-box">
                            <div className="modal-row">
                                <span className="delete-confirm">Are you sure you want to delete ?</span>
                            </div>
                            <div className="modal-row">
                                <button className="confirm" onClick={() => {
                                    handleDetele(item?.id)
                                }}>CONFIRM</button>
                                <button className="cancel" onClick={handleClose}>CANCEL</button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default DataTableItem