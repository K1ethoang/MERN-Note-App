export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("vi-VI", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}