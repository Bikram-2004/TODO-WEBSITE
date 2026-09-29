let arr = [];
let submit = document.querySelector(".submit");
let input = document.querySelector(".input");
let ul = document.querySelector(".ul");
let fixed = document.querySelector(".fixed");
let element = document.querySelector(".element");

let editBox = null;
let count1 = 0;
let count2=0;

function task(task1,task2) {
    fixed.innerHTML = `<p>TASKS(${task1})</p>
                <p>COMPLETED:${task2}</p>`
}

submit.addEventListener('click', (e) => {
    if (submit.textContent === "Add") {
        if (input.value.trim() !== "") {
            element.innerHTML = "";
            e.preventDefault();
            arr.push({
                id: Date.now(),
                text: input.value
            });
            arr.forEach((value) => {
                element.innerHTML += `<div class="box" data-id=${value.id}>
                                <input type="checkbox" class="check">
                                <li class="list">${value.text}</li>
                                <button class="edt">Edit</button>
                                <button class="dlt">Delete</button>
                            </div>`
            });
            task(++count1,count2);
            input.value = "";
        }
    }
    else if (submit.textContent === "Update") {
        let list = editBox.querySelector(".list");
        list.textContent = input.value;
        submit.textContent = "Add";
        submit.style = "background-color:rgb(31, 31, 228)"
        let idNumber = Number(editBox.dataset.id);
        arr.forEach((v) => {
            if (v.id === idNumber) {
                v.text = input.value;
            }
        })
        input.value = "";
    }
});

element.addEventListener("click", (e) => {
    if (e.target.closest(".dlt")) {
        let dlt = e.target.closest(".box");
        let id = Number(dlt.dataset.id);
        arr = arr.filter((v) => {
            return v.id !== id;
        })
        dlt.remove();
        task(--count1,--count2);
    }
});

element.addEventListener("click", (e) => {
    if (e.target.closest(".edt")) {
        console.log("Hi");
        let box = e.target.closest(".box");
        let list = box.querySelector(".list");
        input.value = list.textContent;
        submit.textContent = "Update";
        submit.style = "background-color:orange";
        editBox = box;
    }
});

element.addEventListener("click",(e)=>{
    if(e.target.closest(".check")){
        let box = e.target.closest(".box");
        let check=box.querySelector(".check");
        let list = box.querySelector(".list");
        
        if(check.checked===true){
            list.style.textDecoration = "line-through";
            count2++;
        }
        else{
            list.style.textDecoration = "none";
            count2--;
        }
        task(count1,count2);
    }
})