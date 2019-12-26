/**
 * @param hex the css hex color, e.g. #FFF, #abcdef, ff0000
 * @param alpha 0-255
 * @return the css rgba string
 */
const RE = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;

export default function hexRGBA(hex: string, alpha = 255) {
    if (alpha < 0 || alpha > 255) {
        throw new Error(`Expected alpha to be between 0 and 255, got: ${alpha}`);
    }
    const matches = hex.match(RE);
    if (!matches) {
        throw new Error(`Invalid hex string: ${hex}`);
    }
    let match = matches[1];
    if (match.length === 3) {
        match = match.replace(/\w/g, (c: string) => c + c);
    }
    const rgba = [0, 2, 4].map((start) => 
        parseInt(match.slice(start, start + 2), 16)
    ).concat(alpha);
    return `rgba(${rgba.join(',')})`;
}
