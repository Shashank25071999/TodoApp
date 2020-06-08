import React from 'react';
const Para = (props)=>{
        // console.log(props.checked)
        const input=props.edit?<input  type='text' onChange={props.editpa} placeholder='Enter the edit content' value={props.text}/>:null;
        return (
            <div className='todopara'>
                <input type='checkbox' checked={props.checked} onChange={props.checkedhandler}></input>
                <p className="para">{props.data}</p>
                <button className='button' onClick={props.delete}>Delete</button>
                <button className='button' onClick={props.editfunt}>Edit</button>
                {input}
            </div>
        );
    
}
export default Para;