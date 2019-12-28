const mobileMax = 767;

export function mobile(strings: TemplateStringsArray, ...values: any[]): string {
    return `@media(max-width: ${mobileMax}px) {
        ${String.raw(strings, ...values)}
    }`
}

export function notMobile(strings: TemplateStringsArray, ...values: any[]): string {
    return `@media(min-width: ${mobileMax + 1}px) {
        ${String.raw(strings, ...values)}
    }`
}
