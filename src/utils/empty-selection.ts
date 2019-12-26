// credit: https://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
export default function emptySelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if ((document as any).selection) {  // IE?
        (document as any).selection.empty();
    }
}
