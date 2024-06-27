public class LibraryService {
    @AuraEnabled
    public static void addBook(String Name, String ISBN, String author, String genre, Integer quantity) {
        System.debug('This is the Data Send by the JS file: ' + name + ', ' + ISBN + ', ' + author + ', ' + genre + ', ' + quantity);
        
        // Creating a new Book__c instance and setting fields individually
        Book__c newBook = new Book__c();
        newBook.Name = 'Dummy Book Name';
        newBook.ISBN__c = ISBN;
        newBook.Author__c = author;
        newBook.Genre__c = genre;
        newBook.Quantity__c = quantity;

        // Debugging the new book fields to ensure they are set properly
        System.debug('New Book Details: ' +
            'Name=' + newBook.Name + ', ' +
            'ISBN=' + newBook.ISBN__c + ', ' +
            'Author=' + newBook.Author__c + ', ' +
            'Genre=' + newBook.Genre__c + ', ' +
            'Quantity=' + newBook.Quantity__c);

        // Attempt to insert the record and handle potential errors
        try {
            insert newBook;
            System.debug('New book record inserted successfully: ' + newBook);
        } catch (DmlException e) {
            System.debug('Error inserting new book record: ' + e.getMessage());
            // Optionally, you can rethrow the exception to handle it at a higher level
            throw new AuraHandledException('Failed to insert new book record: ' + e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Book__c> getAllBooks(){
        return [SELECT Id, Name , ISBN__c, Author__c, Genre__c, Quantity__c FROM Book__c];
    }
}