export function dateValidator({ startDate, endDate }: { startDate: string, endDate: string }) {
    if (startDate > endDate) {
        return {errors: "Data inicial não pode ser maior que a data final!" };
    } else {
        return {};
    }
}