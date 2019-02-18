let input = null;

export default function getInputSize(value) {
    if (!input) {
        input = document.createElement('div');
        input.className = 'input';
        input.style.display = 'inline-block';
        input.style.visibility = 'hidden';
        input.style.position = 'relative';
        input.style.top = '0';
        input.style.left = '100%';

        document.body.appendChild(input);
    }

    input.innerText = value;

    return input.getBoundingClientRect();
}
