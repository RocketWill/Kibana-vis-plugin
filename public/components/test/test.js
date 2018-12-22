import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export class Test extends React.Component {
    render(){
        return(
            <DayPicker showOutsideDays />
        );
    }
}