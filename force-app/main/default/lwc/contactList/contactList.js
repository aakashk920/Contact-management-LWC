import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createContact from '@salesforce/apex/ContactController.createContact';
const COLUMNS = [
    { label:'First Name', fieldName: 'FirstName' },
    { label:'Last Name', fieldName: 'LastName' },
    { label:'Email', fieldName: 'Email' },
];

export default class ContactList extends LightningElement {
    @track isModalOpen= false;
    @track contacts;
    @track error;

    firstName='';
    lastName='';
    email='';
    columns=COLUMNS;


    @wire(getContacts)
    wiredContacts({data, error}){
        if (data){
            this.contacts=data;
            this.error=undefined;
            this.showToast('Success','Contact is retrived without any pain',' success');
        }
        else if ( error){
            this.contacts=undefined;
            this.error=error;
            console.log('This is the error', error);
            this.showToast('error','Contact is not retrived',' error');

        }
    }

    handleNewContact(){
        this.isModalOpen=true;
    }
    handleCloseModal(){
        this.isModalOpen=false;
    }
    handleFirstNameChange(event){
        this.firstName=event.target.value;
    }
    handleLastNameChange(event){
        this.lastName=event.target.value;
    }
    handleEmailChange(event){
        this.email=event.target.value;
    }


    handleSave(){
        createContact( {firstName: this.firstName, lastName:this.lastName, email:this.email})
        .then(()=>{
            this.showToast('Success','Contact Created Perfectly without any pain','success');
        })
        .catch(error=>{
            this.showToast('Error', error.body.message,'error');
        });
        this.handleCloseModal();
    }

    showToast(title, message, variant){
        const showToast= new ShowToastEvent({
            title:title,
            message:message,
            variant:variant,
        })
        this.dispatchEvent(showToast);
    }
}