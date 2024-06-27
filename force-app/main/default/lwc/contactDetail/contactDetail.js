import { LightningElement, api, wire } from "lwc";
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Contact.FirstName',
    'Contact.LastName',
    'Contact.Email',
];


export default class ContactManager extends LightningElement {
    @api contactId;
    contact;

    @wire(getRecord, { recordId: '$contactId', fields: FIELDS })
    wiredContact({ error, data }) {
        if ( data){
            this.contact=data;
            this.error=undefined;

        }
        else if (error) {
            this.contact=undefined;
            this.error=error;
        }
    }
    handleSuccess(event){
        console.log('Record updated Successfully',event.detail.id);
    }
}