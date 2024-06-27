public with sharing class ContactTriggerHandler {
    public static void beforeInsert(List<Contact> newContacts) {
        for (Contact con : newContacts) {
            // Example logic to update the Description field
            con.Description = 'New Contact Created';
            
            // // Additional logic to check the email domain
            // if (con.Email != null && con.Email.endsWith('@example.com')) {
            //     con.Custom_Field__c = 'Example Domain'; // Replace Custom_Field__c with an actual custom field
            // }
        }
    }

    public static void afterInsert(List<Contact> newContacts) {
        for (Contact con : newContacts) {
            if (con.Email != null && con.Email.endsWith('@gmail.com')) {
                EmailUtility.sendNotificationEmail(con);
            }
        }
    }
}
