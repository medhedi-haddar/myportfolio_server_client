import React,{useState} from 'react';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({text}) => {
   

    // editDescription -------------------------------------------------
       let editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(text)
        ));
        const [description, setDescription] = useState(editorState);

        const onEditorStateChange = (editorState) => {
        setDescription(editorState);
        }
    // -----------------------------------------------------------------


    return (
        <> 
            <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                />
            <textarea style={{display:'block'}} ref={(val) => text = val } disabled  value={draftToHtml(convertToRaw(description.getCurrentContent())) } /> 
        </>
    )
}

export default TextEditor
