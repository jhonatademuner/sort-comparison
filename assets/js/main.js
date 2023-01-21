// import * as sortingMethods from "sortingMethods.js";

function globalFunction() {



    //# =============================================================================================== #\\
    //# =============================| QUERY SELECTORS AND INITIAL VALUES |============================ #\\
    //# =============================================================================================== #\\



    const root = document.querySelector(':root');
    const arrayContainer = document.querySelectorAll('.arrayContainer');
    const codeContainer = document.querySelectorAll('.codeContainer');
    const scrollArrow = document.querySelector('#scrollArrow img');

    const leftArray = document.querySelector('#leftArray');
    const rightArray = document.querySelector('#rightArray');
    let leftArrayContent = [];
    let rightArrayContent = [];
    
    const themeSwitch = document.querySelector('#themeSwitch');
    const themeButton = document.querySelector('#themeButton');
    const themeButtonIcon = document.querySelector('#themeButton img');

    const lengthChoose = document.querySelector('.lengthChoose');
    const lengthInput = document.querySelector('#lengthInput');
    const createArrayButton = document.querySelector('.createArrayButton');
    let lengthInputPastValue = lengthChoose.value;
    
    const timeMultiplierContainer = document.querySelector('#timeMultiplierContainer div');
    let delayMs = 0;
    
    const leftArrayAlgorithmChoose = document.querySelector('#leftArrayAlgorithmChoose');
    const rightArrayAlgorithmChoose = document.querySelector('#rightArrayAlgorithmChoose');
    
    const sortButton = document.querySelector('#sortButton');
    
    const sortMethods = ['bubble', 'selection', 'insertion', 'merge', 'quick']
    
    let leftArraySelectedAlgorithm = null;
    let rightArraySelectedAlgorithm = null;
    
    const infoAlgorithmChoose = document.querySelector('#infoAlgorithmChoose');
    const infoContentBubble = document.querySelector('#infoContentBubble');
    const infoContentSelection = document.querySelector('#infoContentSelection');
    const infoContentInsertion = document.querySelector('#infoContentInsertion');
    const infoContentMerge = document.querySelector('#infoContentMerge');
    const infoContentQuick = document.querySelector('#infoContentQuick');
    
    const sortInputs = document.querySelectorAll('#sorting-section input');
    const sortButtons = document.querySelectorAll('#sorting-section button');



    //# =============================================================================================== #\\
    //# ====================================| PAGE-LOAD PROCESSES |==================================== #\\
    //# =============================================================================================== #\\



    lengthInput.innerText = `${lengthChoose.value}`
    leftArrayContent = createNewArray();
    rightArrayContent = [...leftArrayContent];



    //# =============================================================================================== #\\
    //# ================================| ARRAY MANIPULATION FUNCTIONS |=============================== #\\
    //# =============================================================================================== #\\



    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createRandomArray(arrayLength) {
        const array = [];
        for (let i = 1; i < arrayLength + 1; i++) {
            array.push(i)
        }
        shuffleArray(array)
        return array;
    }

    function getArrayElementsGap(arrayLength) {
        switch (true) {
            case (arrayLength <= 5):
                return 15;
            case (arrayLength <= 15):
                return 10;
            case (arrayLength <= 30):
                return 8;
            case (arrayLength <= 50):
                return 6;
            case (arrayLength <= 80):
                return 5;
            case (arrayLength <= 100):
                return 4;
            case (arrayLength <= 125):
                return 3;
            case (arrayLength <= 150):
                return 2;
            case (arrayLength > 150):
                return 1;
        }
    }

    function getArrayElementsBorderRadius(arrayLength) {
        switch (true) {
            case (arrayLength <= 5):
                return 15;
            case (arrayLength <= 15):
                return 8;
            case (arrayLength <= 30):
                return 6;
            case (arrayLength <= 80):
                return 5;
            case (arrayLength <= 100):
                return 4;
            case (arrayLength <= 125):
                return 3;
            case (arrayLength <= 150):
                return 2;
            case (arrayLength > 150):
                return 1;
        }
    }

    function createNewArray() {
        const arrayLength = Number(lengthChoose.value);
        const array = createRandomArray(arrayLength);
        leftArray.innerHTML = '';
        rightArray.innerHTML = '';

        const arrayElementWidthDivisor = 600 / arrayLength;
        const arrayElementHeightDivisor = 700 / arrayLength;

        const arrayElementsGap = `${getArrayElementsGap(arrayLength)}px`;

        leftArray.style.gap = arrayElementsGap;
        rightArray.style.gap = arrayElementsGap;

        for (value of array) {
            const element = document.createElement('div');
            element.classList.add('arrayElement');
            element.style.width = `${value * arrayElementWidthDivisor}px`;

            element.style.height = `${arrayElementHeightDivisor}px`;

            element.style.borderRadius = `0 ${getArrayElementsBorderRadius(arrayLength)}px ${getArrayElementsBorderRadius(arrayLength)}px 0`;
            leftArray.appendChild(element.cloneNode(true))

            element.style.borderRadius = `${getArrayElementsBorderRadius(arrayLength)}px 0 0 ${getArrayElementsBorderRadius(arrayLength)}px`;
            rightArray.appendChild(element)
        }
        return array;
    };

    function displayArray(array, arraySide, colors = []) {
        const arrayLength = Number(array.length);

        const arrayElementWidthDivisor = 600 / arrayLength;
        const arrayElementHeightDivisor = 700 / arrayLength;

        const arrayElementsGap = `${getArrayElementsGap(arrayLength)}px`;

        arraySide.style.gap = arrayElementsGap;

        arraySide.innerHTML = '';

        for (let i in array) {
            const element = document.createElement('div');

            element.classList.add('arrayElement');
            element.style.width = `${array[i] * arrayElementWidthDivisor}px`;
            element.style.height = `${arrayElementHeightDivisor}px`;

            const color = colors.find(color => color.index === Number(i));

            if (color) {
                element.classList.add(color.color);
            }

            const borderRadius = getArrayElementsBorderRadius(arrayLength);

            if (arraySide.getAttribute('id') === 'leftArray') {
                element.style.borderRadius = `0 ${borderRadius}px ${borderRadius}px 0`;
            } else {
                element.style.borderRadius = `${borderRadius}px 0 0 ${borderRadius}px`;
            }

            arraySide.appendChild(element);
        }
    }



    //# =============================================================================================== #\\
    //# =====================================| SORTING ALGORITHMS |==================================== #\\
    //# =============================================================================================== #\\



    async function bubbleSort(array, arraySide, delayMs) {
        const arrayLength = array.length;

        for (let i = 0; i < arrayLength; i++) {
            await new Promise(r => setTimeout(r, delayMs));

            for (let j = 0; j < arrayLength - i - 1; j++) {
                displayArray(array, arraySide, [
                    { index: j, color: 'currentElement' },
                    { index: j + 1, color: 'secondaryElement' }
                ]);

                if (array[j] > array[j + 1]) {
                    aux = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = aux;

                    displayArray(array, arraySide, [
                        { index: j, color: 'secondaryElement' },
                        { index: j + 1, color: 'currentElement' }
                    ]);
                }

                await new Promise(r => setTimeout(r, delayMs));
            }
        }

        displayArray(array, arraySide);
    }

    async function selectionSort(array, arraySide, delayMs) {
        const arrayLength = array.length;

        for (let i = 0; i < arrayLength; i++) {
            await new Promise(r => setTimeout(r, delayMs));
            let smaller = i;
            for (let j = i + 1; j < arrayLength; j++) {
                await new Promise(r => setTimeout(r, delayMs));

                displayArray(array, arraySide, [
                    { index: smaller, color: 'secondaryElement' },
                    { index: j, color: 'currentElement' },
                ]);
                if (array[j] < array[smaller]) {
                    smaller = j;
                }
            }
            aux = array[i];
            array[i] = array[smaller];
            array[smaller] = aux;
        }
        displayArray(array, arraySide)
    }

    async function insertionSort(array, arraySide, delayMs) {
        const arrayLength = array.length;

        for (let i = 1; i < arrayLength; i++) {
            await new Promise(r => setTimeout(r, delayMs));
            displayArray(array, arraySide, [
                { index: i, color: 'currentElement' },
            ]);

            let j = i;

            while ((j > -1) && (array[j - 1] > array[j])) {
                const aux = array[j];
                array[j] = array[j - 1];
                array[j - 1] = aux

                j--;

                await new Promise(r => setTimeout(r, delayMs));
                displayArray(array, arraySide, [
                    { index: i, color: 'currentElement' },
                    { index: j, color: 'secondaryElement' },
                ]);
            }
        }

        displayArray(array, arraySide)
    }

    async function mergeSort(array, arraySide, delayMs, start = 0, end = array.length - 1) {
        if (start >= end) {
            return;
        }

        let mid = Math.floor((start + end) / 2);
        await mergeSort(array, arraySide, delayMs, start, mid);
        await mergeSort(array, arraySide, delayMs, mid + 1, end);

        await merge(array, arraySide, start, mid, end, delayMs);

        displayArray(array, arraySide);

        return array;
    }

    async function merge(array, arraySide, start, mid, end, delayMs) {
        let left = start;
        let right = mid + 1;
        let temp = [];

        while (left <= mid && right <= end) {
            await new Promise(r => setTimeout(r, delayMs));
            displayArray(array, arraySide, [
                { index: left, color: 'currentElement' },
                { index: right, color: 'currentElement' },
                { index: mid, color: 'tertiaryElement' },
            ]);
            if (array[left] < array[right]) {
                temp.push(array[left]);
                left++;
            } else {
                temp.push(array[right]);
                right++;
            }
        }

        while (left <= mid) {
            await new Promise(r => setTimeout(r, delayMs));
            displayArray(array, arraySide, [
                { index: left, color: 'currentElement' },
            ]);
            temp.push(array[left]);
            left++;
        }

        while (right <= end) {
            await new Promise(r => setTimeout(r, delayMs));
            displayArray(array, arraySide, [
                { index: right, color: 'currentElement' },
            ]);
            temp.push(array[right]);
            right++;
        }

        for (let i = start; i <= end; i++) {
            await new Promise(r => setTimeout(r, delayMs));
            displayArray(array, arraySide, [
                { index: i, color: 'currentElement' },
                { index: start, color: 'secondaryElement' },
                { index: end, color: 'secondaryElement' },
            ]);
            array[i] = temp[i - start];
        }
    }

    async function quickSort(arr, arraySide, delayMs, start = 0, end = arr.length - 1) {
        // Base case or terminating case or bottom case
        if (start >= end) {
            return;
        }


        // Returns pivotIndex
        const index = await partition(arr, start, end, arraySide, delayMs);

        // Recursively apply the same logic to the left and right subarrays
        await quickSort(arr, arraySide, delayMs, start, index - 1);
        await quickSort(arr, arraySide, delayMs, index + 1, end);

        displayArray(arr, arraySide);
    }

    async function partition(arr, start, end, arraySide, delayMs) {
        // Taking the last element as the pivot
        const pivotValue = arr[end];
        let pivotIndex = start;

        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                // Swapping elements
                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                // Moving to next element
                pivotIndex++;
            }

            await new Promise(r => setTimeout(r, delayMs));
            displayArray(arr, arraySide, [
                { index: pivotIndex, color: 'tertiaryElement' },
                { index: i, color: 'currentElement' },
                { index: start, color: 'secondaryElement' },
                { index: end, color: 'secondaryElement' },
            ]);
        }

        // Putting the pivot value in the middle
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]

        await new Promise(r => setTimeout(r, delayMs));
        displayArray(arr, arraySide, [
            { index: pivotIndex, color: 'tertiaryElement' },
            { index: start, color: 'secondaryElement' },
            { index: end, color: 'secondaryElement' },
        ]);

        return pivotIndex;
    }


    //# =============================================================================================== #\\
    //# ======================================| EVENT LISTENERS |====================================== #\\
    //# =============================================================================================== #\\



    themeSwitch.addEventListener('click', function () {
        if (themeButton.classList.contains('darkTheme')) {
            themeButton.classList.remove('darkTheme');
            themeButton.classList.add('lightTheme');
            root.style.setProperty('--bg-color', '#D8E0E9');
            root.style.setProperty('--primary-color', '#e6ebf0');
            root.style.setProperty('--secondary-color', '#ebeff2');
            root.style.setProperty('--text-color', '#242424');
            root.style.setProperty('--text-color-2', '#000');
            root.style.setProperty('--button-color', '#3d8cdb');
            root.style.setProperty('--element-color-1', '#1A31B1');
            root.style.setProperty('--element-color-2', '#6644B7');
            root.style.setProperty('--element-color-3', '#422189');
            root.style.setProperty('--shadow-color', '#adadad');
            arrayContainer.forEach(i => i.style.border = '2px solid var(--bg-color)');
            codeContainer.forEach(i => i.style.border = '2px solid var(--bg-color)');
            scrollArrow.style.filter = "invert(90%) sepia(6%) saturate(181%) hue-rotate(187deg) brightness(108%) contrast(92%)";
            themeButton.style = "transform: translateX(30px);";
            themeButton.style = "-webkit-transform: translateX(30px);";
            themeButtonIcon.setAttribute('src', 'assets/img/outlined-sun-icon.svg');
            sortButton.style = "color: var(--bg-color);";
        } else if (themeButton.classList.contains('lightTheme')) {
            themeButton.classList.remove('lightTheme');
            themeButton.classList.add('darkTheme');
            root.style.setProperty('--bg-color', '#1a1f25');
            root.style.setProperty('--primary-color', '#21262D');
            root.style.setProperty('--secondary-color', '#2b323a');
            root.style.setProperty('--text-color', '#A5A8BD');
            root.style.setProperty('--text-color-2', '#394962');
            root.style.setProperty('--button-color', '#39A6FF');
            root.style.setProperty('--element-color-1', '#3957ff');
            root.style.setProperty('--element-color-2', '#9971f7');
            root.style.setProperty('--element-color-3', '#6b1bcc');
            root.style.setProperty('--shadow-color', '#07090d');
            arrayContainer.forEach(i => i.style.border = 'none');
            codeContainer.forEach(i => i.style.border = 'none');
            scrollArrow.style.filter = "invert(14%) sepia(32%) saturate(392%) hue-rotate(172deg) brightness(90%) contrast(85%)";
            themeButton.style = "transform: translateX(0px);";
            themeButton.style = "-webkit-transform: translateX(0px);";
            themeButtonIcon.setAttribute('src', 'assets/img/outlined-moon-icon.svg');
            sortButton.style = "color: var(--bg-color);";
        }
    })

    lengthChoose.addEventListener('input', function () {
        lengthInput.value = `${lengthChoose.value}`;
        leftArrayContent = createNewArray();
        rightArrayContent = [...leftArrayContent];
    })

    lengthInput.addEventListener('focusout', function () {
        if (lengthInput.value === '') {
            console.log('empty')
            lengthChoose.value = Number(lengthInputPastValue);
            lengthInput.value = `${lengthInputPastValue}`;
        } else if (Number(lengthInput.value) > 200) {
            console.log('too big')
            lengthChoose.value = 200;
            lengthInput.value = '200';
        } else if (Number(lengthInput.value) < 2) {
            console.log('too small')
            lengthChoose.value = 2;
            lengthInput.value = '2';
        } else {
            console.log('normal focusout')
            lengthChoose.value = Number(lengthInput.value);
            leftArrayContent = createNewArray();
            rightArrayContent = leftArrayContent;
        }
        leftArrayContent = createNewArray();
        rightArrayContent = leftArrayContent;
        lengthInput.blur();
    })

    lengthInput.addEventListener('focus', function () {
        lengthInputPastValue = lengthInput.value;
        lengthInput.setAttribute('value', '');
    })

    lengthInput.addEventListener('keypress', function (e) {
        if (e.keyCode == '13') {
            if (lengthInput.value === '') {
                console.log('empty')
                lengthChoose.value = Number(lengthInputPastValue);
                lengthInput.value = `${lengthInputPastValue}`;
            } else if (Number(lengthInput.value) > 200) {
                console.log('too big')
                lengthChoose.value = 200;
                lengthInput.value = '200';
            } else if (Number(lengthInput.value) < 2) {
                console.log('too small')
                lengthChoose.value = 2;
                lengthInput.value = '2';
            } else {
                console.log('normal')
                lengthChoose.setAttribute('value', `${lengthInput.value}`);
            }
            leftArrayContent = createNewArray();
            rightArrayContent = leftArrayContent;
            lengthInput.blur();
        }
    })

    createArrayButton.addEventListener('click', function () {
        leftArrayContent = createNewArray();
        rightArrayContent = [...leftArrayContent];
    })


    leftArrayAlgorithmChoose.addEventListener('click', function (e) {

        const clickedElement = e.target;

        const buttonsList = leftArrayAlgorithmChoose.children

        let i = 0
        for (child of buttonsList) {
            if (child.classList.contains('selectedAlgorithm'))
                child.classList.remove('selectedAlgorithm')
            if (child == clickedElement)
                leftArraySelectedAlgorithm = sortMethods[i];

            i++
        }

        clickedElement.classList.add('selectedAlgorithm')
    });

    rightArrayAlgorithmChoose.addEventListener('click', function (e) {

        const clickedElement = e.target;

        const buttonsList = rightArrayAlgorithmChoose.children

        let i = 0;
        for (child of buttonsList) {
            if (child.classList.contains('selectedAlgorithm'))
                child.classList.remove('selectedAlgorithm')
            if (child == clickedElement)
                rightArraySelectedAlgorithm = sortMethods[i];

            i++
        }

        clickedElement.classList.add('selectedAlgorithm')
    });

    timeMultiplierContainer.addEventListener('click', function (e) {

        const clickedElement = e.target;

        const buttonsList = timeMultiplierContainer.children;

        for (child of buttonsList) {
            if (child.classList.contains('selectedTime'))
                child.classList.remove('selectedTime')
            if (child == clickedElement)
                child.classList.add('selectedTime');
        }
        if (clickedElement.getAttribute('id') === 'timeMultiplier25') {
            delayMs = 750;
        } else if (clickedElement.getAttribute('id') === 'timeMultiplier50') {
            delayMs = 250;
        } else if (clickedElement.getAttribute('id') === 'timeMultiplier75') {
            delayMs = 125;
        } else if (clickedElement.getAttribute('id') === 'timeMultiplier1') {
            delayMs = 0;
        }

        clickedElement.classList.add('selectedAlgorithm')
    });

    function isRunning(status) {
        if (status) {
            for (child of sortInputs) {
                child.setAttribute('disabled', '');
            }
            for (child of sortButtons) {
                child.setAttribute('disabled', '');
            }
        } else {
            for (child of sortInputs) {
                child.removeAttribute('disabled', '');
            }
            for (child of sortButtons) {
                child.removeAttribute('disabled', '');
            }
        }
    }

    sortButton.addEventListener('click', async function () {

        if (leftArraySelectedAlgorithm === null || rightArraySelectedAlgorithm === null) {
            alert('ERRO. ALGORITMOS NÂO SELECIONADOS.')
        }
        else {
            isRunning(true);
            switch (leftArraySelectedAlgorithm) {
                case 'bubble':
                    bubbleSort(leftArrayContent, leftArray, delayMs);
                    break;
                case 'selection':
                    selectionSort(leftArrayContent, leftArray, delayMs);
                    break;
                case 'insertion':
                    insertionSort(leftArrayContent, leftArray, delayMs);
                    break;
                case 'merge':
                    mergeSort(leftArrayContent, leftArray, delayMs);
                    break;
                case 'quick':
                    quickSort(leftArrayContent, leftArray, delayMs);
                    break;
                default:
                    break;
            }

            switch (rightArraySelectedAlgorithm) {
                case 'bubble':
                    await bubbleSort(rightArrayContent, rightArray, delayMs);
                    break;
                case 'selection':
                    await selectionSort(rightArrayContent, rightArray, delayMs);
                    break;
                case 'insertion':
                    await insertionSort(rightArrayContent, rightArray, delayMs);
                    break;
                case 'merge':
                    await mergeSort(rightArrayContent, rightArray, delayMs);
                    break;
                case 'quick':
                    await quickSort(rightArrayContent, rightArray, delayMs);
                    break;
                default:
                    break;
            }
            isRunning(false);
        }
    })

    function changeSelectedInfoButton(element) {
        for (i of infoAlgorithmChoose.children) {
            if (i.classList.contains('selectedInfo')) {
                i.classList.remove('selectedInfo');
            } else if (i === element) {
                i.classList.add('selectedInfo');
            }

        }
    }

    infoAlgorithmChoose.addEventListener('click', function (e) {

        const clickedElement = e.target;
        if (clickedElement.getAttribute('id') === 'infoBubble') {
            changeSelectedInfoButton(clickedElement);
            infoContentBubble.style = "display: flex;";
            infoContentSelection.style = "display: none;";
            infoContentInsertion.style = "display: none;";
            infoContentMerge.style = "display: none;";
            infoContentQuick.style = "display: none;";
        }
        else if (clickedElement.getAttribute('id') === 'infoSelection') {
            changeSelectedInfoButton(clickedElement);
            infoContentBubble.style = "display: none;";
            infoContentSelection.style = "display: flex;";
            infoContentInsertion.style = "display: none;";
            infoContentMerge.style = 'display: none;';
            infoContentQuick.style = 'display: none;';
        }
        else if (clickedElement.getAttribute('id') === 'infoInsertion') {
            changeSelectedInfoButton(clickedElement);
            infoContentBubble.style = "display:none;";
            infoContentSelection.style = "display: none;";
            infoContentInsertion.style = "display: flex;";
            infoContentMerge.style = "display: none;";
            infoContentQuick.style = "display: none;";
        }
        else if (clickedElement.getAttribute('id') === 'infoMerge') {
            changeSelectedInfoButton(clickedElement);
            infoContentBubble.style = "display: none;";
            infoContentSelection.style = "display: none;";
            infoContentInsertion.style = "display: none;";
            infoContentMerge.style = "display: flex;";
            infoContentQuick.style = "display: none;";
        }
        else if (clickedElement.getAttribute('id') === 'infoQuick') {
            changeSelectedInfoButton(clickedElement);
            infoContentBubble.style = "display: none;";
            infoContentSelection.style = "display: none;";
            infoContentInsertion.style = "display: none;";
            infoContentMerge.style = "display: none;";
            infoContentQuick.style = "display: flex;";
        }
    })

}
globalFunction();