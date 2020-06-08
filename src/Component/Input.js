import React, { Component } from "react";
import Para from "./para";


class Input extends Component {

    //calling the localstorage refrence in constructor instead of componentwillmount
    constructor() {
        super();
        // console.log("constructor call")

        
        let todoinput = null;
        const array = JSON.parse(localStorage.getItem('textarray'))
        // const sortedarray=this.sortingfunction(array)
        
        this.state = {
            todotext: '',
            textarray: array === null ? [] : array,
            editbtn: false
        }
    }
    // componentDidMount() {
        // console.log("componentditmoubnt hit");
        // const arrayfound = localStorage.getItem('textarray')
        // console.log({ arrayfound })
        // if (arrayfound.length!==0) {
        //     const array = localStorage.getItem('textarray')
        //     this.setState({
        //         todotext: "",
        //         textarray: array,
        //         editbtn: false
        //     })

        // this.inputrefrence.current.focus();

    // }

    // }
    // componentWillMount(){
    //     console.log("will mount call")
    //     const arrayfound = localStorage.getItem('textarray')
    //     console.log({ arrayfound })
    //     if (arrayfound.length!==0) {
    //         const array = localStorage.getItem('textarray')
    //         this.state.textarray=array;
    //         console.log(this.state.textarray.length)
    //     }
    // }
    inputtexthandler = (event) => {
        var text = event.target.value;
        // this.setState({
        //     todotext: text
        // })

        //Setting State correctly
        this.setState((prevState, props) => {
            return {
                todotext: text
            }
        })
    }

    editbutton = () => {
        console.log("edit function hit")

        // this.setState({
        //     editbtn: !(this.state.editbtn),
        //     textarray: this.state.textarray
        // })


        //Setting State correctly
        this.setState((prevState, props) => {
            return {
                editbtn: !(prevState.editbtn),
                textarray: prevState.textarray

            }
        })
    }

    editpara = (event, index) => {
        console.log("edit function hit")
        const newarray = [...this.state.textarray]
        newarray[index].tododata = event.target.value
        localStorage.setItem('textarray', JSON.stringify(newarray))
        // this.setState({
        //     textarray: newarray
        // })

        //Setting State correctly
        this.setState((prevState, props) => {
            return {
                textarray: newarray
            }
        })

    }

    deletepara = (index) => {
        // console.log("delete fire");
        console.log({ index });
        const newarray = [...this.state.textarray]//copy the whole array not only the refrence
        newarray.splice(index, 1);
        localStorage.setItem('textarray', JSON.stringify(newarray));
        // this.setState({ textarray: newarray, });

        //Setting State correctly
        this.setState((prevState, props) => {
            return {
                textarray: newarray,
            }
        })
    }

     sortingfunction(newarray){
            const arraywithoutchecked = newarray.filter((obj) => {
                return !(obj.checked)
            })
            const arraywithchecked = newarray.filter((obj) => {
                return (obj.checked)
            })
            
            const newa = [...arraywithoutchecked, ...arraywithchecked]
            return newa;
        }

    checkedhandlerdata(event, index) {
        // console.log(index)
        const newarray = [...this.state.textarray]
        const indexobject = newarray[index]
        const checkvalue = indexobject.checked;
        newarray[index].checked = !(checkvalue)
        const newa=this.sortingfunction(newarray)
        // console.log(newa)
        localStorage.setItem('textarray', JSON.stringify(newa))
        // console.log(array)
        this.setState((prevState, props) => {
            return {
                textarray: newa
            }
        })

    }

    submit = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            const newtextarray = [...this.state.textarray];//copy the original array into new array
            // newtextarray.push(event.target.value);
            const data = event.target.value
            const inputdata = {
                tododata: data,
                checked: false
            }
            newtextarray.push(inputdata);
           const sortedarray= this.sortingfunction(newtextarray)
            localStorage.setItem('textarray', JSON.stringify(sortedarray));
            const arr = localStorage.getItem("textarray")
            console.log(arr)
            // this.setState({
            //     todotext: "",
            //     textarray: newtextarray
            // })

            //Setting State correctly
            this.setState((prevState, props) => {
                return {
                    todotext: "",
                    textarray: sortedarray
                }

            })
        }

    }

    render() {
        // console.log("render method call")
        // console.log(this.state.textarray.length)
        // console.log(this.state.textarray)
        
        this.todoinput = this.state.textarray.map((text, index) => {
            return (<Para data={text.tododata} key={index}
                delete={() => this.deletepara(index)}
                checked={text.checked}
                checkedhandler={(event) => this.checkedhandlerdata(event, index)}
                edit={this.state.editbtn}
                editfunt={() => this.editbutton()}
                editpa={(event) => this.editpara(event, index)}
            />);
        }
        );

        return (
            <div>
                <input type='text'
                    placeholder='Press Enter to add the Todos'
                    className="inputfield"
                    onChange={this.inputtexthandler}
                    value={this.state.todotext}
                    onKeyPress={this.submit}></input>
                <p className='input'>{this.state.todotext}</p>
                <p>
                    {this.todoinput}
                </p>
            </div>
        );
    }

}


export default Input;