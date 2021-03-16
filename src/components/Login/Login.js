
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {  useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router";




 if(!firebase.apps.length)
 {

  firebase.initializeApp(firebaseConfig);
 }



function Login() {
const [loggedInUser,setloggedInUser]=useContext(UserContext);
  const provider = new firebase.auth.GoogleAuthProvider();
  const  fbprovider = new firebase.auth.FacebookAuthProvider();
  const history=useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" }};

   
  const [newuser,setNewUser] =useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
   
    email: '',
    photoURL: '',
    password: '',
    name: '',
    error: '',
    success:false

  })

  const handleSignIn = () => {

    firebase.auth()
      .signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          email: email,
          photoURL: photoURL,
          name: displayName
        }
        setUser(signedInUser);
       
      })

      .catch(error => {
        console.log(error);
        console.log(error.message)
      })

  }

  const handlefbsignin=()=>{
    firebase
    .auth()
    .signInWithPopup(fbprovider)
    .then((result) => {
      
      var credential = result.credential;
  

      var user = result.user;
     
  
     
      var accessToken = credential.accessToken;
      console.log("ok",user);
    })
    .catch((error) => {
   
      var errorCode = error.code;
      var errorMessage = error.message;
      
      var email = error.email;
     
      var credential = error.credential;
  
      
    });


  }

  const handleSignOut=() => {
    firebase.auth().signOut()
    .then( res=> {

      const signedOutUser = {
        isSignedIn: false,
        email: '',
        photoURL: '',
        name: ''
      }
     setUser(signedOutUser);
    })
    .catch(error =>
    {
      console.log(error);
    })


  }
  const handleBlur=(event) => {
    let isfieldValid=true;
    if(event.target.name === 'email'){
      isfieldValid=/\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      isfieldValid=event.target.value.length > 6 && /\d{1}/.test(event.target.value);
    }
    if(isfieldValid)
    {
    //  [...cart,newCart]
    const newUserInfo = {...user};
    newUserInfo[event.target.name]=event.target.value;
    setUser(newUserInfo);
    }
  }


  const handleSubmit =(event) => {
   
    if( newuser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error='';
        newUserInfo.success=true;
       setUser(newUserInfo);
       updateUserName(user.name);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
       setUser(newUserInfo);
      });
    }
    if(!newuser && user.email && user.password)
    {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user};
        newUserInfo.error='';
        newUserInfo.success=true;
       setUser(newUserInfo);
       setloggedInUser(newUserInfo);
       history.replace(from);
       console.log(res.user);
      
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
       setUser(newUserInfo);
      });
    }

    event.preventDefault();

  }
  const updateUserName =name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
     console.log('success added name')
    }).catch(function(error) {
     console.log(error)
    });

  }

  return (
    <div style={{textAlign:'center'}}>
     {
     user.isSignedIn ? <button onClick={handleSignOut}> Sign Out</button>:
     <button onClick={handleSignIn}>Sign In</button>
    
     }
     <br/>
     <button onClick={handlefbsignin}>sign in using facebook</button>
    
      {
      

          user.isSignedIn &&  <div> <p>Welcome {user.name}</p>
          <p>your Email:{user.email}</p>
           <img style ={{width:'100px'}}src={user.photoURL} alt="" srcset=""/>
           </div>

      }
     <h1>Our own authentication</h1>
     {/* <p>Name:{user.name}</p>
     <p>email:{user.email}</p>
     <p>password:{user.password}</p> */}
    <input type="checkbox" onChange={()=> setNewUser(!newuser)}   name="newUser" id=""/>
    <label htmlFor="newUser">New User Registration</label>
    <form onSubmit={handleSubmit}>
    {
      newuser && <input type="text"   onBlur={handleBlur}  name="name" placeholder="Name" required/>
    }
      <br/>
    <input type="text" onBlur={handleBlur}  placeholder="Email" name="email" required/>
     <br/>
     <input type="password" onBlur={handleBlur} name="password" placeholder="password" required/>
     <br/>
     <input type="submit" value={newuser ? 'sign up':'sign in'}/>



    </form>
    <h1 style={{color: 'red'}}>{user.error}</h1>
    {
        user.success && <h1 style={{color: 'green'}}>User {newuser ? 'Created': 'logged in'} successfully. </h1>
    }
     
    </div>
  );
}

export default Login;
