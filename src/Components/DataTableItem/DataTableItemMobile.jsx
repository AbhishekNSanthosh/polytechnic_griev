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
    maxWidth: 400,
    bgcolor: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

function DataTableItemMobile({ index, item, userType, Token, getletterCall }) {
    const [modal, setModal] = useState(false)

    const handleClose = () => {
        setModal(false)
    }
    const url = 'https://poly-backend-64o7.onrender.com'
    //Function to delete 
    const handleDetele = (data) => {
        axios.delete(`${url}/delete_letter/${data}/`, {
            headers: {
                'x-access-token': Token
            }
        }).then((res) => {
            getletterCall(true)
            toast.success('Deleted successfully.', {
                position: 'bottom-center',
                style: {
                    backgroundColor: 'black',
                    color: '#fff'
                }
            });
            setModal(false)
        }).catch((error) => {
            setModal(false);
            if (error?.response?.status === 401) {
                localStorage.clear()
            }
        })
    }
    const navigate = useNavigate();

    return (
        <>
            <div className="mobile-container" key={index}>
                <div className="mobile-div">
                    <div className="mobile-row-left" onClick={() => navigate('/dashboard/view', { state: item?.id })}>
                        {userType === 'Admin' ?
                            <div className="mobile-row-left-row">
                                <span className='data'>{item?.title.slice(0, 25)}...</span>
                            </div>
                            :
                            <div className="mobile-row-left-row">
                                <span className='data'>{item?.title.slice(0, 85)}...</span>
                            </div>
                        }
                        <div className="mobile-row-left-row">
                            <span className='data-date'>{item?.created_on.slice(0, 10)}</span>
                        </div>
                    </div>
                    {userType === 'Admin' &&
                        <div className="mobile-row-right">
                            <div className="mobile-row-left-row">
                                {item?.status === true ?
                                    <span className="material-icons icon">mark_chat_read</span>
                                    :
                                    <span className="material-icons green">mark_chat_unread</span>
                                }
                            </div>
                            <div className="mobile-row-left-row">
                                <span className="material-icons icon"
                                    onClick={() => {
                                        setModal(true);
                                    }}
                                >delete_outline</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
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

export default DataTableItemMobile