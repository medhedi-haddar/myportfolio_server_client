import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import axios from 'axios';
import moment from 'moment';


export default class  UpdateAboutMe extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSchange = this.handleSchange.bind(this);
        this.state = {
            lastName : '',
            firstName : '',
            description : '',
            updateDate : '',
            gitHubLink : '',
            id : '',
            profileImage: '',

        }
      
    }
  
    
    onFileChange(e) {
        this.setState({profileImage : e.target.files[0]},
            ()=>{
                console.log(this.state.profileImage)
            }
            );  
    }
    handleSchange(e){
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        this.setState({fieldName : fieldValue},()=>{
            console.log(fieldName,this.state.fieldName)
        })
    }

     getAboutMe = async (active)=> {
         if(active === true){

             const response  = await axios.get('/api/about_me');
             const datares = response.data[0];
             console.log(datares);
             this.setState({ 
                 id : datares._id,
                 lastName : datares.lastName,
                 firstName : datares.firstName,
                 description : datares.description,
                 updateDate : moment(Number(datares.update_date)).format('MMMM Do YYYY, h:mm:ss'),
                 profileImage : datares.profileImage
                 
                });
            }
    }


     handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('lastName' , this.state.lastName);
        formData.append('firstName' , this.state.firstName);
        formData.append('description' , this.state.description);
        formData.append('profileImage' , this.state.profileImage);

        // const payload ={
        //     lastName :  this.state.lastName,
        //     firstName :  this.state.firstName,
        //     description :  this.state.description,
        //     profileImage :  this.state.profileImage

        // }
            console.log(this.state.lastName);
            return null;
        axios.post(
            '/api/update_about_me',
            formData,
            
            { 
            contentType: 'multipart/form-data',
            headers:{
                "content-type" : "multipart/form-data"
               
                }
            }).then((res)=> {
            console.log(res);
        })
        .catch((error)=>{
            console.log( "data not sent ", error);
        });


    }
    componentDidMount() {
        this.getAboutMe(true);
    }
   
    render(){
    return (
        <div>
            <div className="component_title">
                <h2><Link to={'/admin/about_me'} variant={"light"}><Button variant="light" className="me-2"><MdOutlineArrowBackIosNew/></Button></Link>About me update</h2>
                
            </div>
            <img src={this.profileImage}/>
            <Form onSubmit={this.handleSubmit}>
                <small className="last_update">Last update : {this.state.updateDate}</small>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" type="text" placeholder="Last Name" defaultValue={this.state.lastName} onChange={this.handleSchange}  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" type="text" placeholder="First Name" defaultValue={this.state.firstName} onChange={this.handleSchange}  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" rows={3} defaultValue={this.state.description} onChange={this.handleSchange}  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Github </Form.Label>
                    <Form.Control name="gitHubLink" type="text" placeholder="Title" defaultValue={this.state.gitHubLink} onChange={this.handleSchange}  />
                </Form.Group>
              
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Photo de profile</Form.Label>
                    <Form.Control type="file" name="profileImage" onChange={this.onFileChange} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cv</Form.Label>
                    {/* <Form.Control type="file" name="cv"  /> */}
                </Form.Group>

                <Button variant="success" type="submit">
                    Enregistrer
                </Button>
            </Form>
        </div>
    )
}
}
