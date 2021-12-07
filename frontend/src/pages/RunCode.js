import axios from 'axios';
import React from 'react';
import pathString from '../PathString';
import Header from '../sections/Header';

const Editor = (props) => {
    const [value, setValue] = React.useState(props.name);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <textarea id="noter-text-area" className="form-control" rows="10" name="textarea" value={value} onChange={handleChange} />
    );
}

export default function RunCode() {

    const [code, setCode] = React.useState('');

    function runCode() {
        // var language = document.getElementById("language").value;
        axios.post('http://licenta.setrofex.tk/compile', {
            code: code,
            language: 0,
            stdin: "",
        }).then(function (response) {
            console.log(response);
            document.getElementById("output").value = response.data.output;
            document.getElementById("output").value = response.data.errors;

        }).catch(function (error) {
            console.log(error);
        }
        );
    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-2 pb-3">
                        <div className="form-group">
                            <label htmlFor="language">Select Language</label>
                            <select className="form-control" id="language">
                                <option value="0">Python</option>
                                <option value="6">C++</option>
                                <option value="7">Java</option>
                                <option value="3">JavaScript</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Run Code</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Code</label>
                                            <Editor name="print('Hello')" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Output</label>
                                            <textarea className="form-control" rows="10" id="output"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary mt-3" onClick={runCode}>Run Code</button>
                    </div>
                </div>
            </div>
        </div>
    );
}