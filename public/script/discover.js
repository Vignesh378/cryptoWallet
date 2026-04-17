  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll(".links a");
    const currentPath = window.location.pathname;
    
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
          
  



document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connect-wallet');
    const dropbox = document.querySelector('.dropbox');
   // Toggle the visibility of the dropbox
    connectWalletBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        dropbox.classList.toggle('hidden');
    });

    // Optional: Close the dropbox when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropbox.contains(event.target) && event.target !== connectWalletBtn) {
            dropbox.classList.add('hidden');
        }
});
})

  

 document.addEventListener('DOMContentLoaded', () => {
  const chooseBoxes = document.querySelectorAll('.options .choose');
  const sections = document.querySelectorAll('.main-container > div');

  function showSection(targetClass) {
    console.log(`Showing section: ${targetClass}`);
    sections.forEach(section => {
      if (section.classList.contains(targetClass)) {
        section.classList.remove('hidden');
        section.style.opacity = '1';
        console.log(`Removing hidden from: ${section.className}`);
      } else {
        section.style.opacity = '0';
        console.log(`Adding hidden to: ${section.className}`);
        setTimeout(() => section.classList.add('hidden'), 300); // Wait for transition
      }
    });
  }

  const defaultOption = document.querySelector('.options .choose[data-target="token-container"]');
  if (defaultOption) {
    defaultOption.setAttribute('id', 'on');
    showSection('token-container');
  } else {
    console.error('Default option (token-container) not found');
  }

  chooseBoxes.forEach(box => {
    box.addEventListener('click', function (event) {
      event.preventDefault();
      chooseBoxes.forEach(opt => opt.removeAttribute('id'));
      this.setAttribute('id', 'on');
      const targetClass = this.getAttribute('data-target');
      console.log(`Clicked option with target: ${targetClass}`);
      showSection(targetClass);
    });
  });
});
const nft_cards = document.querySelector('.trending .nft-cards');
if (!nft_cards) {
    console.error('nft_cards element not found in the DOM');
}


const topSolanaNFTs = [
  { address: "Dx2XXfTUoTRsqRrBmB4dESraEeQy8Uby2XsLCtHW7GNS" },
  {  address: "52RE9xFVNfUkXASgQnBZiDjUu9NMDqgv1LQQLCDKVb11" },
  { address: "1WJuNtvvp6zwfvQhWQ5DqqypqTAvoRoTnNTLEvPE4Hj" },
  {  address: "2F2M2kSqU3zzkkg8hvxm9p4X7wbSHkpKCfFP5ZgsPNFG" },
 
  {address:'4pi2FqWdNKsSkS7orbRjnPv4cqjLaky2j4mRjH93WVn5'},
  {address:'5M12dhmWATTtWDwbCgoChnXNMPpRKdtTUa6yXAfLwGQP'}
  
  
];




topSolanaNFTs.forEach(({ address }, index) => {
  setTimeout(async() => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "uis-K_g6FuRLEPPP");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`https://api.shyft.to/sol/v1/nft/read?network=mainnet-beta&token_address=${address}&refresh=true&token_record=true`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result); // Log the API response
        if (result.result && result.result.image_uri) {
            const cardHTML = `
                <div class="nft-card" style="--position:${index+1}">
                    <div class="nft-image">
                        <img src="${result.result.image_uri}" alt="${result.result.name || 'NFT'}">
                    </div>
                    <div class="nft-info">
                        <h2>${result.result.symbol || 'Unnamed NFT'}</h2>
                       
                    </div>
                </div>`;
            nft_cards.innerHTML += cardHTML;
        } else {
            console.error(`Invalid response for address ${address}:`, result);
        }
    })
    .catch(error => console.log('error', error));
  }, index * 1000); // Delay increases with each request: 0ms, 1000ms, 2000ms, etc.
});

