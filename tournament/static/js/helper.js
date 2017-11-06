

	var go = document.getElementById("go");
	var ids = document.getElementById("ids");
	var names = document.getElementById("name");
	var url = document.getElementById("url");
	var chance = document.getElementById("chance");
	var cont = document.getElementById("content");
	var play_button = document.getElementById("play");
	var content = document.getElementById("content");
	var rivals = [];
	var pairs = [];
	var matches = 0 ;
	var champResults = [];
	//var dropdown = $(".dropdown-menu");

	$("#post_contry").prop("disabled", true);

	window.onload = function(){
		$.ajax({
			        url: "http://localhost:8000/api",
			        method: 'GET',
			      	}).done(function(result) {
			      		for(var j=0; j<result.length; j++){
			      			$(".dropdown-menu").append("<button type=\"button\" class=\"dropdown-item\" id=" +
			      				result[j].id + " href=\"\"><img id=\"flag\" src=http:/"+"/localhost:8000/static/" +
			      				result[j].url + " class='flag wall img-responsive img-rounded' > " +
			      				result[j].name + "</button>");

								$("#" + result[j].id).on("click",(function(r){
	 								return function(){
	 									$("#ids").attr('value', result[r].id);
	 									$("#name").attr('value', result[r].name);
	 									$("#url").attr('value', result[r].url);
	 									$("#chance").attr('value', result[r].chance);
	 									$("#post_contry").prop("disabled", false);

							 		};
							 	})(j));

			      		};
			      	});
 	};



	var upper_tb_insert = "<div><h3>GAME SIMULATION</h3>"+
		                "<div class=\"table-responsive col-md-3\"> "+
		                  "<table class=\"table mytable\"> "+
		                    "<thead> "+
		                      "<tr>"+
		                        "<th>#</th>"+
		                        "<th>ID</th>"+
		                        "<th>Country</th>"+
		                        "<th>Chance</th>"+
		                        "<th>Remove</th>"+
		                      "</tr>"+
		                    "</thead>"+
		                    "<tbody id = \"tb_insert\">"+

		                    "</tbody>"+
		                  "</table>"+
		                  "<div id=\"play_button\">"+
		                  "</div>"+
		                "</div>"+
	                "</div>";

	function rmv_button(n){
		return  "<button id=\""+"but"+n+"\" type=\"button\" class=\'btn btn-info btn-sm removeBtn\' onClick = \'remove_row("+n+")\'>Remove</button>";
	};

	var count = 0
	function process(){
		count++;
		if (count==1){
			content.innerHTML = "<div class=\"container game\"><div><br><h3>GAME SIMULATION</h3>"+
									"<h6>(Swiss Style)</h6>"+
									"</div>"+
									"<div class=\"row\" id=\"match_container\">"+
					                "<div class=\"table-responsive col-md-3\"> "+
					                	"<div class=\"row\">"+
							                  "<table class=\"table table-responsive mytable\"> "+
							                    "<thead> "+
							                      "<tr>"+
							                        "<th>#</th>"+
							                        "<th>Flag</th>"+
							                        "<th>Country</th>"+
							                        "<th>Chance</th>"+
							                        "<th>Remove</th>"+
							                      "</tr>"+
							                    "</thead>"+
							                    "<tbody id = \"tb_insert\">"+
							                      "<tr id=\""+"line"+ count +"\">"+
													 "<td id=\""+"count"+count+"\">"+count+"</td>"+
													 "<td><img src=http:/"+"/localhost:8000/static/"+url.value+" class=\'flag wall img-responsive img-rounded\'></img></td>"+
													 "<td>"+names.value+"</td>"+
													 "<td>"+chance.value+"</td>"+
													 "<td>"+rmv_button(count)+"</td>"+
												   "</tr>"+
							                    "</tbody>"+
							                  "</table>"+
						                "<div id=\"play_button\">"+
						                  	"<button id=\"play\" type=\"button\" class=\'btn btn-primary btn-xs\' disabled>Play  "+
						                  	"<spam><img src=http:/"+"/localhost:8000/static/images/x.svg class=\'flag wall img-responsive img-rounded\' width =\'16\'></img></spam></button>"+
						                "</div>"+
						                "</div>"+
					                "</div>"+
					                "</div>"+
				                "</div>";
			$("#" + ids.value).prop("disabled", true);
	 		$("#" + ids.value).css("background-color", "#DFE2DB");
	 		$("#post_contry").prop("disabled", true);

			rivals.push({"id" : ids.value , "country" : names.value , "chance" : Number(chance.value) , "points" : 0 , "url" : url.value});
			match();

		}else{
			var tb_insert = document.getElementById("tb_insert");
			tb_insert.innerHTML+="<tr id=\""+"line"+ count +"\">"+
									"<td id=\""+"count"+count+"\">"+count+"</td>"+
									"<td><img src=http:/"+"/localhost:8000/static/"+url.value+" class=\'flag wall img-responsive img-rounded\'></img></td>"+
									"<td>"+names.value+"</td>"+
									"<td>"+chance.value+"</td>"+
									"<td>"+rmv_button(count)+"</td>"+
								"</tr>";
			$("#" + ids.value).prop("disabled", true);
	 		$("#" + ids.value).css("background-color", "#DFE2DB");
	 		$("#post_contry").prop("disabled", true);
			var play = document.getElementById("play_button");
			play.innerHTML = "<button id=\"play\" type=\"button\" class=\'btn btn-primary btn-xs\' onClick = \'play_match()\'></button>";
			rivals.push({"id" : ids.value ,"country" : names.value , "chance" : Number(chance.value) , "points" : 0 , "url" : url.value});
			match();
			matches = count/2;
			if(count>7){
				document.getElementById("post_contry").disabled = true;
				$("#rivalsNrMsg").css({"color":"red","font-weight":"bold"});
				alert("Only 8 rivals can be included in championship!");
			};
		};
	};

	function match(){
		if (count%2==0 && count!=0){
			document.getElementById("play").disabled = false;
			document.getElementById("play").innerHTML = "Start Simulation";
		}else{
			document.getElementById("play").disabled = true;
			document.getElementById("play").innerHTML= "Simulation <spam><img src=http:/"+"/localhost:8000/static/images/x.svg class=\'flag wall img-responsive img-rounded\' width =\'16\'></img></spam>";
		};

	};


	function rend(){
		ids.value = Math.floor(Math.random()*999);
		//document.getElementById("caption").innerHTML = query;
	}
	go.addEventListener("click",rend,false);

	post_contry.addEventListener("click",process,false);

	function remove_row(n){

		for(var i=0; i<rivals.length; i++){
			if ($("#count"+n).next().next().text() == rivals[i].country){
				$("#" + rivals[i].id).prop("disabled", false);
				$("#" + rivals[i].id).css("background-color", "white");
			};
		};

		rivals.splice(n-1,1);



		document.getElementById("line"+n).remove();

		if (count>1){
			for(var i=n+1; i<=count; i++){
				document.getElementById("but"+i).setAttribute( "onClick", "remove_row("+n+");" );
				document.getElementById("but"+i).id = "but"+(i-1);
				document.getElementById("count"+i).innerHTML = i-1;
				document.getElementById("count"+i).id = "count"+(i-1);
				document.getElementById("line"+i).id = "line"+(i-1);
				document.getElementById("post_contry").disabled = false;
				$("#rivalsNrMsg").css({"color":"black","font-weight":"normal"});
			};

		};





		count--;
		match();
	};

	for(var j=1; j<=count; j++){
		document.getElementById("but"+j).addEventListener("click",(function(r){
		 	return function(){
		 		document.getElementById("line1").innerHTML="<div></div>";
		 	};
		})(j));
	};

	function play_match(){
		for(var n=1; n<=matches; n++){
			for(var k=0; k<rivals.length; k++){
				if(k%2==1){
					if(winner(rivals[k-1].chance, rivals[k].chance) == 0){
						if(rivals[k-1].chance < rivals[k].chance){
							if(rivals[k-1].chance + Math.round(rivals[k].chance/rivals[k-1].chance * 10) <= 100){
								rivals[k-1].chance += Math.round(rivals[k].chance/rivals[k-1].chance * 10);
							};
							if(rivals[k].chance - Math.round(rivals[k].chance/rivals[k-1].chance * 10) > 0){
								rivals[k].chance -= Math.round(rivals[k].chance/rivals[k-1].chance * 10);
							};
						};
						rivals[k-1].points += 1;
					}else{
						if(rivals[k].chance < rivals[k-1].chance){
							if(rivals[k].chance + Math.round(rivals[k-1].chance/rivals[k].chance * 10) <= 100){
								rivals[k].chance += Math.round(rivals[k-1].chance/rivals[k].chance * 10);

							};
							if(rivals[k-1].chance - Math.round(rivals[k-1].chance/rivals[k].chance * 10) > 0){
								rivals[k-1].chance -= Math.round(rivals[k-1].chance/rivals[k].chance * 10);
							};
						};
						rivals[k].points += 1;
					};
					pairs.push([rivals[k-1], rivals[k]]);
				};
			};
			rivals.sort(function(a, b){return b.points - a.points});

			$("#match_container").append( "<div class=\"table-responsive col-md-3\" id=\"table"+n+"\"> "+
												"<div><h4>Tour #  " + n + "</h4></div>" +
								                "<table class=\"table table-responsive mytable\"> "+
								                    "<thead> "+
								                      "<tr>"+
								                        "<th>#</th>"+
								                        "<th>Flag</th>"+
								                        "<th>Country</th>"+
								                        "<th>Chance</th>"+
								                        "<th>Points</th>"+
								                      "</tr>"+
								                    "</thead>"+
								                    "<tbody id = \"subMutch"+ n +"\">"+
								                    "</tbody>"+
								                  "</table>"+
						                "</div>");
			$("#table"+n).css("background-color", "#FDF3E7");
			$("#table"+n).css("margin", "10px");

			if(n == matches){
				$("#table" + n).append("<div id=\"play_button\">"+
						                  	"<button id=\"uplib\" type=\"button\" class=\'btn btn-primary btn-xs\' onClick='test()'>"+
						                  	"Update library</button>"+
						                	"</div>");
			};

			for(var k=0; k<rivals.length; k++){
				$("#subMutch" + n).append("<tr class=\""+"line"+ count +"\">"+
									"<td>"+Number(k+1)+"</td>"+
									"<td><img src=http:/"+"/localhost:8000/static/"+rivals[k].url+" class=\'flag wall img-responsive img-rounded\'></img></td>"+
									"<td class='countryRow'>"+rivals[k].country+"</td>"+
									"<td>"+rivals[k].chance+"</td>"+
									"<td>"+rivals[k].points+"</td>"+
									"</tr>");
			};
		};


		$("#subMutch"+2+" .countryRow").each(function(index,element){
			var couple = [];
			couple.push(($(element).text()));
			couple.push(($(element).next().text()));
			champResults.push(couple);
		});



		$(".removeBtn").prop("disabled",true);
		$("#play").prop("disabled",true);
		$("#post_contry").prop("disabled",true);
	};

	function postResults(){
		$.ajax({
			method: 'POST',
			url: '/api',
			data: champResults,
			succes: function(champResults){champResults.append(champResults)},
			error: function(){alert("error on results post!")}
		});
	};

	function test(){
		$.ajax({
			type: "POST",
			url: "http://localhost:8000/test",
            contentType: "application/json",
			dataType : "json",
			data: JSON.stringify({
				name : "test1"
			}),
			succes: function(){
				alert("success!");
			},
			error: function(){
				alert("error on results post!");
			}
		});
	};


	function winner(chance1, chance2){
		var sum = chance1 + chance2;
		var derChance1 = chance1/sum;
		var derChance2 = chance2/sum;
		var randomValue = Math.random();

		if(randomValue<=derChance1){
			return 0;
		}else{
			return 1;
		};
	};
