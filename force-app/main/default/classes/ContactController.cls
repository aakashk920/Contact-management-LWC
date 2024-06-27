public with sharing class ContactController {
    @AuraEnabled (cacheable = true)
    public static Map<String, Object> getContacts(Integer pageSize, Integer pageNumber) {
        Integer offset = (pageNumber - 1) * pageSize;
        List<Contact> contacts = [
            SELECT Id, FirstName, LastName, Email
            FROM Contact
            LIMIT :pageSize OFFSET :offset
        ];
        Integer totalRecords = [SELECT COUNT() FROM Contact];
        return new Map<String, Object>{
            'contacts' => contacts,
            'totalRecords' => totalRecords
        };
    }

    @AuraEnabled
    public static void createContact(String firstName, String lastName, String email) {
        Contact contact = new Contact(
            FirstName = firstName,
            LastName = lastName,
            Email = email
        );
        insert contact;
    }

    @AuraEnabled
    public static void updateContact(Map<Id, Contact> data) {
        List<Contact> contacts = new List<Contact>();
        for (Contact c : data.values()) {
            contacts.add(c);
        }
        update contacts;
    }

    @AuraEnabled
    public static void deleteContact(Id contactId) {
        Contact contact = [SELECT Id FROM Contact WHERE Id = :contactId];
        delete contact;
    }

    @AuraEnabled (cacheable = true)
    public static List<Contact> searchContacts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [SELECT Id, FirstName, LastName, Email FROM Contact WHERE FirstName LIKE :key OR LastName LIKE :key OR Email LIKE :key];
    }
}
