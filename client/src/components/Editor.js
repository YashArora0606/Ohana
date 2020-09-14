import React, { Component } from 'react';
import fileUrlUtil from '../utils/fileUrl';
import AceEditor from 'react-ace';
import "./editor.css"
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "../utils/modeImport";

export default class Editor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            session: null
        }
    }

    componentDidMount(){

        // Firebase configuration for real-time collaboration on firepad
        var firebaseConfig = {
            apiKey: "AIzaSyAceJM2eYvADgHBHtwCFl1EJjdQlGBzJFk",
            authDomain: "codepals-11647.firebaseapp.com",
            databaseURL: "https://codepals-11647.firebaseio.com",
            projectId: "codepals-11647",
            storageBucket: "codepals-11647.appspot.com",
            messagingSenderId: "434011141059",
            appId: "1:434011141059:web:da6f150db2f7f67563c376"
        };
        // Initialize Firebase
        window.firebase.initializeApp(firebaseConfig);

        //// Create ACE
        var editor = window.ace.edit("firepad-container");
        editor.setOptions({
            fontFamily: "Fira Code",
            theme: 'ace/theme/tomorrow_night',
            indentedSoftWrap : false,
        });
        var session = editor.getSession();
        session.setUseWrapMode(true);
        session.setUseWorker(false);
        // session.setMode("ace/mode/" + this.props.mode);
        session.setMode("ace/mode/text");

        this.setState({
            session
        });
    }

    componentDidUpdate() {
        this.state.session.setMode("ace/mode/" + this.props.mode);
    }

    render() {
        // Get Firebase Database reference.
        var firepadRef = this.getRef(this.props.fileUrl);      

        // Create Firepad.
        var firepad = window.Firepad.fromACE(firepadRef, editor, {
            defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n    var message = "Hello, world.";\n    console.log(message);\n}'
        });

        return (
            <div 
            id="firepad-container"
            style={{
                "height": '80vh',
                "margin": '0 20px 0 20px',
                fontSize: this.props.fontSize,
            }}
            >
                {/* <AceEditor
                    focus //Autofocus
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    mode={this.props.mode}
                    theme='tomorrow_night'
                    commands={[
                        {
                            name: 'save',
                            bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
                            exec: this.props.submit
                        }
                    ]}
                    name="paste-pal-editor"
                    showGutter={false}
                    editorProps={{ $blockScrolling: true }}
                    wrapEnabled={true}
                    showPrintMargin={false}
                    height={"100%"} //TODO: Implement dynamic height with CSS -Tony
                    width={"100%"}
                    fontSize={this.props.fontSize}
                    setOptions={{
                        "indentedSoftWrap":false,
                    }}
                    style={{
                        "fontFamily": 'Fira Code'
                    }} /> */}
            </div>
        );
    }

    getRef(fileUrl) {
        var ref = window.firebase.database().ref();
        if (fileUrl !== undefined) { // if a file url is specified, use that as ref
          ref = ref.child(fileUrl);
        } else { // The user has not yet been directed to a room, use a random firebase location   
            ref = ref.push(); // generate unique location.
            // window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
        }
        if (typeof console !== 'undefined') {
          console.log('Firebase data: ', ref.toString());
        }
        return ref;
      }
}