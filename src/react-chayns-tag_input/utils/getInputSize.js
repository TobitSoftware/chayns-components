let input = null;

export default function getInputSize(value) {
    if (!input) {
        input = document.createElement('div');
        input.className = 'input';
        input.style.visibility = 'hidden';
        input.style.position = 'absolute';
        input.style.top = '-999px';
        input.style.left = '-999px';

        document.body.appendChild(input);
    }

    input.innerText = value;

    return input.getBoundingClientRect();
}
