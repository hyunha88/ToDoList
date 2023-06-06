// 유저는 할일을 추가할 수 있다. 버튼을 클릭하면 할 일이 추가된다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다




let add_character = document.getElementById("add_character");
let addBtn = document.getElementById("add_btn");
let taskList = [];
let underLine=document.getElementById("underline");
let tabs=document.querySelectorAll(".check_list_title div");
let mode="all";
let filterList=[];

addBtn.addEventListener("click", addTask);


for(let i=1; i<tabs.length; i++){
  tabs[i].addEventListener("click",function(event){
    filter(event);
  });
}




function addTask(){
    //let taskContent=add_character.value;
    let task = {
      id:randomIDGenerate(),
      taskContent:add_character.value,
      isComplete:false
    }
    
    taskList.push(task);
    add_character.value = " ";
    console.log(taskList)
    render();
  }

  function render(){
    let list=[];
    if (mode=="all"){
      list=taskList;
    }else if(mode=="not" || mode=="done"){
      list=filterList;
    }
    let resultHTML = ' ';
    for(let i =0; i<list.length; i++){
      if(list[i].isComplete==true){
          resultHTML+=`<div id="task_full" class="task_full">
          <div class="task task-done">${list[i].taskContent}</div>
          <div class="check_del_btn"> 
              <button class="reply_btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-reply icon_reply"></i> </button>  
              <button class="trash_btn" "deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can icon_trash"></i></button> 
          </div>
      </div>`;
      } else{
        resultHTML +=  ` <div id="task_full" class="task_full">
        <div class="task">${list[i].taskContent}</div>
        <div class="check_del_btn"> 
            <button  class="check_btn" onclick="toggleComplete('${list[i].id}')">  <i class="fa-solid fa-check icon_check"></i>  </button>
            <button  class="trash_btn" onclick="deleteTask('${list[i].id}')"> <i class="fa-regular fa-trash-can icon_trash"></i> </button>  
        </div>
    </div>`;
      }


       
    }
    document.getElementById("task_board").innerHTML = resultHTML;
  }
   

  function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].id ==id){
        taskList[i].isComplete=!taskList[i].isComplete;
        break;
      }
    }
    render();
  }

 
function deleteTask(id){
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id==id){
      taskList.splice(i,1); //i에 있는 아이템을 하나만 삭제하겠다
      break;
    }
  }
 render();
}


  function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9);
  }

 
 
   
   
     
  function filter(event) {
    mode=event.target.id;
    /*if(event){
      underLine.style.width=event.target.offsetWidth + "px";
      underLine.style.left=event.target.offsetLeft+"px";
      underLine.style.top=event.target.offsetTop+(e.target.offsetHeight-4)+"px";
      }*/

    filterList=[];
    if(mode=="all"){
      render();
      console.log(filterList);
    }else if(mode=="not"){
      for(let i=0; i<taskList.length;i++){
        if(taskList[i].isComplete==false){
          filterList.push(taskList[i]);
        }
      }
      render();
      console.log(filterList);
    }else if(mode=="done"){
      for(let i=0; i<taskList.length;i++){
        if(taskList[i].isComplete==true){
          filterList.push(taskList[i]);
        }
      }
      render();
      console.log(filterList);
    }
    
  }
   