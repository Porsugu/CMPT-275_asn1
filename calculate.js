var max=100;
var lowerBound=[95,90,85,80,75,70,65,60,55,50,0]
var gradeCount=[0,0,0,0,0,0,0,0,0,0,0];
var grades=[];

function setMax(element){
    var inputValue = element.value;
    if(isNaN(inputValue)){
        console.log("inputValue"+inputValue);
        console.log("Input value");
        alert("Not a number")
        element.value=addDotZero(lowerBound[index]);
    }
    else{
        max=element.value;
        console.log(addDotZero(inputValue));
        element.value=addDotZero(inputValue);
        if(grades.length>0){
            genGraph();
        }
        
    }
}
function handleInput(element,index){
    var inputValue = element.value;
    if(isNaN(inputValue)){
        console.log("inputValue"+inputValue);
        console.log("Input value");
        alert("Not a number")
        element.value=addDotZero(lowerBound[index]);
    }
    else if((index==0 &&inputValue<=lowerBound[1])||(index==11 &&inputValue>=lowerBound[10])){
        console.log("inputValue"+inputValue);
        console.log("Overlap");
        alert("Grade overlap")
        element.value=addDotZero(lowerBound[index]);
    }
    else if((inputValue<=lowerBound[index+1])||(inputValue>=lowerBound[index-1])){
        console.log("inputValue"+inputValue);
        console.log("Overlap");
        alert("Grade overlap")
        element.value=addDotZero(lowerBound[index]);
    }
    else{
        lowerBound[index]=inputValue;
        console.log(addDotZero(inputValue));
        element.value=addDotZero(inputValue);
        if(grades.length>0){
            genGraph();
        }
    }
    
}

function genGraph(){
    gradeCount=regenGradeCount();
    console.log("regen Done");
    for(let row=0;row<gradeCount.length;row++){
        if(gradeCount[row]==0){
            document.getElementById('r'+row).style.color="#e9eff1";
            document.getElementById('r'+row).textContent="|";
        }
        else{
            document.getElementById('r'+row).style.color="black";
            document.getElementById('r'+row).textContent=genBar(row);
        }
    }
}
function addDotZero(number){
    return parseFloat(number).toFixed(2);
}

function regenGradeCount(){
    var temp=[0,0,0,0,0,0,0,0,0,0,0]
    for(let i=0;i<grades.length;i++){
        for(let j=0;j<lowerBound.length;j++){
            if(grades[i]>=lowerBound[j]){
                temp[j]++;
                break;
            }
        }
    }
    return temp;
}

function handleSubmit(){
    var input=document.getElementById("newGrade").value;
    if(isNaN(input) || input==''){
        console.log("Not number");
        alert("Not a number")
    }
    else if(parseFloat(input).toFixed(2)>max){
        alert("Input above max")
    }
    else if(parseFloat(input).toFixed(2)<lowerBound[10]){
        alert("Input below grade F");
    }
    else{
        console.log("is number");
        grades.push(input)
        var text=grades[0];
        for(let i=1; i<grades.length;i++){
            text+=', '+grades[i];
        }
        console.log('list: '+text);
        var row=dertermineGrade(input);
        console.log('row: '+row);
        gradeCount[row]+=1;
        document.getElementById('r'+row).style.color="black";
        document.getElementById('r'+row).textContent=genBar(row);
    }
}

function dertermineGrade(score){
    var i;
    var num=parseFloat(score).toFixed(2);
    for(i=0;i<lowerBound.length;i++){
        if(num>=lowerBound[i]){
            break;
        }
    }
    return i;
}

function genBar(row){
    var text='';
    for(let k=0;k<gradeCount[row];k++){
        text=text+'O';
    }
    return text;
}


