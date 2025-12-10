(async function () {
    'use strict';

    const COLORS = {
        green: 'rgb(0, 128, 0)',
        blue: 'rgb(0, 0, 255)',
        purple: 'rgb(128, 0, 128)',
        orange: 'orange',
        red: 'rgb(255, 0, 0)'
    };

    const url = new URL(window.location.href);
    const submodParam = url.searchParams.get('submod');
    
    if (submodParam !== 'forge') {
      return;
    }

    console.log('Welcome to the calculator!');

    const requirementsBox = document.querySelector('.crafting_requirements');

    const resourceBoxes = requirementsBox.querySelectorAll('li');

    // Function to create a calculator div for a specific color
    function createColorCalculator(calcDiv, colorName) {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'calc-div';
        calcDiv.appendChild(colorDiv);
        
        const minusBtn = document.createElement('button');
        minusBtn.className = 'minus-calc-btn';
        minusBtn.textContent = '-';
        colorDiv.appendChild(minusBtn);
        
        const qty = document.createElement('div');
        qty.className = 'res-calc-qty';
        qty.textContent = '0';
        colorDiv.appendChild(qty);
        
        const plusBtn = document.createElement('button');
        plusBtn.className = 'plus-calc-btn';
        plusBtn.textContent = '+';
        colorDiv.appendChild(plusBtn);

        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(qty.textContent) || 0;
            qty.textContent = (currentValue + 1).toString();
        });

        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(qty.textContent) || 0;
            if (currentValue > 0) {
                qty.textContent = (currentValue - 1).toString();
            }
        });
    }

    resourceBoxes.forEach(box => {
        const calcDiv = document.createElement('div');
        box.appendChild(calcDiv);

        // Create calculator for each color
        Object.keys(COLORS).forEach(colorName => {
            createColorCalculator(calcDiv, colorName);
        });
    });

    let total = 0;
    let current = 0;

    const setPoints = requirementsBox.querySelectorAll('.forge_setpoint');
    setPoints.forEach(point => {
        total += parseInt(point.textContent);
    });

    const actualValues = requirementsBox.querySelectorAll('.forge_actual_value');
    actualValues.forEach(value => {
        current += parseInt(value.textContent);
    });

    const progress = (current / total) * 100;
    console.log('progress', progress);

    const qualitiesBox = document.querySelector('#forge_qualities');
    const qualityRows = qualitiesBox.querySelectorAll('li');
    
    const colorPercentages = {};
    Object.keys(COLORS).forEach(colorName => {
        colorPercentages[colorName] = 0;
    });

    qualityRows.forEach(row => {
        console.log('quality row', row.style.color, row.textContent);

        const colorStyle = row.style.color;
        const content = row.textContent;
        const percentage = parseInt(content.replace(/[^0-9]/g, ''));

        // Find which color matches this style
        Object.entries(COLORS).forEach(([colorName, colorValue]) => {
            if (colorStyle === colorValue) {
                colorPercentages[colorName] = percentage;
            }
        });
    });

    Object.entries(colorPercentages).forEach(([colorName, percentage]) => {
        console.log(`${colorName}Percent`, percentage);
    });

    const baseQuantities = {};
    Object.entries(colorPercentages).forEach(([colorName, percentage]) => {
        baseQuantities[colorName] = Math.round(percentage * current / 100);
    });

    console.log('total', total);
    console.log('current', current);
    Object.entries(baseQuantities).forEach(([colorName, quantity]) => {
        console.log(`base${colorName.charAt(0).toUpperCase() + colorName.slice(1)}Quantity`, quantity);
    });

    const calculationSimulationDiv = document.createElement('div');
    calculationSimulationDiv.className = 'calculation-simulation';
    qualitiesBox.appendChild(calculationSimulationDiv);

    Object.entries(baseQuantities).forEach(([colorName, quantity]) => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-div';
        calculationSimulationDiv.appendChild(colorDiv);
        
        const colorNameSpan = document.createElement('span');
        colorNameSpan.className = 'color-name';
        colorNameSpan.textContent = colorName.charAt(0).toUpperCase() + colorName.slice(1);
        colorDiv.appendChild(colorNameSpan);

        const percentageSpan = document.createElement('span');
        percentageSpan.id = `sim-percentage-${colorName.toLowerCase()}`;
        percentageSpan.textContent = `(${colorPercentages[colorName]}%)`;
        colorDiv.appendChild(percentageSpan);
    });
})();