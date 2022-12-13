import Modal from 'react-modal';

type ConfirmPropsType = {
    isOpen: boolean;
    onClose: Function;
    onSubmit: Function;
}

const ConfirmModal = (props: ConfirmPropsType) => {
    const { isOpen, onClose, onSubmit } = props;

    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => onClose()}
            style={{
               overlay: {
                    background: 'rgb(40, 44, 52)'
               },
               content: {
                    inset: '34%',
                    backgroundColor: '#282c34',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 18
               }
            }}
            contentLabel="Example Modal"
        >
            <p style={{ marginBottom: 20 }}>Are you sure ?</p>
            <div className='flex_row'>
                <button className='primary_button' onClick={() => onSubmit()} style={{ marginRight: 8 }}>OK</button>
                <button className='cancel_button' onClick={() => onClose()} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
        </Modal>
    )
}

export default ConfirmModal