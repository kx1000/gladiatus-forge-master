(async function async () {
    'use strict';

    const browserUrl = new URL(window.location.href);
    const submodParam = browserUrl.searchParams.get('submod');
    
    if (submodParam !== 'storage') {
      return;
    }

    const apiUrl = 'https://gladiatus-compare.kx1000.cyou';
    // const apiUrl = 'http://127.0.0.1:8000';


    const url = `${apiUrl}/prices`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    const pricing = await response.json();
    console.log(pricing);

    const format = value =>
        Number(value).toLocaleString('de-DE');
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const goldIcon = `<img alt="" src="//gf3.geo.gfsrv.net/cdn6b/71e68d38f81ee6f96a618f33c672e0.gif" align="absmiddle" border="0">`;

    const resourcesTable = document.querySelector('#resource-list');

    const estimationRow = document.createElement('thead');
    estimationRow.innerHTML = `<tr><td colspan="12" style="text-align: center;">Total market estimation (server x1): <span id="total-estimation-value">0</span> ${goldIcon}</td></tr>`;

    resourcesTable.appendChild(estimationRow);

    // todo: recalculate on click #store and #linkupgrade

    const calculateEstimations = (pricing) => {
        const rows = document.querySelectorAll('tr[data-type]');
        let totalEstimation = 0;
        rows.forEach(row => {
            const resourceId = row.dataset.type;

            const cells = row.querySelectorAll('td[data-quality]');

            cells.forEach(cell => {
                const quality = cell.dataset.quality;
                const quantity = cell.innerHTML;
                
                console.log(resourceId, quality, quantity);

                if (!pricing[resourceId]?.[quality]) {
                return;
                }

                const price = pricing[resourceId]?.[quality];

                if (quantity !== '-') {
                    totalEstimation += quantity * price;
                }

                const headerSection = `<div><strong>Market estimation</strong> (server x1)</div>`
                const onePieceSection = `<div style="text-align: center;">1 ~ ${format(price)} ${goldIcon}</div>`;
                const quantitySection = quantity !== '-' ? `<div style="text-align: center;"><strong>${quantity} ~ ${format(quantity * price)}</strong> ${goldIcon}</div>` : '';

                tippy(cell, {
                    content: `${headerSection} ${onePieceSection} ${quantitySection}`,
                    interactive: true,
                    allowHTML: true,
                });
            })
        });

        console.log('totalEstimation', totalEstimation);
        document.getElementById('total-estimation-value').textContent = format(totalEstimation);
    }

    calculateEstimations(pricing);

    const storeButton = document.getElementById('store');
    storeButton.addEventListener('click', async () => {
        await delay(700);
        calculateEstimations(pricing);
    });

    const linkUpgradeButton = document.getElementById('linkupgrade');
    linkUpgradeButton.addEventListener('click', async () => {
        await delay(700);
        calculateEstimations(pricing);
    });

    const removeDeliverButton = document.getElementById('remove-deliver');
    removeDeliverButton.addEventListener('click', async () => {
        await delay(700);
        calculateEstimations(pricing);
    });

    const changeDeliverButton = document.getElementById('change-deliver');
    changeDeliverButton.addEventListener('click', async () => {
        await delay(700);
        calculateEstimations(pricing);
    });
})();