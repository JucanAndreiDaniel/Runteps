import AceEditor from "react-ace";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import React from 'react';
import { pathString2 } from '../PathString';
import Header from '../sections/Header';

import "ace-builds/src-noconflict/worker-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-scala";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/snippets/c_cpp";
import "ace-builds/src-noconflict/snippets/ruby";
import "ace-builds/src-noconflict/snippets/perl";
import "ace-builds/src-noconflict/snippets/rust";
import "ace-builds/src-noconflict/snippets/scala";
import "ace-builds/src-noconflict/snippets/php";
import "ace-builds/src-noconflict/snippets/golang";
import "ace-builds/src-noconflict/snippets/sh";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/keybinding-vscode";

export default function RunCode() {

    const [code, setCode] = React.useState("");
    const [output, setOutput] = React.useState('');
    const [langID, setLangID] = React.useState(0);
    const [color, setColor] = React.useState('');

    const languages = [
        {
            id: 0,
            name: 'Python',
            ext: 'python',
        },
        {
            id: 1,
            name: 'Ruby',
            ext: 'ruby',
        },
        {
            id: 2,
            name: 'PHP',
            ext: 'php',
        },
        {
            id: 3,
            name: 'Javascript',
            ext: 'javascript',
        },
        {
            id: 4,
            name: 'Scala',
            ext: 'scala',
        },
        {
            id: 5,
            name: 'Go',
            ext: 'golang',
        },
        {
            id: 6,
            name: 'C++',
            ext: 'c_cpp',
        },
        {
            id: 7,
            name: 'Java',
            ext: 'java',
        },
        {
            id: 8,
            name: 'Bash',
            ext: 'sh',
        },
        {
            id: 9,
            name: 'Perl',
            ext: 'perl',
        },
        {
            id: 10,
            name: 'Rust',
            ext: 'rust',
        }
    ];


    function runCode() {
        axios.post(pathString2 + '/compile', {
            code: code,
            language: langID,
            stdin: "",
        }).then(function (response) {
            if (!response.data.errors) {
                setOutput(response.data.output);
                setColor("success");
            }
            else {
                setOutput(response.data.errors);
                setColor("error");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const onCodeChange = (newValue) => {
        setCode(newValue);
    };

    const handleLangIDChange = (event) => {
        setLangID(event.target.value);
    };

    return (
        <>
            <Header />
            <Grid
                container
                component="main"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ padding: 2 }}>
                <CssBaseline />
                <Grid item xs={8}>
                    <AceEditor
                        placeholder="Write your code here..."
                        mode={languages[langID].ext}
                        theme="monokai"
                        name="editor"
                        width="100%"
                        onChange={onCodeChange}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={code}
                        enableBasicAutocompletion={true}
                        enableLiveAutocompletion={true}
                        enableSnippets={true}
                        showLineNumbers={true}
                        setOptions={{
                            useWorker: false,
                            tabSize: 2,
                        }} />
                </Grid>
                <Grid item xs={4}>
                    <FormControl variant="outlined" sx={{ mb: 6, mt: 2 }}>
                        <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={langID}
                            onChange={handleLangIDChange}
                            label="Language"
                        >
                            {languages.map((lang) => {
                                if (lang.ext) {
                                    return (
                                        <MenuItem key={lang.id} value={lang.id}>{lang.name}</MenuItem>
                                    );
                                }
                            })}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Output"
                        variant="outlined"
                        focused
                        color={color}
                        value={output}
                        multiline
                        fullWidth
                        InputProps={{ readOnly: true }}
                        rows={15} />
                </Grid>
            </Grid>
            <Fab
                variant="extended"
                color="primary"
                onClick={runCode}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}>
                Run
            </Fab>
        </>
    );
}