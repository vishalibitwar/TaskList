const addButton=document.querySelector('#add');
const valueInput=document.querySelector('#inputSubject');
const ClearALL=document.getElementById('clear');
const ul =document.querySelector('#unorderedlist');
const link= document.querySelector('.link');
const filter=document.querySelector('#filter');

  
loadEventListener();

function loadEventListener()
{     
document.addEventListener('DOMContentLoaded', getTasks);
addButton.addEventListener('click', Addsubject);
ul.addEventListener('click',  removeSubject);
ClearALL.addEventListener('click', clearAll);
filter.addEventListener('keyup', filterSubject);        

}

function getTasks()
{
  let data;
  if(localStorage.getItem('data')=== null)
  {     data= [];
  }else{
    data =JSON.parse(localStorage.getItem('data'));
  }   
  data.forEach(function(addtask){
    const li= document.createElement('li');
    li.className="li";
    li.appendChild(document.createTextNode(addtask));
    const link= document.createElement('a');
    link.className="link";
    link.appendChild(document.createTextNode('X'));
    li.appendChild(link);
    ul.appendChild(li);        
  });   
}




function Addsubject(){
  if(valueInput.value == '')
    alert("Enter Subject");
    if(valueInput.value !== '')    {   
   const li= document.createElement('li');
   li.className="li";
   li.appendChild(document.createTextNode(valueInput.value));
   const link= document.createElement('a');
   link.className="link";
   link.appendChild(document.createTextNode('X'));
   li.appendChild(link);
   ul.appendChild(li);  
  storeDataToLocalStorage(valueInput.value);
   valueInput.value='';
    }  
  }

function storeDataToLocalStorage(value)
{   let data;
   if(localStorage.getItem('data')=== null)
   {      data= [];
   }else{
     data =JSON.parse(localStorage.getItem('data'));
   }
   data.push(value);
   localStorage.setItem('data', JSON.stringify(data));
}

function removeSubject(e)
{
    if(e.target.classList.contains('link'))
    {     if(confirm('Are you sure?'))
        e.target.parentElement.remove();  
        removeFromLocalStorage(e.target.parentElement);
    }
}

function removeFromLocalStorage(item)
{     
  let data;
  if(localStorage.getItem('data')  === null)
  {     data= [];
  }else{
    data =JSON.parse(localStorage.getItem('data'));
  }
  data.forEach(function(current, index){
      const temp= item.textContent.length;
    if( item.textContent.slice(0,temp-1) ===  current)
    {       
        data.splice(index,1);      
    }
  });
  localStorage.setItem('data', JSON.stringify(data));
}

function clearAll()
{
     while(ul.firstChild)
     {        ul.removeChild(ul.firstChild);
     }
     clearDataFromLocalStorage();
}

function clearDataFromLocalStorage()
{    localStorage.clear();
}

function filterSubject(e){
  
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.li').forEach(function(current){        
      const item =current.firstChild.textContent;
       if(item.toLowerCase().indexOf(text) != -1){   
          current.style.display ='flex';
       }else{
          current.style.display ='none';
       }
         });

  } 