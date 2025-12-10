(async function () {
    'use strict';

    const GREEN_COLOR = 'rgb(0, 128, 0)'
    const BLUE_COLOR = 'rgb(0, 0, 255)'
    const PURPLE_COLOR = 'rgb(128, 0, 128)'
    const ORANGE_COLOR = 'orange'
    const RED_COLOR = 'rgb(255, 0, 0)'

    const url = new URL(window.location.href);
    const submodParam = url.searchParams.get('submod');
    
    if (submodParam !== 'forge') {
      return;
    }

    console.log('Welcome to the calculator!');

    const requirementsBox = document.querySelector('.crafting_requirements');

    const resourceBoxes = requirementsBox.querySelectorAll('li');

    resourceBoxes.forEach(box => {
        const calcDiv = document.createElement('div');
        box.appendChild(calcDiv);

        // Green
        const greenDiv = document.createElement('div');
        greenDiv.className = 'calc-div';
        calcDiv.appendChild(greenDiv);
        
        const greenMinusBtn = document.createElement('div');
        greenMinusBtn.className = 'minus-calc-btn';
        greenMinusBtn.textContent = '-';
        greenDiv.appendChild(greenMinusBtn);
        
        const greenQty = document.createElement('div');
        greenQty.className = 'res-calc-qty';
        greenQty.textContent = '0';
        greenDiv.appendChild(greenQty);
        
        const greenPlusBtn = document.createElement('div');
        greenPlusBtn.className = 'plus-calc-btn';
        greenPlusBtn.textContent = '+';
        greenDiv.appendChild(greenPlusBtn);

        // Blue
        const blueDiv = document.createElement('div');
        blueDiv.className = 'calc-div';
        calcDiv.appendChild(blueDiv);
        
        const blueMinusBtn = document.createElement('div');
        blueMinusBtn.className = 'minus-calc-btn';
        blueMinusBtn.textContent = '-';
        blueDiv.appendChild(blueMinusBtn);
        
        const blueQty = document.createElement('div');
        blueQty.className = 'res-calc-qty';
        blueQty.textContent = '0';
        blueDiv.appendChild(blueQty);
        
        const bluePlusBtn = document.createElement('div');
        bluePlusBtn.className = 'plus-calc-btn';
        bluePlusBtn.textContent = '+';
        blueDiv.appendChild(bluePlusBtn);
        
        // Purple
        const purpleDiv = document.createElement('div');
        purpleDiv.className = 'calc-div';
        calcDiv.appendChild(purpleDiv);
        
        const purpleMinusBtn = document.createElement('div');
        purpleMinusBtn.className = 'minus-calc-btn';
        purpleMinusBtn.textContent = '-';
        purpleDiv.appendChild(purpleMinusBtn);
        
        const purpleQty = document.createElement('div');
        purpleQty.className = 'res-calc-qty';
        purpleQty.textContent = '0';
        purpleDiv.appendChild(purpleQty);
        
        const purplePlusBtn = document.createElement('div');
        purplePlusBtn.className = 'plus-calc-btn';
        purplePlusBtn.textContent = '+';
        purpleDiv.appendChild(purplePlusBtn);

        // Orange
        const orangeDiv = document.createElement('div');
        orangeDiv.className = 'calc-div';
        calcDiv.appendChild(orangeDiv);
        
        const orangeMinusBtn = document.createElement('div');
        orangeMinusBtn.className = 'minus-calc-btn';
        orangeMinusBtn.textContent = '-';
        orangeDiv.appendChild(orangeMinusBtn);
        
        const orangeQty = document.createElement('div');
        orangeQty.className = 'res-calc-qty';
        orangeQty.textContent = '0';
        orangeDiv.appendChild(orangeQty);
        
        const orangePlusBtn = document.createElement('div');
        orangePlusBtn.className = 'plus-calc-btn';
        orangePlusBtn.textContent = '+';
        orangeDiv.appendChild(orangePlusBtn);
        
        // Red
        const redDiv = document.createElement('div');
        redDiv.className = 'calc-div';
        calcDiv.appendChild(redDiv);
        
        const redMinusBtn = document.createElement('div');
        redMinusBtn.className = 'minus-calc-btn';
        redMinusBtn.textContent = '-';
        redDiv.appendChild(redMinusBtn);
        
        const redQty = document.createElement('div');
        redQty.className = 'res-calc-qty';
        redQty.textContent = '0';
        redDiv.appendChild(redQty);
        
        const redPlusBtn = document.createElement('div');
        redPlusBtn.className = 'plus-calc-btn';
        redPlusBtn.textContent = '+';
        redDiv.appendChild(redPlusBtn);
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
    
    let greenPercent = 0;    
    let bluePercent = 0;
    let purplePercent = 0;
    let orangePercent = 0;
    let redPercent = 0;

    qualityRows.forEach(row => {
        console.log('quality row', row.style.color, row.textContent);

        const colorStyle = row.style.color;
        const content = row.textContent;
        const percentage = parseInt(content.replace(/[^0-9]/g, ''));

        if (colorStyle === GREEN_COLOR) {
            greenPercent = percentage;
        } else if (colorStyle === BLUE_COLOR) {
            bluePercent = percentage;
        } else if (colorStyle === PURPLE_COLOR) {
            purplePercent = percentage;
        } else if (colorStyle === ORANGE_COLOR) {
            orangePercent = percentage;
        } else if (colorStyle === RED_COLOR) {
            redPercent = percentage;
        }
    });

    console.log('greenPercent', greenPercent);
    console.log('bluePercent', bluePercent);
    console.log('purplePercent', purplePercent);
    console.log('orangePercent', orangePercent);
    console.log('redPercent', redPercent);

    const baseGreenQuantity = Math.round(greenPercent * current / 100);
    const baseBlueQuantity = Math.round(bluePercent * current / 100);
    const basePurpleQuantity = Math.round(purplePercent * current / 100);
    const baseOrangeQuantity = Math.round(orangePercent * current / 100);
    const baseRedQuantity = Math.round(redPercent * current / 100);

    console.log('total', total);
    console.log('current', current);
    console.log('baseGreenQuantity', baseGreenQuantity);
    console.log('baseBlueQuantity', baseBlueQuantity);
    console.log('basePurpleQuantity', basePurpleQuantity);
    console.log('baseOrangeQuantity', baseOrangeQuantity);
    console.log('baseRedQuantity', baseRedQuantity);
})();