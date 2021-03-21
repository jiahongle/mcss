import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import './eventDetailPage.css';


export default function EventDetailPage (backRoute) {
    let {id} = useParams()
  
    return (
    <div>
        <div className="AppContent">
            <h1>{id}</h1>
        </div>
    </div>
    );
  }