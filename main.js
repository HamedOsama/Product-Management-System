//Global Variables
let buttons = document.querySelectorAll("button");
let title = document.getElementById("title");
let price = document.getElementById("price");
let sellPrice = document.getElementById("sellprice");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let table = document.querySelector("table");
let items = document.querySelector(".numofitems");
let searchInput = document.getElementById("search")
let called = false;
//local storage
let data;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}
else{
    data = [];
}
//create product
function addItem(){
    if(title.value != '' &&price.value != '' &&sellPrice.value != '' &&count.value != '' &&category.value != '' ){
        let obj = {
            title: title.value.toLowerCase(),
            price: price.value,
            sellPrice: sellPrice.value,
            count: count.value,
            category : category.value.toLowerCase()
        }
        data.push(obj);
        localStorage.setItem("product", JSON.stringify(data))
        addmod();
        updating();
        del();
        clearData();
    }else{
        check();
    }
   
}


// check function
function check(){
    if(title.value ==''){
        title.style.background = "antiquewhite";
        title.placeholder = "Please Fill This";
        setTimeout(()=>{
        title.style.background = "#111";
        title.placeholder = "Title"
        },2500)
        }
        
        if(count.value == ''){
            count.style.background = "antiquewhite";
        count.placeholder = "Please Fill This";
        setTimeout(()=>{
        count.style.background = "#111";
        count.placeholder = "Count"
        },2500)
        }
        if(category.value == ''){
            category.style.background = "antiquewhite";
            category.placeholder = "Please Fill This";
            setTimeout(()=>{
            category.style.background = "#111";
            category.placeholder = "Category"
            },2500)            
        }
    if(price.value == ''){
        price.style.background = "antiquewhite";
        price.placeholder = "Please Fill This";
        setTimeout(()=>{
        price.style.background = "#111";
        price.placeholder = "Price"
        },2500)
    }
    if(sellPrice.value == ''){
        sellPrice.style.background = "antiquewhite";
        sellPrice.placeholder = "Please Fill This";
        setTimeout(()=>{
        sellPrice.style.background = "#111";
        sellPrice.placeholder = "Sell Price";
        },2500)
    }
}
create.addEventListener("click",addItem)
// clear after creation
function clearData(){
    setTimeout(()=>{
        title.value = "";
        price.value = "";
        sellPrice.value = "";
        count.value = "";
        category.value = "";
        total.style.backgroundColor = "blueviolet";
    },50)
}
//read
function addmod(){
    let c =  data.length - 1;
    let tbody = document.createElement("tbody");
    tbody.innerHTML = `<td>${c+1}</td>
                    <td>${data[c].title}</td> 
                    <td>${data[c].price}</td>
                    <td>${data[c].sellPrice}</td>
                    <td>${data[c].category}</td>
                    <td id=c${c}>${data[c].count}</td>
                    <td><button class="add" id="${c}">Add</button></td>
            <td><button class="decrease" id="${c}">Decrease</button></td>
            <td><button class="update" id="${c}">Update</button></td>
            <td><button class="delete" id="${c}">Delete</button></td>
            ` ;
            tbody.classList.add(`row${c}`);
        table.appendChild(tbody);
        total.innerHTML = `${data.length}`;
       
}

function afterLoad(){
    for(let i = 0 ; i < data.length ;i++){
        let tbody = document.createElement("tbody");
        tbody.innerHTML = `<td>${i+1}</td>
                        <td>${data[i].title}</td> 
                        <td>${data[i].price}</td>
                        <td>${data[i].sellPrice}</td>
                        <td>${data[i].category}</td>
                        <td id="c${i}">${data[i].count}</td>
                        <td><button class="add" id="${i}">Add</button></td>
                <td><button class="decrease" id="${i}">Decrease</button></td>
                <td><button class="update" id="${i}">Update</button></td>
                <td><button class="delete" id="${i}">Delete</button></td>
                ` ;
            tbody.classList.add(`row${i}`);
            table.appendChild(tbody);
            total.innerHTML = `${data.length}`;
        }
        updating();
        add();
        decrease();
        del();
    }
    
