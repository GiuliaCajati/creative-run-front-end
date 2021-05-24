import React, {useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CreateDrawingForm = (props) => {
  const [ place, setPlace ]  = useState(1)
  const [ newDrawing, setDrawing ] = useState({name: ""})
  const createDrawing = props.createDrawing
  const openForm = props.open
  const setOpen = props.setOpen

  const handleChange = (event) => {
    let {id , value} = event.target 
    setDrawing(prevState => ({
        ...prevState,
        [id] : value,
    }))
  }

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(false)
    if(newDrawing.name !== "" && place === 1 ){
      setPlace(place + 1)
      return createDrawing(newDrawing)
    }
  }

  return(<div>
    <Dialog open={openForm} onClick={handleClick} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Drawing Name</DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="name"
          fullWidth
          onChange={handleChange}
          />
        </DialogContent>
      <DialogActions>
        <Button onClick={e => handleClick(e)} color="primary">
        Start Route
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  )
}

export default CreateDrawingForm;