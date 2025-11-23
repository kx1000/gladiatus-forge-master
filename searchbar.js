(async function () {
    'use strict';
    
    const el = document.querySelector('#mmoMySelectText1');
    const country = el.className.match(/mmo_([A-Z]{2})/)?.[1].toLowerCase();
    console.log(country);

    // const apiUrl = 'https://gladiatus-compare.kx1000.cyou';
    const apiUrl = 'http://127.0.0.1:8000';

    const url = new URL(window.location.href);
    const modParam = url.searchParams.get('mod');
    
    if (modParam !== 'forge') {
      return;
    }

    async function fetchJSON(url) {
      try {
        const res = await fetch(url, { headers: { "Accept": "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return res.json();
      } catch (err) {
        console.error("Fetch error:", err);
        return {};
      }
    }
  
    const [prefixesData, suffixesData, dictionaryData] = await Promise.all([
      fetchJSON(`${apiUrl}/${country}/prefixes`),
      fetchJSON(`${apiUrl}/${country}/suffixes`),
      fetchJSON(`${apiUrl}/stat-dictionary`)
    ]);
  
    // Prefixes
    Array.from(document.querySelectorAll("#prefix0 option")).forEach(option => {
      const statsObj = prefixesData[option.value];
      if (!statsObj) return;
  
      const stats = [];
      for (const [key, value] of Object.entries(statsObj)) {
        if (value !== 0 && dictionaryData[key]) {
          stats.push(`${dictionaryData[key]}: ${value}`);
        }
      }
      option.textContent = `${option.dataset.name} [${option.dataset.level}] = ` + stats.join(" ~ ");
    });
  
    // Suffixes
    Array.from(document.querySelectorAll("#suffix0 option")).forEach(option => {
      const statsObj = suffixesData[option.value];
      if (!statsObj) return;
  
      const stats = [];
      for (const [key, value] of Object.entries(statsObj)) {
        if (value !== 0 && dictionaryData[key]) {
          stats.push(`${dictionaryData[key]}: ${value}`);
        }
      }
      option.textContent = `${option.dataset.name} [${option.dataset.level}] = ` + stats.join(" ~ ");
    });
  
    NiceSelect.bind(document.getElementById("prefix0"), {searchable: true, placeholder: 'Prefix'});
    NiceSelect.bind(document.getElementById("basic0"), {searchable: true, placeholder: 'Item'});
    NiceSelect.bind(document.getElementById("suffix0"), {searchable: true, placeholder: 'Suffix' });

    document.head.append(Object.assign(document.createElement("style"), { 
        type: "text/css",
        textContent: `.nice-select {
            height: 22px !important;
            line-height: 20px !important;
            width: 110px !important;
            background-color: #dbcba5 !important;
            color: #513F2C;
            border-width: 2px !important;
            border-style: solid !important;
            border-top-color: #876E3E !important;
            border-bottom-color: #AF8E50 !important;
            border-left-color: #876E3E !important;
            border-right-color: #AF8E50 !important;
            padding-left: 4px !important;
        }
        
        .nice-select .current {
            display: block !important;
            overflow: hidden !important;
        }

      .sort_level, .sort_alphabetical {
        display: none !important;
      }
        
.nice-select .nice-select-dropdown {
background-color: #dfb176eb !important;
}

.nice-select .nice-select-search {
background-color: #ffffff70 !important;
    }
        .hidden-select {
            display: none !important;
        }`
    }))
  })();