//increase product
let addButton = document.querySelectorAll(".add");
function add(){
    addButton = document.querySelectorAll(".add");
    addButton.forEach((up)=>{
        up.addEventListener("click",()=>{
            let z = data[+up.id].count = +data[+up.id].count + 1;
            localStorage.product = JSON.stringify(data);
            document.getElementById(`c${up.id}`).innerHTML = z;
        })
    })
}
//Decrease
let decreaseButton = document.querySelectorAll(".decrease");
function decrease(){
    decreaseButton = document.querySelectorAll(".decrease");
    decreaseButton.forEach((up)=>{
        up.addEventListener("click",()=>{
            if(data[+up.id].count > 0){
            let z = data[+up.id].count = +data[+up.id].count - 1;
            localStorage.product = JSON.stringify(data);
            document.getElementById(`c${up.id}`).innerHTML = z;
            }
            
        })
    })
}

// Delete item
let delteButton = document.querySelectorAll(".delete");
function del(){
    delteButton =  document.querySelectorAll(".delete");

delteButton.forEach((del)=>{
    del.addEventListener("click",()=>{

            if (confirm("Are You Sure To Delete this Item!")) {
                data.splice(del.id,1);
                localStorage.product = JSON.stringify(data);
                location.reload();
            }
    })
})
}
//Update
let update = document.querySelectorAll(".update");
function updating(){
    update = document.querySelectorAll(".update");
    update.forEach((e)=>{
        e.addEventListener("click",()=>{
            create.innerHTML = "Update";
            title.value = data[e.id].title;
            price.value = data[e.id].price;
            sellPrice.value = data[e.id].sellPrice;
            count.value = data[e.id].count;
            category.value = data[e.id].category;
            create.removeEventListener("click",addItem)
            create.removeEventListener("click",clearData)
        scroll({
            top : 0,
            behavior : "smooth"
        })
        create.addEventListener("click",()=>{
    if(title.value != '' &&price.value != '' &&sellPrice.value != '' &&count.value != '' &&category.value != '' ){
            let obj = {
                title: title.value,
                price: price.value,
                sellPrice: sellPrice.value,
                count: count.value,
                category : category.value
            }
            data[e.id] = obj;
            localStorage.product = JSON.stringify(data);
            location.reload();
        }
         else check();  

        })
    })
})
}
// search
let searchByName = document.getElementById("byName");
let searchByBrand =document.getElementById("byBrand");
let searchType = "searchByName";
function brand(){
    searchType = "";
}function namee(){
    searchType = "searchByName";
}
function search(){
    let input = searchInput.value.toLowerCase();
    let now = document.querySelectorAll("tbody");
    searchInput.focus();
    for(let i = 1 ; i < now.length ; i++){
        now[i].innerHTML = "";
    }
    for(let i = 0 ; i < data.length ; i++){

    if(searchType){
        searchInput.placeholder = "Search By Name";
            if(data[i].title.includes(input)){
                let tbody = document.createElement("tbody");
        tbody.innerHTML = `<td>${i+1}</td>
                        <td>${data[i].title}</td> 
                        <td>${data[i].price}</td>
                        <td>${data[i].sellPrice}</td>
                        <td>${data[i].category}</td>
                        <td id="c${i}">${data[i].count}</td>
                        <td><button class="add" id="${i}">Add</button></td>
                <td><button class="decrease" id="${i}">Decrease</button></td>
                <td><button class="update" id="${i}">Update</button></td>
                <td><button class="delete" id="${i}">Delete</button></td>
                ` ;
            tbody.classList.add(`row${i}`);
            table.appendChild(tbody);
            total.innerHTML = `${data.length}`;
        }
    }else{
        searchInput.placeholder = "Search By Brand";
            if(data[i].category.includes(input)){
                let tbody = document.createElement("tbody");
        tbody.innerHTML = `<td>${i+1}</td>
                        <td>${data[i].title}</td> 
                        <td>${data[i].price}</td>
                        <td>${data[i].sellPrice}</td>
                        <td>${data[i].category}</td>
                        <td id="c${i}">${data[i].count}</td>
                        <td><button class="add" id="${i}">Add</button></td>
                <td><button class="decrease" id="${i}">Decrease</button></td>
                <td><button class="update" id="${i}">Update</button></td>
                <td><button class="delete" id="${i}">Delete</button></td>
                ` ;
            tbody.classList.add(`row${i}`);
            table.appendChild(tbody);
            total.innerHTML = `${data.length}`;

        }
    }
}
updating();
    add();
    decrease();
    del();
}
searchByBrand.addEventListener("click",brand)
searchByName.addEventListener("click",namee)
searchByName.addEventListener("click",search)
searchByBrand.addEventListener("click",search)
searchInput.addEventListener("keyup",search)
afterLoad();
