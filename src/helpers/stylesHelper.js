const addStylesToHTML = () => {
    const head = document.getElementsByTagName('head');
    const spinnerStyles = document.createElement('link');
    spinnerStyles.rel = 'stylesheet';
    spinnerStyles.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    head[0].appendChild(spinnerStyles);
};

export default addStylesToHTML;
