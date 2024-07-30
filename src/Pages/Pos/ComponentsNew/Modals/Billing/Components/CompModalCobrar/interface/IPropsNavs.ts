export interface IPropNav {
    activeTabItem: string
    totalCart: number
    setactiveTab: (value: string) => void
    inputValues: Array<number | string>
    setInputValues: (value: Array<number | string>) => void
    inputRefs: any
    setInputEfectivo: (value: number) => void
    inputEfectivo: number | string
    inputRefCheque: any
    inputRefTarjeta: any
    inputRefDeposito: any
    handleInputChange: any
    handleInputClick: any
    handleInputFocus: any
    handleKeydown: any
    setInputChequeTab: (value: number) => void
    setInputTarjeta: (value: number) => void
    setInputDeposito: (value: number) => void
    inputDeposito: number
    inputCheque: number
    inputTarjeta: number
    formaPago: string
    setFormaPago: any
    testVuelto: any
    setPropina: any

}
export interface ObjectNavItem {
    value: string
    label: string
    inputName?: string
    valueInput?: any
    onChangeinput?: (e: React.ChangeEvent<HTMLInputElement>) => void
    function?: any
    clear?: () => void
    readonly?: boolean
    icon?: any
    ref?: any
    disabled?: boolean
    inputValues?: Array<number | string>
}