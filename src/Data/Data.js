import React from 'react';

const Data = (props) => {
    const {first_name,img,gender,email}=props.user;
    const plus=props.plus;
   
     const styleDiv={border:'1px solid red',margin:'10px',padding:'10px',backgroundColor:'grey',}
    return (
        <div style={styleDiv}>
            <img style={{height:'70px'}}src={img} alt=""/>
            <h2>{first_name}</h2>
            
            <p>{gender}</p>
            <h3>{email}</h3>
            <button onClick={() =>props.handleAddperson(props.user)}>Add me</button>
            
        </div>
    );
};

export default Data;