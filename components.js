(async function () {
    'use strict';

    // const apiUrl = 'https://gladiatus-compare.kx1000.cyou';
    const apiUrl = 'http://127.0.0.1:8000';

    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(500);

    const el = document.querySelector('#mmoMySelectText1');
    const country = el.className.match(/mmo_([A-Z]{2})/)?.[1].toLowerCase();
    console.log(country);


    let currentHovered = null;

    const elements = document.querySelectorAll('[class*="item-i-"]');

    elements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        if (e.target.dataset.tooltip) {
          currentHovered = e.target;
          console.log('mouseenter', e.target.dataset.tooltip);
          return;
        }
      });
    });

    

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
          mutation.addedNodes.forEach(async node => {
              if (node.nodeType === 1 && node.matches('.tooltips')) {

                  await delay(30);

                  const match = currentHovered.dataset.tooltip.match(/\[\[\["(.*?)",/);

                  const itemName = match ? match[1] : null;

                  console.log(currentHovered.dataset.basis, itemName);

                  const url = `${apiUrl}/item`;
                  try {
                    const response = await fetch(url, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ 
                        country,  
                        itemName,
                        basis: currentHovered.dataset.basis,
                      }),
                    });
                    if (!response.ok) {
                      throw new Error(`Response status: ${response.status}`);
                    }
                
                    const result = await response.json();

                    const div = node.querySelector('div');
                    if (div) {
                      Object.entries(result.rawResources)
                      .sort((a, b) => b[1] - a[1])
                      .forEach(([component, quantity]) => {
                        const divContainer = document.createElement('div');
                        divContainer.style.display = 'flex';
                        divContainer.style.alignItems = 'center';
                        divContainer.style.gap = '4px';
                        div.appendChild(divContainer);

                        const img = document.createElement('img');
                        img.src = `${apiUrl}/img/resources/resource-18-${component}.png`;
                        img.alt = 'test';
                        img.width = 16;
                        img.height = 16;
                        divContainer.appendChild(img);

                        const quantityLabel = document.createElement('span');
                        quantityLabel.style.color = '#ce9569';
                        quantityLabel.textContent = `x ${quantity}`;
                        divContainer.appendChild(quantityLabel);

                        // const newP = document.createElement('p');
                        // newP.style.color = '#ce9569';
                        // newP.textContent = `${resource.component} x ${resource.quantity}`;
                        // div.appendChild(newP);
                      });
                    }
                  } catch (error) {
                    console.error(error.message);
                  }
              }
          });
      });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
})();