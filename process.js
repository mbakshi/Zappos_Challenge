var count,cost,vrtn;  //vrtn->variation
//process() initialises the input. Input can be checked for any errors here.
function process()
{
    
    count=document.getElementById("count").value;
    cost=document.getElementById("cost").value;
	vrtn=document.getElementById("var").value;
    var item;
    var sizes = document.getElementsByName('type');

    for (var i=0; i < sizes.length; i++)
        if (sizes[i].checked==true)
            item=sizes[i].value;

    var url="http\:\/\/cs\-server\.usc\.edu\:37995\/process1\.php?"+item;
    loadXMLDoc(url);
}

var req;
//loadXMLDoc() sends AJAX request to native PHP script which gets the data from Zappos server
function loadXMLDoc(url) {
    if(window.XMLHttpRequest) {
        try {   req = new XMLHttpRequest();
        } catch(e) {  req = false;

        }
    } else if(window.ActiveXObject) {
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {  req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {   req = false;
            }
        }
    }
    if(req) {
        req.onreadystatechange = processReqChange;
        req.open("GET", url, true);
        req.send("");
    }
}

var prices=[];
var selected=[];
var tempSelected= [];
var doc;
function processReqChange() {

    if (req.readyState == 4) {

        if (req.status == 200) {
          
            doc=eval('('+req.responseText+')');

            for(var i=0;i<doc.results.length;i++)
            {
                prices[i]=doc.results[i].price;
                prices[i]=prices[i].replace('$','');
                prices[i]=parseInt(prices[i]);
            }
			
            calculate(0,0,0);
			
            print();
           
            /*	for(var i=0;i<final.length;i++)
             {
             for(var j=0;j<final[0].length;j++)
             {
             document.write(selected[i+j]);
             }
             }
             */
        }
    }
}
var j=0;
//As the name suggests, calculate does all the calculation
function calculate(sumSoFar,numUsed,startIndex)
{

    if(((sumSoFar>cost-vrtn)&&(sumSoFar<cost+vrtn)) && numUsed==count)
    {
        for(var i=0;i<tempSelected.length;i++)
            selected[j++]=tempSelected[i];
    }

    if(numUsed>=count || startIndex>=prices.length) return;


    for(var i=startIndex;i<prices.length;i++)
    {
        tempSelected[numUsed]=i;
        calculate(sumSoFar+prices[i],numUsed+1,i+1);
    }
}

//print creates the string to be printed and prints it.
function print()
{

	alert(count);
    var toPrint="<tr><th>S.No.</th><th>Product Combo</th><th>Original Price</th><th>Zappos Price</th></tr>";
    for(var i=0;i<selected.length;i=i+parseInt(count))
    {
     toPrint+="<tr><th>"+((i/count)+1)+"</th><td>";
		for(var j=0;j<count;j++)
			toPrint+="<a href=\""+doc.results[selected[i+j]].productUrl +
        "\"><img src=\""+doc.results[selected[i+j]].thumbnailImageUrl+"\" height=\"200\" width=\"250\"/></a>";
        toPrint+= "</td><td>$";
	
		var sum=0;
		for(var j=0;j<count;j++)
			sum+=(parseInt(doc.results[selected[i+j]].originalPrice.replace('$','')));
		toPrint+=sum+"</td><td>$";
		sum=0;
		for(var j=0;j<count;j++)
			sum+=parseInt(doc.results[selected[i+j]].price.replace('$',''));
		toPrint+=sum+"</td></tr>";
	
    }
	alert(toPrint + "here");
	document.getElementById("tbl1").innerHTML=toPrint;
	document.getElementById("tbl1").style.visibility='visible';
}
