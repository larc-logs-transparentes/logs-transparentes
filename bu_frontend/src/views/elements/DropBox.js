import { useDropzone } from 'react-dropzone';
import React, { Component, useState } from 'react';

import styled from 'styled-components';
//import Axios from 'axios';
//const [imageSent, setImageSent] = useState([]);

//const handleFile = (e) => {
//    setImageSent(e.target.files[0]);
//  };

//const uploadFiles = () => {
//    const formData = new FormData();
//    console.log(imageSent);
//    formData.append('image', imageSent);
//    formData.append('key', 'Your Api key goes here');
//    Axios.post('https://api.imgbb.com/1/upload', formData).then((response) => {
//      console.log(response);
//    });
//  };

const getColor = (props) => {
	if (props.isDragAccept) {
		return '#00e676';
	}
	if (props.isDragReject) {
		return '#ff1744';
	}
	if (props.isFocused) {
		return '#2196f3';
	}
	return '#eeeeee';
};

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px;
	border-width: 2px;
	border-radius: 10px;
	border-color: ${(props) => getColor(props)};
	border-style: dashed;
	background-color: #fafafa;
	color: black;
	font-weight: bold;
	font-size: 1.4rem;
	outline: none;
	transition: border 0.24s ease-in-out;
`;

function DropBox({ onDrop }) {
	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		open,
		isDragAccept,
		isFocused,
		isDragReject,
	} = useDropzone({
		accept: 'image/*',
		onDrop,
		noClick: true,
		noKeyboard: true,
	});

	const lists = acceptedFiles.map((list) => (
		<li key={list.path}>
			{list.path} - {list.size} bytes
		</li>
	));

    

	return (
        
		<>
			{' '}
            
			<section className="dropbox">
				<Container
					className="dropbox"
					{...getRootProps({ isDragAccept, isFocused, isDragReject })}
				>
					<input {...getInputProps()} />
                    {/*<input {...getInputProps({
                            onChange: handleFile,
                        })}/>*/}
					<p>Clique ou solte aqui os Boletins de Urna</p>
					<button type="button" className="btn" onClick={open}>
						Selecionar Arquivo
					</button>
                    {/*<button className="upload-btn" onClick={() => uploadFiles()}>Upload Images</button>*/}

				</Container>
			</section>
			<aside>
				<h4>List</h4>
				<p>{lists}</p>
			</aside>
		</>
	);
    
}

export default DropBox;