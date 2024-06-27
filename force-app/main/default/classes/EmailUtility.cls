public with sharing class EmailUtility {
    public static void sendEmailNotification ( Contact newContact ) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        String[] toAddresses= new String [] {'aakashk2540@gmail.com'};
        mail.setToAddress(toAddress);
        mail.setSubject ( 'New COntact Created with Example Domain');
        mail.setPlainTextBody('A new Contact with the example domain has been creadred'+ newContact.FirstName + ' ' + newContact.LastName);

        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
    }
}