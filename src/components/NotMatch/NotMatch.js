import React from 'react';

const NotMatch = () => {
    const style={border:'3px dotted grey',color:'red'}
    return (
        <div style={style}>
             <h2>404 Error</h2>
            <h2>Sorry!! Page Not Found.</h2>
            <h3>Please try again.</h3>
        </div>
    );
};

export default NotMatch;