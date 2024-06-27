import { LightningElement, wire, track } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";
import createContact from "@salesforce/apex/ContactController.createContact";
import searchContacts from "@salesforce/apex/ContactController.searchContacts";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'First Name', type: 'text', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', type: 'text', fieldName: 'LastName', editable: true },
    { label: 'Email', type: 'text', fieldName: 'Email', editable: true },
];


export default class ContactManager extends LightningElement {
    @track isModalOpen = false;
    @track searchKey = '';
    @track error = '';
    @track page = 1;
    @track pageSize = 10;
    @track contacts;
    @track totalRecords = '';
    @track isFirstpage = true;
    @track isLastPage = false;
    @track selectedContactId;

    firstName = '';
    lastName = '';
    email = '';
    columns = COLUMNS;

    connectedCallback() {
        this.loadContacts();
    }


    loadContacts() {
        getContacts({ pageSize: this.pageSize, pageNumber: this.page })
            .then(result => {
                this.contacts = result.contacts;
                this.totalRecords = result.totalRecords;
                this.isFirstPage = this.page === 1;
                this.isLastPage = this.page * this.pageSize >= this.totalRecords;
                this.error = undefined;


            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });
    }

    handleSearchKeyChange(event) {
        this.searchKey = event.target.value;
        this.searchContacts();
    }

    searchContacts() {

        if (this.searchKey) {
            searchContacts({ searchKey: this.searchKey })
                .then(result => {
                    this.contacts = result;
                    this.error = undefined;
                })
                .catch(error => {
                    this.error = error;
                    this.contacts = undefined;
                    this.showToast('error', error.body.message, 'error');
                })
        }
        else {
            this.loadContacts();
        }
    }

    handleNewContact() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleSave() {
        createContact({ firstName: this.firstName, lastName: this.lastName, email: this.email })
            .then(() => {
                this.loadContacts();
                this.showToast('Success', 'Contact created successfully', 'success');
                this.handleCloseModal();
            })
            .catch(error => {
                this.showToast('Error while creating the contact', error.body.message, 'error')
                this.handleCloseModal();
            })
    }

    showToast(title, message, variant) {
        const showToast = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        })
        this.dispatchEvent(showToast)
    }

    handlePrevious() {
        this.page -= 1;
        this.loadContacts();
    }
    handleNext() {
        this.page += 1;
        this.loadContacts();
    }

    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        if (selectedRows.length === 1) {
            this.selectedContactId= selectedRows[0].Id;

        } else {
            this.selectedContactId= null;
        }
    }
}