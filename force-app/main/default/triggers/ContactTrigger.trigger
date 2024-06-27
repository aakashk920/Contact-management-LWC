trigger ContactTrigger on Contact (before insert, after insert) {
    if (Trigger.isBefore && Trigger.isInsert) {
        ContactTriggerHandler.beforeInsert(Trigger.new);
    }
    if (Trigger.isAfter && Trigger.isInsert) {
        ContactTriggerHandler.afterInsert(Trigger.new);
    }
}
