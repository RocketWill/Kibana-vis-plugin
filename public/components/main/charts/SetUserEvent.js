//引入jQuery
import $ from 'jquery';
import "../jquery"

export default class SetUserEvent {
    static set(){

        var all_user_events = ['WINDOWS_FILE:Execute[system].dll', 'WINDOWS_FILE:Execute[system].dll', 'WINDOWS_FILE:Execute[temp]', 'WINDOWS_FILE:Permissions[windows error reporting report queue]'];

        const des = $('#description');
        des.empty();
        des.append("<p>All Users</p>");

        for(var i=0; i<all_user_events.length;i+=1){
            des.append("<p>"+all_user_events[i]+"</p>");
        }
    }
}