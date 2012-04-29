var isStarted = false;
var strStartedURL = "http://108.12.134.59/RBT/mdevSetState.php/?state=started";
var strGameStatusURL = "http://108.12.134.59/RBT/mdevpoll.php";
var counter = 0;

 function startGame()
 {
 	alert('getting response');
 	
    $.post('http://192.168.11.25/~teresabrooks/MDC/testdata/Response.xml', function(data)
    {
    	//alert(data);
    });        
                 
    //isStarted = true;    
    getCurrentGameStatus(); 
 } 
 
 function getCurrentGameStatus()
 {
 	//TODO need to add mechanism to stop polling when game is over.
 	$.post('http://192.168.11.25/~teresabrooks/MDC/testdata/Response.xml', function(data)
 	{
 	   	counter++;
 	   	//alert("counter: " + counter + "\n response: " + data); //TODO PROCESS RESULT
 	   	setTimeout(getCurrentGameStatus,2500);
		parseResponseAndDrawGraph(data);
 	});
 }
 
 function parseResponseAndDrawGraph(xml)
 {
 	var strColor="";
 	var strScore = "";
 	var strPlayerId = ""
 	var intPlayerCounter = 0;
 	var arrayOfData = new Array();

 	$(xml).find('headSetItem').each(function()
 	{
 		//get player data properties
 		strColor = getColorHexValue($(this).find('color').text());
 		strScore = $(this).find('meditation').text();
 		strPlayerId = $(this).find('unique_ID').text();
 		
 		//alert(strColor + " " + strScore + " " + strPlayerId);
 		
 		//add each player's data to the array
 		arrayOfData[intPlayerCounter] = [strScore,strPlayerId,strColor];
 		
 		//update counter
 		intPlayerCounter++;
 	});
 	
 	//clear div so we can re-draw the graph
 	$('#graph').empty();
 	
 	//bind data to array
 	$('#graph').jqBarGraph({ data: arrayOfData }); 
 }
 
 function getColorHexValue(strColorName)
 {
 	var strColorHexValue = "";
 	
 	if(strColorName == "red")
 		strColorHexValue = "#ff0000";
 	else if(strColorName == "green")
 		strColorHexValue = "#00C000";
 		
 	return strColorHexValue;
 }
 




