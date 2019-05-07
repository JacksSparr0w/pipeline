// Лабораторная работа 1 по дисциплине МРЗвИС
// Выполнена студентом группы 721701
// БГУИР Кацубо Вадим Эдуардович
// Главный скрипт
//
// 1. Алгоритм вычисления произведения пары 6-разрядных чисел 
//    умножением с младших разрядов со сдвигом частичной суммы вправо. 
// 2. Учебные материалы по JavaScript
// 3. Учебные материалы по HTML

var firstVector;
var secondVector;
var result=[];
var buffer=[];
var table;
var row;
var cell;
var len;
var time;
var step;

//created by Katsubo g.721701
function readInput()
{
  removeTable();
  firstVector=document.getElementById('FirstLine').value.replace(/\s+/g, '');
  secondVector=document.getElementById('SecondLine').value.replace(/\s+/g, '');
  time=document.getElementById('Time').value.replace(/\s+/g, '');

  firstVector = firstVector.replace(/,+$/g, '');
  secondVector = secondVector.replace(/,+$/g, '');

  firstVector = firstVector.split(',');
  secondVector = secondVector.split(',');

  time= +time;

  if(firstVector.length!=0 && 
    secondVector.length!=0 && 
    time!=0 && 
    firstVector.length==secondVector.length)
  {
    len=firstVector.length;

    for(var i = 0; i < firstVector.length; i++)
			if (firstVector[i].match(/^\d+$/)){
				firstVector[i] = +firstVector[i];
        firstVector[i]=lengthcheck(firstVector[i].toString(2));
      }

		for(var i = 0; i < secondVector.length; i++)
			if (secondVector[i].match(/^\d+$/)){
				secondVector[i] = +secondVector[i];
        secondVector[i]=lengthcheck(secondVector[i].toString(2));

      }

    for(var i=0;i<firstVector.length;i++)
    {
      result[i]=[];
      for(var j=0;j<12;j++)
        result[i][j]=0;
      buffer[i]=[];
      for(var j=0;j<7;j++)
        buffer[i][j]=0;
    }
    
    table=document.getElementById("Table");
    row=table.insertRow(-1);
    cell=row.insertCell(-1);
    cell.innerHTML="Пара<br>Действие";
    for(var i=1;i<=12;i++)
    {
      cell=row.insertCell(-1);
      if(i%2!=0)
        cell.innerHTML="Этап "+i+":<br>произведение";
      else
        cell.innerHTML="Этап "+i+":<br>сдвиг";
    }
    step=1;
  }
  else
    createMessage("Данные введены неверно.");
}

//created by Katsubo g.721701
function addRow()
{
  if(step<=11+len)
  {
    row=table.insertRow(-1);
    for(var j=1;j<=13;j++)
    {
      cell=row.insertCell(-1);
      if(j==1)
      {
        if(step<=len)
          cell.innerHTML="Пара "+step+"<br>А:"+firstVector[step-1]+"<br>В:"+secondVector[step-1];
      }
      else
      {
        if(step-(j-1)>=0 && step-(j-1)<len)
        {
          var answer="";
          var couple=step-(j-1);
          if(j%2==0)
          {
            var rank=6-j/2;
            answer+="Число:<br>"+firstVector[couple]+"<br>Разряд:<br>"+secondVector[couple][rank]+"<br>";
            if(secondVector[couple][rank]=='1')
              for(var k=5;k>=0;k--)
              {
                var sum=Number(firstVector[couple][k])+Number(result[couple][k])+Number(buffer[couple][k+1]);
                if(sum==1)
                {
                  result[couple][k]=1;
                  buffer[couple][k+1]=0;
                }
                else if(sum==2)
                {
                  result[couple][k]=0;
                  buffer[couple][k+1]=0;
                  buffer[couple][k]=1;
                }
                else if(sum==3)
                {
                  result[couple][k]=1;
                  buffer[couple][k+1]=0;
                  buffer[couple][k]=1;
                }
              }
          }
          else
          {
            shift(result[couple]);
          }
          answer+="Результат:<br>";
          for(var k=0;k<12;k++){
            answer += k % 4 == 0 ? " " : "";
            answer+=result[couple][k];
          }
          answer+="<br>Время:<br>"+step*time;
          cell.innerHTML=answer;
        }
      }
    }
    step++;
  }
  else
  {

    var answer="Ответ: <";
    for(var i=0;i<len;i++)
    {
      answer+=parseInt(result[i].join(''), 2) + " ";
    }
    answer += ">"+"<br>";

    createMessage(answer);
  }
}

//created by Katsubo g.721701
function removeTable()
{
  createMessage("");
  var table=document.getElementById("Table");
  table.innerHTML="";
}

//created by Katsubo g.721701
function createMessage(message)
{
  var inf=document.getElementById("Inf");
  inf.innerHTML=message;
}

//created by Katsubo g.721701
function shift(array)
{
  array.splice(11, 1);
  if(buffer[0]==1)
  {
    buffer[0]=0;
    array.splice(0, 0, 1);
  }
  else
    array.splice(0, 0, 0);
}

//created by Katsubo g.721701
function lengthcheck(number)
{
  var len=number.length;
  if(len<6)
    for(var i=0;i<6-len;i++)
      number='0'+number;
  return number;
}