// ------------------------------------growth-potential---------------------------
document.addEventListener('DOMContentLoaded', () => {
    const nft_cards_growth = document.querySelector('.growth-potential .nft-cards');
    if (!nft_cards_growth) {
        console.error('nft_cards_growth element not found in the DOM');
        return;
    }

    const growthSolanaNfts = [
        { address: '4SoFRnPhYpyf2bLBx6XUbr5GmeKDaQ5o17o95HkZSjyw' },
        { address: 'AADQckXzATQFLGs6RrB45SoJQdq9sPy7GT5Xn1Ky8UB9' },
        { address: 'J3HPgguB9xAncHaybwky45R91teqibR9dRSyWumzDNm5' },
        { address: 'GEHmEz3SSLHWq8CEFVBoRXy5n4BoW3kiX3zo7TJARm5t' },
        { address: 'GCYJxVDTGYyGMAFiH6M389ymUHHUmxKvU4NU51sFtdUA' }
    ];

    growthSolanaNfts.forEach(({ address }, index) => {
        setTimeout(async () => {
            const myHeaders = new Headers();
            myHeaders.append("x-api-key", "3e_nkiJgjEqztD2W");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`https://api.shyft.to/sol/v1/nft/read?network=mainnet-beta&token_address=${address}&refresh=true&token_record=true`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.result && result.result.image_uri) {
                        const cardHTML = `
                            <div class="nft-card" style="--position:${index + 1}">
                                <div class="nft-image">
                                    <img src="${result.result.image_uri}" alt="${result.result.name || 'NFT'}">
                                </div>
                                <div class="nft-info">
                                    <h2>${result.result.symbol || 'Unnamed NFT'}</h2>
                                   
                                </div>
                            </div>`;
                        nft_cards_growth.innerHTML += cardHTML;
                    } else {
                        console.error(`Invalid response for address ${address}:`, result);
                    }
                })
                .catch(error => console.log('error', error));
        }, index * 1000); // Delay increases with each request: 0ms, 1000ms, 2000ms, etc.
    });
});
// --------------------------------collectables------------------
const nft_collectable = document.querySelector('.collectables .nft-cards');
if (!nft_collectable ) {
    console.error('nft_cards element not found in the DOM');
}
const collectablesSolana = [
  { address: "8cnSAen3gyNFUGriQ4LgJHNZVoaat8topctyPEf163z8" },
  {  address: "GQ1igvjaKzrYVLgg1oCW3Zbpy8AV1vcMDKxiJx9Q1sx8" },
  { address: "BdG8EuZvB3r4dhhwiaExGtPJc5muYNLKtQKcMqQ4DB1a" },
  {  address: "EgBrMWdeL3eCsX3ceZDhJunzxEpXhnUWrkx6FBHaozuW" },
 
  {address:'Hd2ksWUG9JwFUxUjDrW7EjamuXPZTfq4WJZakpaFHr2A'},
  {address:'CG9ptkK2eCG4LvxKXLesN6kS3NaGWjRwiiBexEKp1AeK'}
  
  
];

collectablesSolana.forEach(({ address }, index) => {
  setTimeout(async() => {
    console.log(nft_collectable)
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "dzgu4_7PHvSceSLM");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch(`https://api.shyft.to/sol/v1/nft/read?network=mainnet-beta&token_address=${address}&refresh=true&token_record=true`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result); // Log the API response
        if (result.result && result.result.image_uri) {
            const cardHTML = `
                <div class="nft-card" style="--position:${index+1}">
                    <div class="nft-image">
                        <img src="${result.result.image_uri}" alt="${result.result.name || 'NFT'}">
                    </div>
                    <div class="nft-info">
                        <h2>${result.result.symbol || 'Unnamed NFT'}</h2>
                       
                    </div>
                </div>`;
                nft_collectable.innerHTML += cardHTML;
        } else {
            console.error(`Invalid response for address ${address}:`, result);
        }
    })
    .catch(error => console.log('error', error));
  }, index * 1000); // Delay increases with each request: 0ms, 1000ms, 2000ms, etc.
});

function formatText(text) {
  const maxLength = 60;
  if (text.length > maxLength) {
    return text.match(new RegExp(`.{1,${maxLength}}`, 'g')).join('<br>');
  }
  return text;

}

