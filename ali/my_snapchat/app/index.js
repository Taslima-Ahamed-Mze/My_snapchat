import React,{ useEffect,useState } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Connection from '../components/Connection.js'
import Inscription from '../components/Inscription'
import Post from '../components/Post'
import DetailSnap from '../components/DetailSnap'
import AllSnap from '../components/AllSnap'
import AsyncStorage from '@react-native-community/async-storage';


const Routes = () => {

   const [isLoggedin,setLogged] = useState(null)
   const [token,setToken] = useState(null)

   useEffect(async ()=>{
      const tmpToken = await AsyncStorage.getItem('token')

      console.log(tmpToken,'tmptokeeen');
      if(tmpToken){
         setToken(tmpToken)
         // AsyncStorage.removeItem('token')
         setLogged(true) 
      }else{
         setLogged(false)
      }
   },[])
   return(
      <Router>
         <Scene key = "root">
            {
               (<>
                <Scene key="allsnap" navigationBarStyle={{display:'none'}} component={AllSnap} token={token} initial={isLoggedin}/>
                <Scene key="detailsnap" navigationBarStyle={{display:'none'}} component={DetailSnap} token={token} initial={isLoggedin}/>
                <Scene key="post" navigationBarStyle={{display:'none'}} component={Post} token={token} initial = {isLoggedin}/>
                <Scene key="connection" navigationBarStyle={{display:'none'}} component = {Connection} initial = {!isLoggedin} />
                <Scene key="inscription" navigationBarStyle={{display:'none'}} component = {Inscription} />
               </>
               )  
            }
         </Scene>
      </Router>
   )

}


export default Routes