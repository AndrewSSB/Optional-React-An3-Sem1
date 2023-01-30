const CURRENCY_TYPE = new Intl.NumberFormat(undefined, {
    currency: "RON", style: "currency"
})

export function formatCurrency(number: number) {
    return CURRENCY_TYPE.format(number)
}