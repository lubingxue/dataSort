var app = angular.module("myApp",[])
	app.controller("democon",["$scope",function($scope){
			var user = [
				{
					name:"Lily",
					email:"Lily@qq.com"
				},
				{
					name:"Merry",
					email:"Merry@126.com"
				}
			];
			$scope.user = user;
			$scope.isShow = true;
			$scope.counter = 0;
			$scope.add = function(){
				$scope.counter++;
			}
			$scope.items = [];
			$scope.addItem = function(event){
				if(event.keyCode == "13"){
					$scope.items.unshift($scope.item);
					$scope.item = "";
				}
			}
		 	$scope.peoples=[{
					       		age: 12,
					        	name:'Jesus',
					        	country:'spain',
					        	birthday:1480580643317,
					        	ishas:true
						    },
						    {
						        age: 21,
						        name:'Dave',
						        country:'USA',
						        birthday:1280580643317,
						        ishas:false
						    },
						    {
						        age: 19, 
						        name:'Carolina',
						        country:'Italy',
						        birthday:1484580643317,
						        ishas:true
						    }];
				$scope.searchText = "";
				$scope.search = function(obj){
					if($scope.searchText != ""){
						if(obj.name.toLowerCase().indexOf($scope.searchText.toLowerCase())!= -1 || obj.country.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1){
							return true;
						}else{
							return false;
						}
					}else{
						return true;
					}
				}
		}]);
//deferred对象
/*$.when($.ajax("/mock/livelist.json"),$.ajax("/mock/login.json"))
 .done(function(){
 	alert("成功了");
 })
 .fail(function(){
 	alert("失败了");
 })
var dtd = $.Deferred();
 function wait(dtd){
 	function task(){
 		alert("hello");
 		dtd.resolve();
 	}
 	setTimeout(task,3000);
 	return dtd.promise();
 }
 var d = wait(dtd)
 $.when(d)
  .done(function(){
 	 alert("成功了");
  })
  .fail(function(){
 	 alert("失败了");
  })*/