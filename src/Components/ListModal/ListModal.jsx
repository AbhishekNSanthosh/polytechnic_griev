import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './ListModal.css'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ListModalList from '../ListModalList/ListModalList';
import axios from 'axios';
import { useEffect } from 'react';

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


export default function ListModal({ modalOpen, getModalStatus, modalOpenBy, Token, students, teachers, admins, loading }) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => getModalStatus(false);



    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen === 'list'}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalOpen === 'list'}>
                    <Box sx={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                         maxWidth: 600,
                         width:{
                            xs:'80%'
                         },
                         bgcolor: '#fff',
                         border: 'none',
                         borderRadius: '10px',
                         boxShadow: 24,
                         p: {
                            sm:4,
                            xs:1
                         },
                    }}>
                        <div className="modal-box">
                            <div className="modal-box-col">
                                <div className="modal-box-row">
                                    <div className="modal-box-row-item">
                                        {modalOpenBy === 'list-teachers' &&
                                            <span className="modal-box-title">All teachers</span>
                                        }
                                          {modalOpenBy === 'list-students' &&
                                            <span className="modal-box-title">All Students</span>
                                        }
                                          {modalOpenBy === 'list-admins' &&
                                            <span className="modal-box-title">All Admins</span>
                                        }
                                    </div>
                                </div>
                                <div className="modal-box-row">
                                    <div className="modal-box-row-item">
                                        <ListModalList loading={loading} students={students} teachers={teachers} modalOpenBy={modalOpenBy} admins={admins} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}