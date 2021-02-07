
function getData(){
    let userInput = document.getElementById("meal").value;
    if(userInput === ''){
        alert("Please enter a meal name");
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`)
        .then(response => response.json())
        .then(data => displayData(data));    
    }
     
}

function clickedItem(data){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`)
    .then(response => response.json())
    .then(data => showClickedItem(data));
}

function showClickedItem(data){
    console.log(data);
    let ingredientList = document.getElementById('ingredients');
    ingredientList.innerHTML = '';
    document.getElementById('selected-item-img').src = data['meals'][0].strMealThumb;
    for(let i = 1; i <= 20; i++){
        ingredient = data['meals'][0]['strIngredient'+i];
        if(ingredient == ""){
            break;
        }
        else{
            var listItem = document.createElement('li');
            listItem.innerText = ingredient;
            ingredientList.appendChild(listItem);
        }
        
    }
    let element = document.getElementById('selected-item')
    element.style.display = 'block';
    element.scrollIntoView();
}

function displayData(data){
    if(data['meals'] == null){
        document.getElementById('foods').style.display = 'none';
        document.getElementById('selected-item').style.display = 'none';
        document.getElementById('not-found').style.display = 'block';
    }
    else{
        document.getElementById('food-items').innerHTML = '';
        document.getElementById('not-found').style.display = 'none';
        document.getElementById('selected-item').style.display = 'none';
        document.getElementById('foods').style.display = 'block';
        Object.keys(data['meals']).forEach(key => {
            var html = `<div class="col-md-4 mt-4 mb-4" onclick="clickedItem('${data['meals'][key].idMeal}')">
                            <div class="card-deck">
                                <div class="card">
                                    <img class="card-img-top" src="${data['meals'][key].strMealThumb}" alt="Card image cap">
                                    <div class="card-footer text-center">
                                        <strong class="text-muted">${data['meals'][key].strMeal}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            document.getElementById('food-items').innerHTML += html;
        });
    }
    
    
}

