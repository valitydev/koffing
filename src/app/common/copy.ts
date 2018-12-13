export function copy(inputElement: HTMLInputElement) {
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
        const editable = inputElement.contentEditable;
        const readOnly = inputElement.readOnly;
        (inputElement as any).contentEditable = true;
        inputElement.readOnly = false;
        const range = document.createRange();
        range.selectNodeContents(inputElement);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        inputElement.setSelectionRange(0, 999999);
        inputElement.contentEditable = editable;
        inputElement.readOnly = readOnly;
    } else {
        inputElement.select();
    }
    document.execCommand('copy');
}
