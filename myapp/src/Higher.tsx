import React from 'react';
import axis from 'axios';
type Props = {
    callurl: string,

}
type List = {
    id:number
    name: string,
    gender: string,
    phoneno: string,
    email: string,
    dob:string,
    date:string
  };
  type prop={
    list:List[];
  }
interface dattas {
    states:prop | {} ;
}
const Higher = (Component: React.ComponentType<any>,callurl:string) => {

    const Child = (states : any) => {
        const [state, setState] = React.useState({});
        React.useEffect(() => {
            axis.get(callurl).then((res) => {
                setState(res.data);
            })
        })
        return <Component  states={state}/>
    }
    return Child;
}

export default Higher
