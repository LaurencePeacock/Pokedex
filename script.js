let image = document.getElementById('image');
let pokeName = document.querySelector('h2');
let input = document.getElementById('search');
let submit = document.getElementById('submit');
let abilities = document.getElementsByClassName('abilities');
let abilitiesTitle = document.getElementsByClassName('abilities-title');
let list = document.querySelector('ul');

const pokeFunction = async () => {
    let input = document.getElementById('search').value;
    let inputLower = input.toLowerCase();

    let x = await fetch('https://pokeapi.co/api/v2/pokemon/'+inputLower+'/');
    let y = await x.json();
    console.log(y);
  
    let imageUrl = y.sprites.front_default;
    image.style.backgroundImage = "url("+imageUrl+")";
    let name = y.species.name;
    let nameCaps = name[0].toUpperCase()+name.substring(1);
    pokeName.innerText = nameCaps;

    
//Loop through abiliities array to get number keys
    for(let i=0; i<y.abilities.length; i++){
   
        for(let prop in y.abilities[i].ability){
           //console.log(y.abilities[i].ability[prop]);
           let property = prop;
            if(property === 'name'){
           let propertyVal = y.abilities[i].ability[prop];
           //create link
           let a = document.createElement('a');
           //create text node for link text
           let linkText = document.createTextNode(propertyVal);
          // Append the text node to anchor element.
            a.appendChild(linkText); 
          // Set the title.
                a.title = "Ability";  
                // Set the href property.
        let abilityUrl = y.abilities[i].ability['url'];
           a.href = abilityUrl; 

           list.appendChild(a);
            }
        }

        abilitiesTitle[0].innerText = "Abilities"

        let hp = y.stats[0].base_stat;
        let attack = y.stats[1].base_stat;
        let defense = y.stats[2].base_stat;
        let specialAttack = y.stats[3].base_stat;
        let specialDefense = y.stats[4].base_stat;
        let speed = y.stats[5].base_stat;



        const ctx = document.getElementById('myChart').getContext('2d');
        
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
        datasets: [{
            label: '',
            data: [hp,attack,defense,specialAttack,specialDefense,speed],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {display: true,
                beginAtZero: true
                [{
      gridLines: {
        drawBorder: false,
      },
    }]
            },
         x:{
             display: false,
         }
        },
         plugins:{
        legend: {
        display: false
    }},
    
}});

  }
}


input.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' ){
      
          
        if(document.getElementById('myChart')){
            myChart.remove();
        }
        let chartDiv = document.getElementById('container');
          
          let newChart = document.createElement('canvas');
          newChart.id = "myChart";
          newChart.maxWidth  = "200px";
          newChart.maxHeight = "200px"
         
          
          chartDiv.appendChild(newChart);

        pokeFunction();
        input.value = '';
       
        
    }
})
