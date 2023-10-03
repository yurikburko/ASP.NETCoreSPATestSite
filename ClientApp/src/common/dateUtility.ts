export const formatAsFull = (date: Date) => {
    date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};

export const formatAsFullWithTime = (date: Date) => {
    if (!date) {
        return "";
    }
    return date.toLocaleDateString(undefined, {
        month:"short",
        day:"numeric",
        year: "numeric", 
        hour: "numeric", 
        minute: "numeric"
    });
};
